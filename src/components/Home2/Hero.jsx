'use client';
import React, { useState } from 'react';
import { FaPlayCircle } from 'react-icons/fa';
import bgImage from '../../assets/bgimg01.png';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <section
      className="bg-repeat text-white px-12 py-16"
      style={{
        backgroundImage: `url(${bgImage.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container mx-auto px-6 md:h-[414px] flex flex-col-reverse md:flex-row items-center justify-between gap-10">
        
        {/* Left Content */}
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Learn. Apply. <span className="text-white">Succeed.</span>
          </h1>
          <p className="text-lg mb-6">
            An all-in-one e-learning platform for UK Immigration Lawyers,
            Students, and the General Public.
          </p>
          <button className="bg-transparent flex gap-2 border-2 border-white text-white font-semibold px-6 py-3 rounded-md shadow-md  transition">
            Request A Demo <ArrowRight className='hover:translate-x-2 transition-all duration-300'/>
          </button>
        </div>

        {/* Right Video/Image Content */}
        <div className="relative w-full max-w-sm md:max-w-lg">
          {isPlaying ? (
            <div className="relative w-full h-[315px] md:h-[330px]">
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
                <FaPlayCircle className="text-6xl" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
