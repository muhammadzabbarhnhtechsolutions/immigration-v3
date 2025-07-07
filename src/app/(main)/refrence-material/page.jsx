"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { getRefrenceMaterial } from "@/services/refrenceMaterialServices";
import { FileArchive } from "lucide-react";

const ITEMS_PER_PAGE = 10; // ← ایک صفحے پر کتنی فائلیں

export default function ReferenceMaterialPage() {
  const router = useRouter();

  const [documents, setDocuments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);            // current page
  const [loading, setLoading] = useState(true);

  // ── fetch once ────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      const res = await getRefrenceMaterial(router);
      if (res?.data) setDocuments(res.data);
      setLoading(false);
    })();
  }, []);

  // ── filtered list ─────────────────────────────────────────────
  const filteredDocs = useMemo(() => {
    if (!searchQuery.trim()) return documents;
    return documents.filter((doc) =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [documents, searchQuery]);

  // ── pagination slice ──────────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(filteredDocs.length / ITEMS_PER_PAGE));
  const currentDocs = filteredDocs.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  // اگر سرچ بدلے یا docs کم/زیادہ ہوں تو page = 1
  useEffect(() => setPage(1), [searchQuery, documents]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="h-10 w-10 border-4 border-[#88AE98] border-t-transparent rounded-full animate-spin" />
        <p className="text-[#88AE98] text-lg font-medium">Loading materials…</p>
      </div>
    );
  }

  return (
    <main className="px-4 md:px-16 py-16 mt-12 bg-gray-50 min-h-screen">
      {/* Heading + search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
        <h1 className="text-3xl font-bold text-[#88AE98]">Reference Materials</h1>

        <div className="relative w-full sm:w-80">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
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
            placeholder="Search materials..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-[#88AE98] focus:outline-none"
          />
        </div>
      </div>

      {/* Grid */}
      {currentDocs.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20 place-items-center mb-12">
          {currentDocs.map((doc) => (
            <a
              key={doc.id}
              href={doc.file}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white w-72 rounded-lg border shadow-sm hover:shadow-lg transition p-6 flex flex-col items-center"
            >
              <FileArchive className="h-[85px] w-[85px] mb-4 text-[#64B5F6]" />
              <p className="text-center text-gray-800 font-semibold">
                {doc.title}
              </p>
            </a>
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
              <p className="text-xl font-medium text-[#88AE98]">
                No Material found
              </p>
              <p className="text-[15px] text-gray-400">
                Try searching with a different keyword.
              </p>
            </div>      )}

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 border rounded disabled:opacity-40 hover:bg-gray-100 transition"
          >
            Prev
          </button>

          {/* Page numbers (max 5 visible) */}
          {[...Array(totalPages).keys()]
            .slice(
              Math.max(0, page - 3),
              Math.min(totalPages, page + 2)
            )
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
    </main>
  );
}
