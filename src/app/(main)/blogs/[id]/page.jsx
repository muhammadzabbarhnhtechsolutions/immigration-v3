'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosInstance from "../../../../api/axiosInstance";

const Page = () => {
  const [article, setArticle] = useState(null);
  const params = useParams();

  useEffect(() => {
    const getArticle = async () => {
      try {
        const res = await axiosInstance.get(
          `/user/blog/article/blog_detail/?blog_id=${params.id}`
        );
        setArticle(res?.data?.data?.[0]); // Correctly extracting the article
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    if (params?.id) getArticle();
  }, [params?.id]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-3xl mt-6 font-bold text-[#3D61AB] mb-10">Blog Details</h2>

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

          {/* Optional Description */}
          <p className="text-gray-600 text-base mb-6" dangerouslySetInnerHTML={{__html:article.description}} />
          {/* <p className="text-gray-600 text-base mb-6">{article.description}</p> */}
{/*  */}
          {/* Static Quote */}
          {/* <blockquote className="border-l-4 border-purple-500 pl-4 italic text-gray-600 text-base mb-6">
            "People worry that computers will get too smart and take over the world,
            but the real problem is that they’re too dumb and they’ve already taken
            over the world." – Pedro Domingos
          </blockquote> */}
        </div>
      ) : (
 <div className="mx-auto bg-[#ebf0ed] px-4 mt-0 py-20 text-center flex flex-col items-center justify-center gap-4 animate-fade-in">
        {/* Spinner */}
        <div className="h-10 w-10 border-4 border-[#3D61AB] border-t-transparent rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-[#3D61AB] text-lg font-medium">
          Loading Blog Articles...
        </p>
      </div>      )}
    </div>
  );
};

export default Page;
