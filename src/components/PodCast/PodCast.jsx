"use client";

import { useEffect, useState } from "react";
import { PlayCircle, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import axiosInstance from "../../api/axiosInstance";

export default function BookSection() {
  const [playingIndex, setPlayingIndex] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const fetchPodcasts = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/user/podcast/view/?page=${pageNumber}`);
      const newData = res?.data?.data || [];

      setBooks(newData);
      setHasNext(!!res?.data?.next);
      setHasPrev(!!res?.data?.previous);
    } catch (error) {
      console.error("Error fetching podcasts:", error);
    } finally {
      setLoading(false);
    }
  };

  const searchPodcasts = async (query) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/user/podcast/podcast_search/?title=${query}`);
      setBooks(res?.data?.data || []);
      setHasNext(false);
      setHasPrev(false);
    } catch (error) {
      console.error("Error searching podcasts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setPage(1);

    if (value.trim() === "") {
      setIsSearching(false);
      fetchPodcasts(1);
    } else {
      setIsSearching(true);
      searchPodcasts(value);
    }
  };

  useEffect(() => {
    if (!isSearching) fetchPodcasts(page);
  }, [page]);

  return (
    <section className="px-6 sm:px-14 py-24 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h2 className="text-3xl text-[#88AE98] font-bold mb-4 sm:mb-0">PodCast</h2>
          <div className="relative w-full sm:w-80">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search podcasts..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#88AE98] focus:outline-none"
            />
          </div>
        </div>

        {/* Loading */}
        {loading && books.length === 0 && (
          <div className="mx-auto px-4 mt-8 py-20 text-center flex flex-col items-center justify-center gap-4">
            <div className="h-10 w-10 border-4 border-[#88ae98] border-t-transparent rounded-full animate-spin" />
            <p className="text-[#88ae98]">Loading Podcasts…</p>
          </div>
        )}

        {/* No results */}
        {!loading && books.length === 0 && (
          <div className="text-center text-red-600 bg-red-50 border border-red-200 py-10 rounded-lg">
            <p className="text-xl font-semibold">No Podcast Found</p>
            <p className="text-sm text-red-400">Try different keywords.</p>
          </div>
        )}

        {/* Podcast Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {books.map((book, index) => (
            <div
              key={index}
              className="group bg-white cursor-pointer rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition duration-300 pb-4 transform hover:-translate-y-1"
            >
              <div className="relative w-full h-64 bg-black">
                {playingIndex === index ? (
                  <video
                    src={decodeURIComponent(book.file)}
                    controls
                    autoPlay
                    className="w-full h-full object-cover"
                    onEnded={() => setPlayingIndex(null)}
                  />
                ) : (
                  <>
                    {book.thumbnail ? (
                      <Image
                        src={book.thumbnail}
                        alt={book.title}
                        fill
                        className="object-cover object-top rounded-t-lg"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center text-white">
                        No Thumbnail
                      </div>
                    )}
                    <div
                      onClick={() => setPlayingIndex(index)}
                      className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/40 transition"
                    >
                      <PlayCircle className="w-16 h-16 text-white" />
                    </div>
                  </>
                )}
              </div>
              <div className="px-3 py-2 mt-2">
                <h3 className="font-semibold mb-1 text-black line-clamp-2 text-sm leading-tight">{book.title}</h3>
                <p
                  className="line-clamp-3 text-sm text-gray-700"
                  dangerouslySetInnerHTML={{
                    __html: book?.description || "No description available.",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Buttons */}
        {!loading && !isSearching && (hasPrev || hasNext) && (
          <div className="flex justify-center items-center gap-6 mt-14">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={!hasPrev || page === 1}
              className="p-3 rounded-full bg-white border border-[#8bb09b] text-[#8bb09b] hover:bg-[#8bb09b] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <span className="px-4 py-2 text-sm bg-[#f0f7f4] rounded-full text-[#5b8f79] font-semibold shadow-sm">
              Page {page}
            </span>

            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={!hasNext}
              className="p-3 rounded-full bg-white border border-[#8bb09b] text-[#8bb09b] hover:bg-[#8bb09b] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
