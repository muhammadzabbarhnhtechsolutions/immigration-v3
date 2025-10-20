"use client";

import { useState } from "react";
import { FaPlayCircle } from "react-icons/fa";
import LegalAdvicePricing from "../../../components/Pricing/LegalAdvicePricing";

export default function LegalAdvicePage() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => setIsPlaying(true);
  
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-22 items-center">
        {/* Left */}
        <div className="ml-4">
          <h1 style={{lineHeight:"54px"}} className="text-3xl md:text-4xl font-bold text-[#88B29A] mb-6">
            Legal Advice & Confidential Consultation
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Book a confidential consultation with a UK-qualified solicitor for
            clear, expert immigration advice tailored to your circumstances.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Choose a <span className="font-semibold">30-minute session (£150 + VAT)</span>
            or a <span className="font-semibold">60-minute session (£300 + VAT)</span>
            to get answers you can trust and practical guidance on your next steps.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            With in-depth knowledge of UK immigration law and a focus on your
            individual needs, we provide professional support to help you move
            forward with confidence.
          </p>
        </div>

        {/* Right - Video */}
        <div className="relative w-full max-w-lg mx-auto ">
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
              <button
                onClick={handlePlay}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full text-white"
              >
                <FaPlayCircle className="text-5xl sm:text-6xl drop-shadow-xl" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Legal Advice Pricing Section */}
      <section className="container mx-auto flex justify-center items-center px-6 py-12">
        <LegalAdvicePricing />
      </section>
    </main>
  );
}
