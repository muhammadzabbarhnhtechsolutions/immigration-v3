"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getEBooks } from "../../services/blogService";

const ITEMS_PER_PAGE = 8; // ہر صفحے پر کتنی ای‑بکس

export default function BookSection() {
  const router = useRouter();

  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // ── Fetch once ────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      const res = await getEBooks(router);
      if (res?.data) setBooks(res.data);
      setLoading(false);
    })();
  }, [router]);

  // ── Filtered list ─────────────────────────────────────────────
  const filteredBooks = useMemo(() => {
    const q = searchQuery.toLowerCase();
    if (!q) return books;
    return books.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author?.toLowerCase().includes(q)
    );
  }, [books, searchQuery]);

  // ── Pagination slice ─────────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(filteredBooks.length / ITEMS_PER_PAGE));
  const currentBooks = filteredBooks.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  // سرچ یا ٹوٹل بدلنے پر page = 1
  useEffect(() => setPage(1), [searchQuery, books]);

  if (loading) {
    return (
     <div className="mx-auto bg-[#ebf0ed] px-4 mt-8 py-20 text-center flex flex-col items-center justify-center gap-4 animate-fade-in">
        <div className="h-10 w-10 border-4 border-[#88ae98] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[#88ae98] text-lg font-medium">Loading e-books...</p>
      </div>
    );
  }

  return (
    <section className="px-6 py-24 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Heading + Search */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <h2 className="text-3xl text-[#88AE98] font-bold">E‑Books</h2>

          {/* 🔍 Search bar */}
          <div className="relative w-full sm:w-80">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
                />
              </svg>
            </span>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search title or author…"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-[#88AE98] focus:outline-none"
            />
          </div>
        </div>

        {/* Grid */}
        {currentBooks.length ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 mb-12">
            {currentBooks.map((book) => (
              <div
                key={book.id}
                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl pb-4 transition transform hover:-translate-y-1"
              >
                <a
                  href={book.file}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-full h-64 block"
                >
                  <Image
                    src={book.thumbnail || "/placeholder.jpg"}
                    alt={book.title}
                    fill
                    className="object-cover object-top rounded-t-lg"
                  />
                </a>

                <div className="px-3 py-2">
                  <h3 className="font-semibold text-black line-clamp-2 text-sm leading-tight">
                    {book.title}
                  </h3>
                  <p className="text-gray-600 text-xs">{book.author}</p>
                  <p
                    className="text-xs mt-1 line-clamp-3 text-gray-500"
                    dangerouslySetInnerHTML={{
                      __html: book.description || "No description available.",
                    }}
                  />

                  <a
                    href={book.file}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-xs text-blue-600 hover:underline"
                  >
                    Download PDF
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
 <div className="col-span-full flex flex-col items-center text-center mt-28 text-gray-500">
              <svg
                className="w-12 h-12 text-[#88AE98] mb-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12H9m12 0A9 9 0 113 12a9 9 0 0118 0z"
                />
              </svg>
              <p className="text-lg font-medium text-[#88AE98]">
                No E-Book found
              </p>
              <p className="text-[13px] text-gray-400">
                Try searching with a different keyword.
              </p>
            </div>        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 border rounded disabled:opacity-40 hover:bg-gray-100 transition"
            >
              Prev
            </button>

            {[...Array(totalPages).keys()]
              .slice(Math.max(0, page - 3), Math.min(totalPages, page + 2))
              .map((i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 py-1.5 rounded ${
                    page === i + 1
                      ? "bg-[#88AE98] text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
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
