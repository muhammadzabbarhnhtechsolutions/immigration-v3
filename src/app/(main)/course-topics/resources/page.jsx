"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getGeneralResource } from "@/services/generalResourcesServices";
import { ChevronLeft, ChevronRight, FileArchive } from "lucide-react";

const ITEMS_PER_PAGE = 8; // فی صفحہ کتنے ریسورس

export default function GeneralResourcesPage() {
  const router = useRouter();

  const [documents, setDocuments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  /* ── Fetch once ────────────────────────────────────────────── */
  useEffect(() => {
    (async () => {
      const res = await getGeneralResource(router, "course-id");
      if (res?.data) setDocuments(res.data);
      setLoading(false);
    })();
  }, []);

  /* ── Filtered list ─────────────────────────────────────────── */
  const filteredDocs = useMemo(() => {
    const q = searchQuery.toLowerCase();
    if (!q) return documents;
    return documents.filter(
      (d) =>
        d.type?.toLowerCase().includes(q) ||
        d.documents?.toLowerCase().includes(q)
    );
  }, [documents, searchQuery]);

  /* ── Pagination slice ─────────────────────────────────────── */
  const totalPages = Math.max(1, Math.ceil(filteredDocs.length / ITEMS_PER_PAGE));
  const currentDocs = filteredDocs.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  // سرچ بدلتے ہی پہلا صفحہ
  useEffect(() => setPage(1), [searchQuery, documents]);

  if (loading) {
    return (
       <div className="mx-auto  px-4 mt-0 py-20 text-center flex flex-col items-center justify-center gap-4 animate-fade-in">
        <div className="h-10 w-10 border-4 border-[#88B29A] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[#88B29A] text-lg font-medium">Loading Resources...</p>
      </div>
    );
  }

  return (
    <section className="px-4 sm:px-12 py-16">
      {/* Heading + search */}
      <div className="flex flex-col sm:flex-row items-start md:mt-6 sm:items-center justify-between gap-4 mb-10">
        <h2 className="text-[26px] sm:text-3xl font-bold text-[#88B29A]">
          General Resources
        </h2>

        {/* 🔍 Search bar */}
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
            placeholder="Search by type or file…"
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-[#88B29A] focus:outline-none"
          />
        </div>
      </div>

      {/* Grid */}
      {currentDocs.length ? (
        <div className="flex flex-wrap justify-center gap-4 max-w-7xl mx-auto mb-12">
          {currentDocs.map((doc, idx) => (
            <a
              key={doc.id ?? idx}
              href={doc.documents}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white w-full sm:w-[240px] md:w-[280px] rounded-xl shadow-lg border border-gray-100 px-6 py-6 flex flex-col items-center hover:shadow-xl transition"
            >
              <FileArchive className="h-16 w-16 mb-3 text-[#88B29A]" />
              <p title={doc?.title} className="text-gray-800 truncate font-semibold mb-1">
                {doc?.title}
              </p>
              <p className="text-gray-500 text-sm">
                {doc.type?.toUpperCase() || "FILE"}
              </p>
            </a>
          ))}
        </div>
      ) : (
<div className="col-span-full flex flex-col items-center text-center mt-22 text-gray-500">
              <svg
                className="w-12 h-12 text-[#88B29A] mb-4"
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
              <p className="text-lg font-medium text-[#88B29A]">
                No Resources found
              </p>
              <p className="text-[13px] text-gray-400">
                Try searching with a different keyword.
              </p>
            </div>         )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
 className="p-3 rounded-full bg-white border border-[#88B29A] text-[#88B29A] hover:bg-[#88B29A] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 shadow-sm hover:shadow-lg"          >
        <ChevronLeft className="w-5 font-bold h-5" />
    </button>

    <span className="px-4 py-2 text-sm bg-[#f0f7f4] rounded-full text-[#88B29A] font-semibold shadow-sm">
      Page {totalPages}
    </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
 className="p-3 rounded-full bg-white border border-[#88B29A] text-[#88B29A] hover:bg-[#88B29A] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 shadow-sm hover:shadow-lg"          >
            <ChevronRight className="w-5 font-bold h-5"/>
          </button>
        </div>
      )}
    </section>
  );
}
