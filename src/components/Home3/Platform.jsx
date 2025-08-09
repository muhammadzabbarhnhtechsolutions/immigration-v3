"use client"
import { useState } from "react";
import { FaPlayCircle, FaCheckCircle } from "react-icons/fa";
import Image from "next/image";
import imgVideo from "../../assets/videoImg2.png"
export default function Platform() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
 <section className="bg-[#88B29A] text-white py-16 leading-relaxed md:py-28 px-4 sm:px-8 md:px-16 lg:px-20">
  <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10 lg:gap-16">
    
    {/* Text Section */}
    <div className="md:w-1/2 text-left md:text-left">
      <p className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-wide">
        PLATFORM INTRODUCTION
      </p>
      <p className="text-sm sm:text-base md:text-lg font-normal mt-3 leading-relaxed">
        Unlock The Knowledge, Tools, And Guidance You Need 
        To Navigate UK Immigration Law With Confidence
      </p>
      <p className="mt-4 text-xs sm:text-sm md:text-base text-gray-200 leading-relaxed">
        Our platform equips users with comprehensive resources, expert insights, and real-world scenarios.
      </p>

      <ul className="mt-6 space-y-3 text-left">
        {[
          "Lawyer-led video walkthroughs",
          "Scenario-based explanations",
          "Easy-to-understand learning format",
          "Legal references for reliability",
          "Guidance suitable for everyone"
        ].map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            <FaCheckCircle className="text-green-400 mt-1 text-lg sm:text-xl" />
            <span className="text-sm sm:text-base">{item}</span>
          </li>
        ))}
      </ul>
    </div>

    {/* Video or Thumbnail */}
    <div className="relative md:w-1/2 w-full max-w-lg">
      {isPlaying ? (
        <iframe
          className="w-full h-52 sm:h-64 md:h-80 lg:h-[22rem] rounded-md shadow-lg"
          src="https://www.youtube.com/embed/9C2fSBHryiQ?autoplay=1&controls=1"
          title="Platform Introduction Video"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      ) : (
        <div className="relative">
          <Image
            src={imgVideo}
            alt="Platform Introduction"
            width={640}
            height={420}
            className="rounded-md shadow-lg w-full h-auto"
          />
          <button
            onClick={handlePlay}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition"
          >
            <FaPlayCircle className="text-5xl sm:text-6xl text-white drop-shadow-lg" />
          </button>
        </div>
      )}
    </div>
  </div>
</section>

  );
}
