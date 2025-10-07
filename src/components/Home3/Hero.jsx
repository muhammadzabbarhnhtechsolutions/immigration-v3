'use client';
import React, { useEffect, useState } from 'react';
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

    const text = "Master UK Immigration Law. Anytime. Anywhere."
  const [displayedText, setDisplayedText] = useState("")
  const [index, setIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    let timeout;

    if (!isDeleting && index < text.length) {
      // typing effect
      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(index))
        setIndex(index + 1)
      }, 80) // typing speed
    } else if (!isDeleting && index === text.length) {
      // pause before deleting
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && index > 0) {
      // deleting effect
      timeout = setTimeout(() => {
        setDisplayedText(text.substring(0, index - 1))
        setIndex(index - 1)
      }, 40) // deleting speed
    } else if (isDeleting && index === 0) {
      // restart typing
      setIsDeleting(false)
    }

    return () => clearTimeout(timeout)
  }, [index, isDeleting])

  return (
    <section
      className="text-white px-4 h-[555px] sm:px-8 lg:px-8 py-12 sm:py-28 relative overflow-hidden"
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
           <motion.h1
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ lineHeight: "62px" }}
      className="text-3xl font-marko sm:text-5xl md:text-4.5xl font-bold mb-4 sm:mb-6 leading-[62px]"
    >
      {displayedText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-[2px] h-8 bg-[#88B29A] ml-1 align-middle"
      ></motion.span>
    </motion.h1>
          <p className="text-base font-medium sm:text-xl mb-4 sm:mb-6 text-white/90">
            Courses, templates, forums, and expert insights for lawyers, <br /> students, and the public.
          </p>

        <motion.button
      className="relative overflow-hidden bg-transport border border-white flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-full shadow-lg text-lg"
      whileHover={{ scale: 1.08, rotate: 1 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Shiny glow effect */}
      <motion.span
        className="absolute inset-0 bg-white/20"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Text */}
      <span className="relative z-10">Browse Courses</span>

      {/* Animated Arrow */}
      <motion.span
        className="relative z-10"
        animate={{ x: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <ArrowRight className="w-5 h-5" />
      </motion.span>
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
                className="absolute top-[112px] left-[186px] transform -translate-x-1/2 -translate-y-1/2 rounded-full text-white"
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
