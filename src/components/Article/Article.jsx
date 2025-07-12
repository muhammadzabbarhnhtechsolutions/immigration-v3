'use client';

import Image from 'next/image';
import { useEffect, useState, useMemo } from 'react';
import axiosInstance from '../../api/axiosInstance';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ITEMS_PER_PAGE = 6;

const ArticleSection = () => {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const getPaginatedArticles = async (pageNum = 1) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/user/blog/article/article_view/?page=${pageNum}`);
      const data = res?.data?.data || [];

      setArticles(data);
      setHasNext(!!res?.data?.next);
      setHasPrev(!!res?.data?.previous);
    } catch (err) {
      console.error('Pagination error:', err);
    } finally {
      setLoading(false);
    }
  };

  const searchArticles = async (title) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/user/blog/article/article_search/?title=${title}`);
      setArticles(res?.data?.data || []);
      setHasNext(false);
      setHasPrev(false);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    setPage(1);

    if (val.trim() === '') {
      setIsSearching(false);
      getPaginatedArticles(1);
    } else {
      setIsSearching(true);
      searchArticles(val);
    }
  };

  useEffect(() => {
    if (!isSearching) getPaginatedArticles(page);
  }, [page]);

  const currentArticles = useMemo(() => {
    if (!isSearching) return articles;
    const start = (page - 1) * ITEMS_PER_PAGE;
    return articles.slice(start, start + ITEMS_PER_PAGE);
  }, [articles, page, isSearching]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-24 bg-gray-50">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h2 className="text-3xl font-extrabold text-[#8bb09b]">Articles</h2>
        <div className="relative w-full sm:w-80 mt-4 sm:mt-0">
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
            placeholder="Search by title..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-[#88AE98] focus:outline-none"
          />
        </div>
      </div>

      {/* Loading */}
      {loading && articles.length === 0 && (
        <div className="text-center mt-16 flex flex-col items-center gap-4">
          <div className="h-10 w-10 border-4 border-[#5bb180] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#5bb180] text-lg font-medium">Loading articles...</p>
        </div>
      )}

      {/* Empty */}
      {!loading && articles.length === 0 && (
        <div className="text-center mt-10 bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-xl shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 mb-2 text-red-400 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M12 3.75a8.25 8.25 0 100 16.5 8.25 8.25 0 000-16.5z"
            />
          </svg>
          <p className="text-lg font-semibold">No Article Found</p>
          <span className="text-sm text-red-400">Try different keywords.</span>
        </div>
      )}

      {/* Articles */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {currentArticles.map((article) => (
          <div
            key={article.id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-4 group"
          >
            <Link href={`/blogs/${article.id}`} className="block">
              <div className="overflow-hidden rounded-lg cursor-pointer">
                <Image
                  src={article.image}
                  alt={article.title || 'Article Image'}
                  width={600}
                  height={400}
                  className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>
            <p className="text-gray-800 font-semibold text-base mt-1 line-clamp-2">
              {article.title}
            </p>
            <p className="text-gray-600 text-sm mt-1">{article.heading}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {!loading && !isSearching && (hasPrev || hasNext) && (
        <div className="flex justify-center items-center gap-6 mt-14">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={!hasPrev || page === 1}
            className="p-3 rounded-full bg-white border-2 border-[#8bb09b] text-[#8bb09b] hover:bg-[#8bb09b] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="px-4 py-2 text-sm bg-[#f0f7f4] rounded-full text-[#5b8f79] font-semibold shadow-sm">
            Page {page}
          </span>

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={!hasNext}
            className="p-3 rounded-full bg-white border-2 border-[#8bb09b] text-[#8bb09b] hover:bg-[#8bb09b] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ArticleSection;
