"use client";

import { useEffect, useMemo, useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getPaginatedEBooks, searchEBooks } from "@/services/blogService";



const ITEMS_PER_PAGE = 2; // for demo

export default function BookSection() {
  const router = useRouter();

  // ── state ───────────────────────────────────────────────────
  const [books, setBooks]       = useState([]);
  const [totalPages, setTotal]  = useState(1);
  const [page, setPage]         = useState(1);
  const [query, setQuery]       = useState("");
  const [loading, setLoading]   = useState(true);

  // ── fetch data whenever page OR query changes ───────────────
useEffect(() => {
  let ignore = false;
  const timeoutId = setTimeout(async () => {
    setLoading(true);

    if (query.trim()) {
      
      const res = await searchEBooks(router, query);
      if (!ignore && res) {
        const list = res.data || [];
        setBooks(list);
        setTotal(Math.max(1, Math.ceil(list.length / ITEMS_PER_PAGE)));
      }
    } else {
      const res = await getPaginatedEBooks(router, page);
      if (!ignore && res) {
        setBooks(res.data || []);
        setTotal(res.totalPages || 1);
      }
    }
// ...
    setLoading(false);
  }, 400); // delay for debounce (400ms)

  return () => {
    ignore = true;
    clearTimeout(timeoutId);
  };
}, [router, page, query]);


  // ── slice locally for search results ────────────────────────
  const currentBooks = useMemo(() => {
    if (!query.trim()) return books; // server already did paging
    const start = (page - 1) * ITEMS_PER_PAGE;
    return books.slice(start, start + ITEMS_PER_PAGE);
  }, [books, page, query]);

  // ── input change handler ────────────────────────────────────
  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    setPage(1); // reset to first page on every new query
  };

  // ── loading placeholder ─────────────────────────────────────
  if (loading) {
    return (
      <div className="mx-auto bg-[#ebf0ed] px-4 mt-8 py-20 text-center flex flex-col items-center justify-center gap-4">
        <div className="h-10 w-10 border-4 border-[#88ae98] border-t-transparent rounded-full animate-spin" />
        <p className="text-[#88ae98]">Loading e‑books…</p>
      </div>
    );
  }

  // ── render ──────────────────────────────────────────────────
  return (
    <section className="px-6 py-24 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* heading + search */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <h2 className="text-3xl text-[#88AE98] font-bold">E‑Books</h2>

          {/* search bar */}
          <div className="relative w-full sm:w-80">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
              </svg>
            </span>
            <input
              value={query}
              onChange={handleSearchChange}
              placeholder="Search title…"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-[#88AE98] focus:outline-none"
            />
          </div>
        </div>

        {/* grid */}
        {currentBooks.length ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 mb-12">
            {currentBooks.map((book) => (
              <div key={book.id} className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl pb-4 transition transform hover:-translate-y-1">
                <a href={book.file} download target="_blank" rel="noopener noreferrer" className="relative w-full h-64 block">
                  <Image
                    src={book.thumbnail || "/placeholder.jpg"}
                    alt={book.title}
                    fill
                    className="object-cover object-top rounded-t-lg"
                  />
                </a>
                <div className="px-3 py-2">
                  <h3 className="font-semibold text-black line-clamp-2 text-sm">{book.title}</h3>
                  <p className="text-gray-600 text-xs">{book.author}</p>
                  <p
                    className="text-xs mt-1 line-clamp-3 text-gray-500"
                    dangerouslySetInnerHTML={{ __html: book.description || "No description available." }}
                  />
                  <a href={book.file} download target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-xs text-blue-600 hover:underline">
                    Download PDF
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* empty state */
          <div className="col-span-full flex flex-col items-center text-center mt-28 text-gray-500">
            <p className="text-lg font-medium text-[#88AE98]">No E‑Book found</p>
            <p className="text-[13px] text-gray-400">Try another keyword.</p>
          </div>
        )}

        {/* pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 border rounded disabled:opacity-40 hover:bg-gray-100 transition"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .slice(Math.max(0, page - 3), Math.min(totalPages, page + 2))
              .map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-3 py-1.5 rounded ${page === p ? "bg-[#88AE98] text-white" : "hover:bg-gray-100"}`}
                >
                  {p}
                </button>
              ))}

            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 border rounded disabled:opacity-40 hover:bg-gray-100 transition"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
