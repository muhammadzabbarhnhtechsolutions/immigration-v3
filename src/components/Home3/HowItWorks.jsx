"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { ArrowLeft, ArrowRight } from "lucide-react";

import img1 from "../../assets/i11.png";
import img2 from "../../assets/i12.png";
import img3 from "../../assets/i13.png";
import img4 from "../../assets/ig1.png";
import img5 from "../../assets/ig2.png";
import img6 from "../../assets/ig3.png";
import img7 from "../../assets/newUser.jpg";
import bg from "../../assets/bg33.png";
// ...
const HomeSections = () => {
  const [current, setCurrent] = useState(0);
  const startX = useRef(null);

  const testimonials = [
    {
      name: "John Doe",
      text: "Immigration Navigator made my visa process super easy. Highly recommended!",
      role: "Software Engineer",
      image: img7,
    },
    {
      name: "Sara Ali",
      text: "Great experience! The team guided me step by step.",
      role: "Student",
      image: img5,
    },
    {
      name: "Michael Smith",
      text: "The best service I have used for visa consultation.",
      role: "Businessman",
      image: img6,
    },
  ];

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    if (startX.current - endX > 100) nextCard();
    else if (endX - startX.current > 100) prevCard();
  };

  const nextCard = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prevCard = () =>
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));

  return (
    <div
      className="w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${bg.src})` }}
    >
      {/* HOW IT WORKS */}
      <section className="py-10 px-4 bg-[#EFEFEF] sm:px-8 lg:px-12">
        {/* Heading */}
        <h2 className="text-center font-marko text-2xl py-12 sm:text-[38px] font-[400] mb-2 relative after:content-[''] after:block after:w-16 after:h-1 after:bg-[#88B29A] after:mx-auto after:mt-3">
          HOW IT WORKS
        </h2>
        {/* Steps */}
        <div className="flex flex-col md:flex-row mt-1  md:ml-16 md:py-8 justify-center items-center gap-12 relative">
          {[
            { img: img1, title: "Sign Up", desc: "Choose your goals." },
            {
              img: img2,
              title: "Start Learning",
              desc: "Watch, read, and engage",
            },
            {
              img: img3,
              title: "Get Results",
              desc: "Apply what you’ve learned confidently",
            },
          ].map((item, i) => (
            <React.Fragment key={i}>
              {/* Card */}
              <div className="flex flex-col items-center text-center max-w-[320px] p-6 rounded-2xl hover:shadow-xl hover:-translate-y-3 transition-all duration-700  cursor-pointer group">
                <div className="w-44 h-44 flex items-center justify-center rounded-full bg-[#88B29A]/10 mb-4 group-hover:scale-110 transition-transform duration-500">
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={100}
                    height={100}
                  />
                </div>
                <h3 className="font-normal text-xl">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{item.desc}</p>
              </div>

              {/* Connector Line */}
              {i < 2 && (
                <div className="hidden md:block w-16 h-[2px] bg-gradient-to-r from-[#88B29A] to-transparent"></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Button */}
        <div className="flex justify-center mt-10">
          <button className="bg-[#88B29A] hover:bg-[#6FA589] text-white px-6 sm:px-8 py-3 sm:py-3.5 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
            Request a Demo
          </button>
        </div>
      </section>

  <section className="py-12 md:py-24 bg-white/60 px-4 sm:px-8 lg:px-12">
  <h2 className="text-center font-marko text-2xl sm:text-[40px] font-[400] mb-10">
    Explore Courses
  </h2>

  {/* Cards Grid */}
  <div className="grid grid-cols-1 pb-24   sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
    {[img4, img5, img6].map((img, idx) => (
      <div
        key={idx}
        className="bg-white relative rounded-xl mt-10 shadow-md hover:shadow-lg transition-all duration-500 hover:-translate-y-2 w-72 sm:w-[344px]"
      >
        {/* Image */}
        <Image
          src={img}
          alt="Course"
          className="w-full h-44 sm:h-56 object-cover rounded-t-xl"
        />

        {/* Content */}
        <div className="px-5 absolute mx-5  h-44 py-8 -mt-4 border-t-4 border-[#88B29A] bg-white text-left">
          <h3 className="font-normal text-xl mr-4 mb-2">
            {idx === 0
              ? "Spouse Visa Application 2025"
              : idx === 1
              ? "Global Talent Visa Essentials"
              : "Student to Skilled Worker Route"}
          </h3>
          <p className="text-sm text-gray-600">
            {idx === 0
              ? "Learn how to prepare, apply, and avoid rejections."
              : idx === 1
              ? "Eligibility, endorsements, and key supporting documents."
              : "Your complete transition guide post-graduation."}
          </p>
        </div>
      </div>
    ))}
  </div>

  {/* Button */}
  <div className="flex justify-center mt-24">
    <button className="bg-[#88B29A] text-white px-6 sm:px-8 py-2.5 sm:py-3 font-semibold rounded-full shadow hover:bg-[#6e9d81] transition">
Free Sample Lesson    </button>
  </div>
</section>


      {/* WHAT OUR USERS SAY */}
   
    </div>
  );
};

export default HomeSections;
