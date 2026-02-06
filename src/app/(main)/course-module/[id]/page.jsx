"use client";

import Link from "next/link";
import Module from "../../../../components/Module/Module";
import { useState } from "react";
import { useParams } from "next/navigation";

export default function Page() {
  const [activeCard, setActiveCard] = useState(null);
const params = useParams().id
  const handleCardClick = (card) => {
    setActiveCard(card);
  };

  return (
    <div className="p-6 mb-[144px]">
 {/* <h4 className="text-2xl font-marko mt-6 sm:text-5xl md:text-center  ">
          Course Modules
        </h4> */}
      {/* 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3  gap-4 mt-[53px]">
        <Link href={`/course-topics/course-videos/${params}`}>

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
        <Link href={`/course-topics/mcqs-lists/${params}`}>
          <div className="cursor-pointer bg-[#99B9A7] text-white text-4xl border rounded-xl shadow-md px-6 py-16 hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold mb-2">MCQs</h2>
            <p className="text-base text-white">Attempt practice MCQs here.</p>
          </div>
        </Link>

        {/* 3. Resources Card */}
        <Link href={`/course-topics/resources?video_id=${params}`}>
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
