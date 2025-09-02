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
      className="text-white  px-4 h-screen sm:px-8 lg:px-8 py-12 sm:py-28"
      style={{
        backgroundImage: `url(${bgImage.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container mx-auto mt-6 flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-1">
        
        {/* Left Content */}
        <div className="w-full md:w-4xl max-w-4xl text-center md:text-left">
          <h1 style={{lineHeight:"62px"}} className="text-3xl font-marko sm:text-5xl md:text-4.5xl font-bold mb-4 sm:mb-6 leading-[188px]">
            Master UK Immigration   Law. Anytime. Anywhere.
          </h1>
          <p className="text-base  font-medium sm:text-xl mb-4 sm:mb-6 text-white">
            Courses, templates, forums, and expert insights for lawyers, <br/>  students, and the public.
          </p>
          <button className="bg-transparent flex mx-auto md:mx-0 items-center gap-2 border-2 border-white text-white font-medium px-4 sm:px-6 py-2 sm:py-3 rounded-md shadow-md hover:bg-white hover:text-[#88B29A] transition-all text-lg">
            Browse Courses
            <ArrowRight className="transition-transform duration-300 hover:translate-x-2" />
          </button>
        </div>

        {/* Right Video/Image Content */}
        <div className="relative w-full md:w-xl max-w-sm sm:max-w-XL md:max-w-md">
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
