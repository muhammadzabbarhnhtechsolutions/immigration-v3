"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { ArrowLeft, ArrowRight } from "lucide-react";

import img1 from "../../assets/i11.png";
import img2 from "../../assets/i12.png";
import img3 from "../../assets/i13.png";
import img4 from "../../assets/pic1.png";
import img5 from "../../assets/pic2.png";
import img6 from "../../assets/pic3.png";
import img7 from "../../assets/newUser.jpg";
import bg from "../../assets/bg33.png";

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
  const prevCard = () => setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));

  return (
    <div
      className="w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${bg.src})` }}
    >
      {/* HOW IT WORKS */}
      <section className="py-16 px-4 bg-[#EFEFEF] sm:px-8 lg:px-12">
  {/* Heading */}
  <h2
    style={{ fontFamily: "Marcellus, serif" }}
    className="text-center text-2xl sm:text-4xl font-[400] mb-2 relative after:content-[''] after:block after:w-16 after:h-1 after:bg-[#88B29A] after:mx-auto after:mt-3"
  >
    HOW IT WORKS
  </h2>
  {/* Steps */}
  <div className="flex flex-col md:flex-row mt-12  md:ml-16 md:py-8 justify-center items-center gap-12 relative">
    {[
      { img: img1, title: "Sign Up", desc: "Choose your goals." },
      { img: img2, title: "Start Learning", desc: "Watch, read, and engage" },
      { img: img3, title: "Get Results", desc: "Apply what you’ve learned confidently" },
    ].map((item, i) => (
      <React.Fragment key={i}>
        {/* Card */}
        <div className="flex flex-col items-center text-center max-w-[260px] p-6 rounded-2xl hover:shadow-xl hover:-translate-y-3 transition-all duration-700  cursor-pointer group">
          <div className="w-32 h-32 flex items-center justify-center rounded-full bg-[#88B29A]/10 mb-4 group-hover:scale-110 transition-transform duration-500">
            <Image src={item.img} alt={item.title} width={80} height={80} />
          </div>
          <h3 className="font-semibold text-lg">{item.title}</h3>
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



            <section className="py-12 md:py-32 mb-6 bg-white px-4 sm:px-8 lg:px-12">
        <h2 style={{ fontFamily: 'Marcellus, serif' }}  className=" text-center text-2xl sm:text-[40px] font-[400] mb-10">
Courses Preview         </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:mt-12 gap-6 justify-items-center">
          {[img4, img5, img6].map((img, idx) => (
            <div key={idx} className="bg-gray-50 hover:-translate-y-4 duration-700 cursor-pointer rounded-lg shadow hover:shadow-lg w-72 sm:w-80">
              <Image
                src={img}
                alt="Course"
                className="w-full h-44 sm:h-48 object-cover rounded-t-lg"
              />
              <div className="py-4 px-5 text-center">
                <h3 className="font-medium text-lg mb-2">
                  {idx === 0
                    ? "Spouse Visa Application 2025"
                    : idx === 1
                    ? "Global Talent Visa Essentials"
                    : "Student to Skilled Worker Route"}
                </h3>
                <p className="text-sm text-gray-600">
                  {idx === 0
                    ? "Learn how to prepare, apply, and avoid rejections"
                    : idx === 1
                    ? "Eligibility, endorsements, and key supporting documents."
                    : "Your complete transition guide post-graduation."}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <button className="bg-[#88B29A] text-white px-5 sm:px-6 py-2 sm:py-2.5 font-semibold rounded-full shadow hover:bg-[#88B29A] transition">
            Browse All Courses
          </button>
        </div>
      </section>

      {/* WHAT OUR USERS SAY */}
          <h2  style={{ fontFamily: 'Marcellus, serif' }} className="text-2xl -mt-12 text-center  bg-white sm:text-[40px] pb-12 font-[400] text-black mb-10">
           Trust Section
          </h2>
      <section className="py-16  px-4 sm:px-6 lg:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className="relative w-full h-[340px] sm:h-80 flex justify-center items-center overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {testimonials.map((item, index) => {
              const isActive = index === current;
              const isPrev = index === (current - 1 + testimonials.length) % testimonials.length;
              const isNext = index === (current + 1) % testimonials.length;
              return (
                <div
                  key={index}
                  className={`absolute transition-all duration-500 ease-in-out p-6 rounded-2xl shadow-lg bg-white w-72 sm:w-96
                  ${isActive ? "z-20 scale-100 opacity-100" : ""}
                  ${isPrev ? "z-10 -translate-x-12 sm:-translate-x-16 scale-95 opacity-70" : ""}
                  ${isNext ? "z-10 translate-x-12 sm:translate-x-16 scale-95 opacity-70" : ""}
                  ${!isActive && !isPrev && !isNext ? "opacity-0" : ""}
                `}
                >
                  <FaQuoteLeft className="text-2xl sm:text-3xl text-[#88B29A] mx-auto mb-4" />
                  <Image
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto mb-3"
                  />
                  <p className="text-gray-700 italic text-sm sm:text-base">
                    "{item.text}"
                  </p>
                  <h4 className="mt-4 text-base sm:text-lg font-semibold text-[#88B29A]">
                    {item.name}
                  </h4>
                  <span className="text-gray-500 text-xs sm:text-sm">{item.role}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={prevCard}
              className="bg-[#88B29A] text-white p-2 sm:px-4 sm:py-2 rounded-full hover:bg-[#88B29A] transition"
            >
              <ArrowLeft />
            </button>
            <button
              onClick={nextCard}
              className="bg-[#88B29A] text-white p-2 sm:px-4 sm:py-2 rounded-full hover:bg-[#88B29A] transition"
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default HomeSections;
