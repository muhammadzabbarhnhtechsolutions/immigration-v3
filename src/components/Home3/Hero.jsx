'use client';
import React, { useState } from 'react';
import { FaPlayCircle } from 'react-icons/fa';
import bgImage from '../../assets/bgv3.png';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => setIsPlaying(true);

  return (
    <section
      className="text-white bg- px-4 sm:px-8 lg:px-12 py-12 sm:py-28"
      style={{
        backgroundImage: `url(${bgImage.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-16">
        
        {/* Left Content */}
        <div className="w-full md:w-1/2 max-w-xl text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-[188px]">
            Master UK Immigration <br />  Law. Anytime. Anywhere.
<span className="text-white"></span>
          </h1>
          <p className="text-base sm:text-lg mb-4 sm:mb-6 text-white">
            Courses, templates, forums, and expert insights for lawyers, students, and the public.
          </p>
          <button className="bg-transparent flex mx-auto md:mx-0 items-center gap-2 border-2 border-white text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-md shadow-md hover:bg-white hover:text-[#88B29A] transition-all">
            Browse Courses
            <ArrowRight className="transition-transform duration-300 hover:translate-x-2" />
          </button>
        </div>

        {/* Right Video/Image Content */}
        <div className="relative w-full md:w-1/2 max-w-sm sm:max-w-md md:max-w-lg">
          {isPlaying ? (
            <div className="relative w-full h-[220px] sm:h-[280px] md:h-[330px]">
              <iframe
                className="w-full h-full rounded-xl shadow-lg"
                src="https://www.youtube.com/embed/9C2fSBHryiQ?autoplay=1&controls=1"
                title="YouTube video player"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div className="relative">
              <img
                src="https://immigrationnavigator.co.uk/wp-content/uploads/2023/06/creative-copywriters-working-on-articles.jpg"
                alt="People discussing immigration law"
                className="w-full rounded-xl shadow-lg"
              />
              <button
                onClick={handlePlay}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full text-white hover:scale-105 transition"
              >
                <FaPlayCircle className="text-5xl sm:text-6xl" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
