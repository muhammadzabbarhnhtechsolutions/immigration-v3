"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, FileArchive } from "lucide-react";
import axiosInstance from "@/api/axiosInstance";

export default function ReferenceMaterialPage() {
  const [documents, setDocuments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const fetchPaginatedDocs = async (pageNum = 1) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/user/reference/material/view/?page=${pageNum}`);
      const data = res?.data?.data || [];

      setDocuments(data);
      setHasNext(!!res?.data?.next);
      setHasPrev(!!res?.data?.previous);
    } catch (err) {
      console.error("Pagination error:", err);
    } finally {
      setLoading(false);
    }
  };

  const searchDocs = async (query) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(
        `/user/reference/material/reference_material_search/?title=${query}`
      );
      setDocuments(res?.data?.data || []);
      setHasNext(false);
      setHasPrev(false);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    setPage(1);

    if (val.trim() === "") {
      setIsSearching(false);
      fetchPaginatedDocs(1);
    } else {
      setIsSearching(true);
      searchDocs(val);
    }
  };

  useEffect(() => {
    fetchPaginatedDocs(page);
  }, [page]);

  return (
    <main className="px-4 md:px-16 py-16 mt-12 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
        <h1 className="text-2xl md:text-3xl md:-ml-8 font-bold text-[#88B29A]">Reference Materials</h1>

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
            onChange={handleSearch}
            placeholder="Search materials..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-[#88B29A] focus:outline-none"
          />
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <div className="h-10 w-10 border-4 border-[#88B29A] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#88B29A] text-lg font-medium">Loading materials…</p>
        </div>
      )}

      {/* No Result */}
      {!loading && documents.length === 0 && (
        <div className="col-span-full flex flex-col items-center text-center mt-28 text-gray-500">
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
          <p className="text-xl font-medium text-[#88B29A]">No Material found</p>
          <p className="text-[15px] text-gray-400">
            Try searching with a different keyword.
          </p>
        </div>
      )}

      {/* Grid */}
      {!loading && documents.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20 place-items-center mb-12">
            {documents.map((doc) => (
              <a
                key={doc.id}
                href={doc.file}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white w-72 rounded-lg border shadow-sm hover:shadow-lg transition p-6 flex flex-col items-center"
              >
                <FileArchive className="h-[85px] w-[85px] mb-4 text-[#64B5F6]" />
                <p className="text-center text-gray-800 font-semibold">{doc.title}</p>
              </a>
            ))}
          </div>

          {/* Pagination */}
          {!isSearching && (hasPrev || hasNext) && (
<div className="flex justify-center items-center gap-6 mt-10">
    <button
      onClick={() => setPage((p) => Math.max(p - 1, 1))}
      disabled={!hasPrev || page === 1}
      className="p-3 rounded-full bg-white border border-[#88B29A] text-[#88B29A] hover:bg-[#88B29A] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 shadow-sm hover:shadow-lg"
    >
      <ChevronLeft className="w-5 h-5" />
    </button>

    <span className="text-sm font-medium text-[#88B29A] bg-[#ecf5f0] px-4 py-1.5 rounded-full shadow-sm">
      Page {page}
    </span>

    <button
      onClick={() => setPage((p) => p + 1)}
      disabled={!hasNext}
      className="p-3 rounded-full bg-white border border-[#88B29A] text-[#88B29A] hover:bg-[#88B29A] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 shadow-sm hover:shadow-lg"
    >
      <ChevronRight className="w-5 h-5" />
    </button>
  </div>
          )}
        </>
      )}
    </main>
  );
}
