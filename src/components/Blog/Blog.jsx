'use client';

import Image from 'next/image';
import { useEffect, useState, useMemo } from 'react';
import axiosInstance from '../../api/axiosInstance'; // adjust path if needed
import Link from 'next/link';

const ArticleSection = () => {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const res = await axiosInstance.get('/user/blog/article/view/');
        setArticles(res?.data?.data || []);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };
    getArticles();
  }, []);

  const filteredArticles = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return articles.filter(
      (article) =>
        article.title?.toLowerCase().includes(query) ||
        article.heading?.toLowerCase().includes(query)
    );
  }, [articles, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-24 bg-gray-50">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h2 className="text-3xl font-extrabold text-[#8bb09b]">Blogs</h2>
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
            placeholder="Search by type or title..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-[#88AE98] focus:outline-none"
          />
        </div>
      </div>

      {loading ? (
        <div className="mx-auto bg-[#ebf0ed] px-4 mt-8 py-20 text-center flex flex-col items-center justify-center gap-4 animate-fade-in">
          <div className="h-10 w-10 border-4 border-[#5bb180] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#5bb180] text-lg font-medium">Loading articles...</p>
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center mt-10 bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-xl shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 mb-2 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M12 3.75c-4.56 0-8.25 3.69-8.25 8.25s3.69 8.25 8.25 8.25 8.25-3.69 8.25-8.25S16.56 3.75 12 3.75z"
            />
          </svg>
          <p className="text-lg font-semibold">No Article Found</p>
          <span className="text-sm text-red-400">Try different keywords.</span>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
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
      )}

      {!loading && filteredArticles.length > 0 && (
        <div className="text-center mt-12">
          <button className="bg-[#8bb09b] text-white px-6 py-3 rounded-lg shadow hover:bg-[#75b590] transition duration-300">
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default ArticleSection;
