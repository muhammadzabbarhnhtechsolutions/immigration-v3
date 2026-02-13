"use client";

import Link from "next/link";
import Module from "../../../../components/Module/Module";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";

export default function Page() {
  const [activeCard, setActiveCard] = useState(null);
  const [title, setTitle] = useState("");

  // ✅ get the id from route params
  const params = useParams();
  const id = params?.id; // Extract id properly

  // ✅ get query params (like ?title=SpouseVisa)
  const searchParams = useSearchParams();

  useEffect(() => {
    const t = searchParams.get("title");
    if (t) setTitle(t);
  }, [searchParams]);

  const handleCardClick = (card) => {
    setActiveCard(card);
  };

  return (
    <div className="p-6 mb-[144px] flex flex-col items-center justify-center">
      <h4 className="text-2xl font-marko mt-6 sm:text-5xl md:text-center">
        {title || ""}
      </h4>
      {/* 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 max-w-6xl  gap-4 mt-[53px]">
        <Link href={`/course-topics/course-videos/${id}`}>
         <div
          // onClick={() => handleCardClick("video")}
          className="cursor-pointer bg-[#99B9A7] text-white text-4xl border rounded-xl shadow-md px-6 py-16 hover:shadow-lg transition"
        >
          <h2 className="text-2xl font-semibold mb-2">Course Video</h2>
          <p className="text-base text-white">
            Watch your course module videos here.
          </p>
        </div>
        </Link>

        {/* 2. MCQs Card */}
        <Link href={`/course-topics/mcqs-lists/${id}`}>
          <div className="cursor-pointer bg-[#99B9A7] text-white text-4xl border rounded-xl shadow-md px-6 py-16 hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold mb-2">MCQs</h2>
            <p className="text-base text-white">Attempt practice MCQs here.</p>
          </div>
        </Link>

        {/* 3. Resources Card */}
        <Link href={`/course-topics/resources?video_id=${id}`}>
          <div className="cursor-pointer bg-[#99B9A7] text-white text-4xl border rounded-xl shadow-md px-6 py-16 hover:shadow-lg transition">
            <h2 className="text-2xl font-poppin font-bold mb-2">Resources</h2>
            <p className="text-base text-white">
              Access learning materials and PDFs.
            </p>
          </div>
        </Link>
      </div>

      {/* Show Module Component when Course Video card clicked */}
      <div className="mt-6">
        {activeCard === "video" && (
          <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
            <Module />
          </div>
        )}
      </div>
    </div>
  );
}
