'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosInstance from "../../../../api/axiosInstance" // Adjust path as needed

const Page = () => {
  const [article, setArticle] = useState(null);
  const params = useParams();
console.log(article, "article");
  useEffect(() => {
    const getArticle = async () => {
      try {
        const res = await axiosInstance.get(
          `/user/blog/article/blog_detail/?blog_id=${params.id}`
        );
        setArticle(res?.data?.data);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    if (params?.id) getArticle();
  }, [params?.id]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-3xl mt-6 font-bold text-[#71a587] mb-10">Blog</h2>

      {article ? (
        <div className="mb-16">
          {/* Dynamic Image */}
          <div className="w-full rounded-xl shadow-md mb-8 overflow-hidden">
            <Image
              src={article.image}
              alt={article.heading}
              width={1000}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Dynamic Title & Heading */}
          <h3 className="text-2xl font-bold text-[#333] mb-2">{article.title}</h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">{article.heading}</p>

          {/* Static Quote */}
          <blockquote className="border-l-4 border-purple-500 pl-4 italic text-gray-600 text-base mb-6">
            "People worry that computers will get too smart and take over the world,
            but the real problem is that they’re too dumb and they’ve already taken
            over the world." – Pedro Domingos
          </blockquote>
        </div>
      ) : (
        <p className="text-gray-500">Loading blog article...</p>
      )}
    </div>
  );
};

export default Page;
