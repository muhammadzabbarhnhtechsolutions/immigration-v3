'use client';
import React, { useState } from 'react';
import { FaPlayCircle } from 'react-icons/fa';
import bgImage from '../../assets/bgv3.png';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => setIsPlaying(true);

  // Animation variants
  const textVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const buttonVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { delay: 0.5, duration: 0.5 } },
  };

  const imageVariant = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
  };

  return (
    <section
      className="text-white px-4 h-screen sm:px-8 lg:px-8 py-12 sm:py-28 relative overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* <div className="absolute inset-0 bg-black/ z-0"></div> Dark overlay for contrast */}

      <div className="container mx-auto relative z-10 flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-1">
        {/* Left Content */}
        <motion.div
          className="w-full md:w-4xl max-w-4xl text-center md:text-left"
          initial="hidden"
          animate="visible"
          variants={textVariant}
        >
          <h1
            style={{ lineHeight: '62px' }}
            className="text-3xl font-marko sm:text-5xl md:text-4.5xl font-bold mb-4 sm:mb-6 leading-[62px]"
          >
            Master UK Immigration Law. Anytime. Anywhere.
          </h1>
          <p className="text-base font-medium sm:text-xl mb-4 sm:mb-6 text-white/90">
            Courses, templates, forums, and expert insights for lawyers, <br /> students, and the public.
          </p>

          <motion.button
            className="bg-transparent flex mx-auto md:mx-0 items-center gap-2 border-2 border-white text-white font-medium px-4 sm:px-6 py-2 sm:py-3 rounded-md shadow-md hover:bg-white hover:text-[#88B29A] transition-all text-lg"
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            variants={buttonVariant}
          >
            Browse Courses
            <ArrowRight className="transition-transform duration-300 hover:translate-x-2" />
          </motion.button>
        </motion.div>

        {/* Right Video/Image Content */}
        <motion.div
          className="relative w-full md:w-xl max-w-sm sm:max-w-XL md:max-w-md"
          initial="hidden"
          animate="visible"
          variants={imageVariant}
        >
          {isPlaying ? (
            <div className="relative w-full h-[220px] sm:h-[280px] md:h-[330px] rounded-xl overflow-hidden shadow-lg">
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
            <div className="relative group">
              <img
                src="https://immigrationnavigator.co.uk/wp-content/uploads/2023/06/creative-copywriters-working-on-articles.jpg"
                alt="People discussing immigration law"
                className="w-full rounded-xl shadow-lg transition-transform duration-500 group-hover:scale-105"
              />
              <motion.button
                onClick={handlePlay}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full text-white"
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1, transition: { delay: 0.5 } }}
              >
                <FaPlayCircle className="text-5xl sm:text-6xl drop-shadow-xl" />
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
