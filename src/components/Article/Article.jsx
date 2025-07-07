'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import Link from 'next/link';

const ArticleSection = () => {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  /* ── fetch all articles once ─────────────────────────────── */
  useEffect(() => {
    (async () => {
      try {
        const res = await axiosInstance.get('/user/blog/article/article_view/');
        setArticles(res?.data?.data || []);
      } catch (err) {
        console.error('Error fetching articles:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ── filtered list (memoised) ────────────────────────────── */
  const filteredArticles = useMemo(() => {
    const q = searchQuery.toLowerCase();
    if (!q) return articles;
    return articles.filter(
      (a) =>
        a.title?.toLowerCase().includes(q) ||
        a.heading?.toLowerCase().includes(q)
    );
  }, [articles, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-24 bg-gray-50">
      {/* Heading + search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h2 className="text-3xl font-extrabold text-[#8bb09b]">Articles</h2>

        <input
          type="text"
          placeholder="Search articles…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mt-4 sm:mt-0 w-full sm:w-80 border px-4 py-2.5 rounded-lg border-gray-300 focus:ring-2 focus:ring-[#8bb09b] focus:border-[#8bb09b] focus:outline-none"
        />
      </div>

      {loading ? (
        /* ── Loading state ── */
        <div className="mx-auto px-4 mt-8 py-20 text-center flex flex-col items-center gap-4">
          <div className="h-10 w-10 border-4 border-[#5bb180] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#5bb180] text-lg font-medium">Loading articles…</p>
        </div>
      ) : filteredArticles.length === 0 ? (
        /* ── Empty state ── */
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
        /* ── Grid of articles ── */
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white flex flex-col justify-between rounded-xl shadow-md hover:shadow-xl transition p-4 group"
            >
              <Link href={`/article/${article.id}`} className="block">
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

              <p className="text-gray-800 mt-4 font-semibold text-base line-clamp-2">
                {article.title}
              </p>
              <p className="text-gray-600 text-sm mt-1">{article.heading}</p>
            </div>
          ))}
        </div>
      )}

      {!loading && filteredArticles.length > 0 && (
        <div className="text-center mt-12">
          <button className="bg-[#8bb09b] text-white px-6 py-3 rounded-lg shadow hover:bg-[#75b590] transition">
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default ArticleSection;
