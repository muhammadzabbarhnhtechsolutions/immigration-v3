'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance'; // adjust path as needed
import Link from 'next/link';

const ArticleSection = () => {
  const [articles, setArticles] = useState([]);
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-28 bg-gray-50">
      <h2 className="text-3xl font-extrabold text-[#8bb09b] mb-6 text-left">Blogs</h2>

      {loading ? (
         <div className="mx-auto bg-[#ebf0ed] px-4 mt-8 py-20 text-center flex flex-col items-center justify-center gap-4 animate-fade-in">
        {/* Spinner */}
        <div className="h-10 w-10 border-4 border-[#5bb180] border-t-transparent rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-[#5bb180] text-lg font-medium">
          Loading articles...
        </p>
      </div>
      ) : articles.length === 0 ? (
        <p className="text-gray-500">No articles found.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
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
              {/* <h3 className="text-blue-600 text-sm font-semibold mt-4">Technology</h3> */}
              <p className="text-gray-800 font-semibold text-base mt-1 line-clamp-2">
                {article.title}
              </p>
              <p className="text-gray-600 text-sm mt-1">{article.heading}</p>
              {/* <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <img
                    src={`https://i.pravatar.cc/40?img=${Math.floor(Math.random() * 10 + 1)}`}
                    alt="author"
                    className="w-9 h-9 rounded-full mr-2"
                  />
                  <span>Admin</span>
                </div>
                <span>{new Date().toLocaleDateString()}</span>
              </div> */}
            </div>
          ))}
        </div>
      )}

      {!loading && articles.length > 0 && (
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
