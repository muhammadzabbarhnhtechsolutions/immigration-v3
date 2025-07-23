"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import bgImg from "../../assets/bg.png";
import { ArrowRight } from "lucide-react";
import { FaPlay, FaPlayCircle } from "react-icons/fa";
import { FaPlaneCircleCheck } from "react-icons/fa6";

export default function Hero() {
  const phrases = [
    "UNLOCK IMMIGRATION LAW",
    "MASTER VISA STRATEGIES",
    "NAVIGATE GLOBAL OPPORTUNITIES",
    "EMPOWER YOUR FUTURE",
  ];

  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const [text, setText] = useState("");
  const [index, setIndex] = useState(0); // Phrase index
  const [subIndex, setSubIndex] = useState(0); // Character index
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (subIndex === phrases[index].length + 1 && !deleting) {
      // Pause before starting delete
      setTimeout(() => setDeleting(true), 500); // Reduced pause time before delete
      return;
    }

    if (subIndex === 0 && deleting) {
      // Move to next phrase
      setDeleting(false);
      setIndex((prev) => (prev + 1) % phrases.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setSubIndex((prev) => prev + (deleting ? -1 : 1));
        setText(phrases[index].substring(0, subIndex));
      },
      deleting ? 10 : 70
    ); // Increased speed of deletion and typing

    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting]);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-44 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={bgImg}
            alt="Hero background"
            fill
            className="object-cover"
            quality={80}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-18 flex flex-col items-start justify-center text-left md:text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 transition-all duration-500 ease-in-out min-h-[4rem]">
            {text}
            <span className="border-r-2 border-black ml-1 animate-pulse" />
          </h1>
          <p className="text-lg text-start flex items-start  sm:text-xl md:text-[32px] font-medium text-white mb-8 max-w-3xl ">
            Your path to success in Immigration Law!
          </p>

          <div className="flex flex-col md:flex-col sm:flex-row items-center gap-4">
            <Link
              href="#resources"
              className="bg-white text-gray-400 text-base md:text-lg px-6 py-3 rounded-md font-medium hover:bg-transparent hover:text-white border-2 border-white transition-all flex items-center justify-center"
            >
              Explore Our Resources{" "}
              <span className="ml-2">
                <ArrowRight />
              </span>
            </Link>
            <Link
              href="#demo"
              className="border-2 md:-ml-10 font-medium border-white text-white text-base md:text-lg px-6 py-3 rounded-md hover:bg-white hover:bg-opacity-10 hover:text-gray-400 transition-all flex items-center justify-center"
            >
              Request A Demo{" "}
              <span className="ml-2">
                <ArrowRight />
              </span>
            </Link>
          </div>
        </div>
      </section>
      <section className="py-16 md:px-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          {/* Video or Image with Play Icon */}
          {isPlaying ? (
            <div className="w-full md:w-1/2 relative">
              <iframe
                width="100%"
                height="360"
                src="https://www.youtube.com/embed/9C2fSBHryiQ?autoplay=1&controls=1"
                title="YouTube video player"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
              {/* <button
                onClick={handlePause}
                className="mt-2 p-2 border-2 border-gray-400 rounded-md"
              >
                Stop Video
              </button> */}
            </div>
          ) : (
            <div className="relative w-full md:w-[64%]">
              <Image
                src="https://immigrationnavigator.co.uk/wp-content/uploads/2023/06/creative-copywriters-working-on-articles.jpg"
                alt="People discussing immigration law"
                width={660}
                height={550}
                className=" shadow-lg w-full h-auto"
              />
              <button
                onClick={handlePlay}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-2 text-white shadow-md hover:shadow-lg transition duration-300"
              >
                <FaPlayCircle className="text-5xl" />
              </button>
            </div>
          )}

          {/* Text Content */}
          <div className="w-full md:w-1/2 text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#3D61AB] mb-6">
              What We Do
            </h2>
            <div className="space-y-4 w-[100%] text-gray-900 text-[14px] sm:text-[14px]">
              <p className="leading-loose">
                We are dedicated to providing comprehensive resources and expert guidance in the complex field of UK Immigration Law. We offer a range of specialised services to empower you in navigating the intricacies of immigration applications and processes. Designed exclusively for qualified solicitors, our training programs are your gateway to staying ahead in the dynamic field of Immigration Law. Whether you’re seeking to update your knowledge or acquire new skills, we are your trusted partner in professional development.
              </p>
              <p className="leading-loose">
                Explore our resources by signing up to gain the knowledge and tools required to navigate UK Immigration Law with confidence.
              </p>
              <div className="mt-6">
                <Link
                  href="#learn-more"
                  className="inline-flex font-semibold items-center bg-[#3D61AB] text-white px-5 py-2 rounded hover:bg-[#7aa18e] transition-colors"
                >
                  Read More <span className="ml-1"><ArrowRight /></span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </main>
  );
}
