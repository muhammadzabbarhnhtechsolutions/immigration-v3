"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getPaginatedEBooks, searchEBooks } from "@/services/blogService";

const ITEMS_PER_PAGE = 2;

export default function BookSection() {
  const router = useRouter();

  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    let ignore = false;
    const timeoutId = setTimeout(async () => {
      setLoading(true);
      if (query.trim()) {
        const res = await searchEBooks(router, query);
        if (!ignore && res?.status) {
          setBooks(res.data || []);
          setTotalCount(res.count || 0);
          setHasNext(false); // optional if search has no pagination
          setHasPrev(false);
        }
      } else {
        const res = await getPaginatedEBooks(router, page);
        if (!ignore && res?.status) {
          setBooks(res.data || []);
          setTotalCount(res.count || 0);
          setHasNext(!!res.next);
          setHasPrev(!!res.previous);
        }
      }
      setLoading(false);
    }, 300);

    return () => {
      ignore = true;
      clearTimeout(timeoutId);
    };
  }, [router, page, query]);

  const currentBooks = useMemo(() => {
    if (!query.trim()) return books;
    const start = (page - 1) * ITEMS_PER_PAGE;
    return books.slice(start, start + ITEMS_PER_PAGE);
  }, [books, page, query]);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    setPage(1);
  };

  if (loading) {
    return (
      <div className="mx-auto bg-[#ebf0ed] px-4 mt-0 py-20 text-center flex flex-col items-center justify-center gap-4">
        <div className="h-10 w-10 border-4 border-[#3D61AB] border-t-transparent rounded-full animate-spin" />
        <p className="text-[#3D61AB]">Loading e‑books…</p>
      </div>
    );
  }

  return (
    <section className="px-6 md:px-12 py-24 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* heading + search */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <h2 className="text-3xl text-[#3D61AB] font-bold">E‑Books</h2>

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
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-[#3D61AB] focus:outline-none"
            />
          </div>
        </div>

        {/* grid */}
        {currentBooks.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-8 sm:gap-6 mb-12">
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
                  <a href={book.file} download target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-base text-blue-600 hover:underline">
                    Download PDF
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="col-span-full flex flex-col items-center text-center mt-28 text-gray-500">
            <p className="text-xl font-medium text-[#3D61AB]">No E‑Book found</p>
            <p className="text-[15px] text-gray-400">Try another keyword.</p>
          </div>
        )}

        {/* pagination with only icons */}
       {totalCount > ITEMS_PER_PAGE && (
  <div className="flex justify-center items-center gap-6 mt-10">
    <button
      onClick={() => setPage((p) => Math.max(p - 1, 1))}
      disabled={!hasPrev || page === 1}
      className="p-3 rounded-full bg-white border border-[#3D61AB] text-[#3D61AB] hover:bg-[#3D61AB] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 shadow-sm hover:shadow-lg"
    >
      <ChevronLeft className="w-5 h-5" />
    </button>

    <span className="text-sm font-medium text-[#3D61AB] bg-[#ecf5f0] px-4 py-1.5 rounded-full shadow-sm">
      Page {page}
    </span>

    <button
      onClick={() => setPage((p) => p + 1)}
      disabled={!hasNext}
      className="p-3 rounded-full bg-white border border-[#3D61AB] text-[#3D61AB] hover:bg-[#3D61AB] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 shadow-sm hover:shadow-lg"
    >
      <ChevronRight className="w-5 h-5" />
    </button>
  </div>
)}

      </div>
    </section>
  );
}
