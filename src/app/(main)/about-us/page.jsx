"use client"
import { ArrowRight, ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from 'framer-motion';
import { FaPlayCircle } from "react-icons/fa";
import { useState } from "react";

export default function AboutUs() {
    const [isPlaying, setIsPlaying] = useState(false);
  
    const handlePlay = () => setIsPlaying(true);
  // .....
  // .
  // ..
    // Animation variants
    const textVariant = {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0, transition: { duration: 1 } },
    };
  
    
    const imageVariant = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
  };
  return (
    <main className="min-h-screen md:mx-12 bg-white">
      {/* Hero Section */}
      <section className="container md:px-4 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="mx-12 mt-12">
          <h1 className="text-3xl md:text-5xl font-semibold text-gray-900 leading-tight">
            Take steps to <br />
            succeed, grow & <br />
            <span className="text-[#88B29A]">
              elevate your <br />
              practice
            </span>
          </h1>
          <p className="mt-4 text-gray-600 max-w-md">
            Immigration Navigator is a successful platform which offers you the
            chance to further your practice in UK Immigration Law through our
            wide range of services.
          </p>
          {/* Button Updated */}
        <motion.button
             className="relative overflow-hidden bg-transport  mt-6 flex items-center gap-2 text-[#88B29A]  border border-gray-200 font-semibold px-6 py-2.5 rounded-full shadow-lg text-lg"
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
             <span className="relative z-10">Free Demo</span>
       
             {/* Animated Arrow */}
             <motion.span
               className="relative z-10"
               animate={{ x: [0, 6, 0] }}
               transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
             >
               <ArrowRight className="w-5 h-5" />
             </motion.span>
           </motion.button>
        </div>

        {/* Better Graphic Placeholder */}
        <div className="p-6 mt-6 rounded-lg flex justify-center">
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

      {/* Our Story & Mission Section */}
     <section className="bg-[#88B29A14] w-full py-6 px-6 md:px-3">
  <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
    
    {/* Our Story */}
    <div className="p-4 md:p-6 lg:p-8">
      <h2 className="text-2xl md:text-[35px] font-bold text-[#88B29A] font-sans mb-5 md:mb-6 text-center md:text-left">
        Our Story
      </h2>
      <p className="text-[#676767] mb-5 text-base md:text-base leading-relaxed text-justify">
        At Immigration Navigator, our story is one driven by a passion for
        excellence in UK Immigration Law. Founded by experienced legal
        professionals, we recognised the need for comprehensive and accessible
        resources. With our video resources, written guides, and application
        templates, we empower individuals and legal professionals to navigate
        the complexities of UK Immigration Law with confidence and achieve their
        desired outcomes.
      </p>
      <p className="text-[#676767] text-base md:text-base  leading-relaxed text-justify">
        We provide a comprehensive range of resources including video resources written materials and application templates to meet your
        specific needs.
      </p>
    </div>

    {/* Our Mission */}
    <div className="p-4 md:p-4 lg:p-8">
      <h2 className="text-2xl md:text-[35px] font-bold text-[#88B29A] font-sans mb-5 md:mb-6 text-center md:text-left">
        Our Mission
      </h2>
      <p className="text-[#676767] mb-5 text-base md:text-base leading-relaxed text-justify">
        We are dedicated to providing comprehensive resources and expert
        guidance in the complex field of UK Immigration Law. We offer a range of
        specialised services to empower you in navigating the intricacies of
        immigration applications and processes.
      </p>
      <p className="text-[#676767] text-base md:text-base leading-relaxed text-justify">
        We have earned a reputation for our reliable and accurate Immigration
        Law resources. Our materials are meticulously researched and regularly
        updated to reflect the latest legal developments. Rely on our trusted
        expertise to guide you through the ever-changing immigration landscape.
      </p>
    </div>

  </div>
</section>


      {/* CTA Section */}
      <section className="container mx-auto px-2 py-12 mb-12">
        <div className="bg-[#88B29A] p-6 md:p-6 flex flex-col md:flex-row md:justify-between items-center rounded-lg gap-6">
          {/* Left Content */}
          <div className="flex flex-col text-center md:text-left items-center md:items-start">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#ffffff] mb-4">
              Start Your Journey Today!
            </h2>
            <p className="text-white mb-6 max-w-2xl text-base md:text-lg leading-relaxed">
              Explore our resources by signing up to gain the knowledge and
              tools required to navigate UK Immigration Law with confidence.
            </p>
          </div>

          {/* Right Button Updated */}
         <div>
           {/* <motion. */}
  <button
    className="bg-white flex items-center justify-center px-6 py-3 text-[#88B29A] rounded-md font-medium hover:bg-[#6f967f] hover:text-white transition-colors 
               animate-pulse"
  >
    Free Demo <ArrowRightIcon className="ml-2 h-5 w-5" />
  </button>
</div>

        </div>
      </section>
    </main>
  );
}
