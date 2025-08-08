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
        <h2 style={{ fontFamily: 'Marcellus, serif' }} className="text-center  text-2xl sm:text-4xl font-[400] mb-8">
          HOW IT WORKS
        </h2>
        <div className="flex flex-col md:flex-row mt-12 md:py-8 justify-center items-center gap-8">
          {[
            { img: img1, title: "Create Your Free Account", desc: "Discover courses and prepare for success." },
            { img: img2, title: "Start Learning Instantly", desc: "Watch tutorials, explore resources, and boost your knowledge." },
            { img: img3, title: "Apply With Confidence", desc: "Submit your applications with success strategies." },
          ].map((item, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center leading-relaxed text-center max-w-[260px]">
                <Image src={item.img} alt={item.title} width={78} height={60} className="mb-2" />
                <h3 className="font-semibold text-base sm:text-lg">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
              </div>
              {i < 2 && <div className="hidden md:block w-12 h-[2px] bg-gray-300"></div>}
            </React.Fragment>
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <button className="bg-[#88B29A] text-white px-5 sm:px-6 py-2 sm:py-2.5 font-semibold rounded-full shadow hover:bg-[#88B29A] transition">
            Request a Demo
          </button>
        </div>
      </section>

      {/* FEATURED COURSES */}
      <section className="py-12 md:py-32 bg-white px-4 sm:px-8 lg:px-12">
        <h2 style={{ fontFamily: 'Marcellus, serif' }}  className=" text-center text-2xl sm:text-[40px] font-[400] mb-10">
Courses Preview         </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:mt-12 gap-6 justify-items-center">
          {[img4, img5, img6].map((img, idx) => (
            <div key={idx} className="bg-gray-50 rounded-lg shadow hover:shadow-lg w-72 sm:w-80">
              <Image
                src={img}
                alt="Course"
                className="w-full h-44 sm:h-48 object-cover rounded-t-lg"
              />
              <div className="py-4 px-5 text-center">
                <h3 className="font-semibold text-lg mb-2">
                  {idx === 0
                    ? "UK Spouse Visa Step-by-Step Guide"
                    : idx === 1
                    ? "Global Talent Visa Essentials"
                    : "Student to Skilled Worker Route"}
                </h3>
                <p className="text-sm text-gray-600">
                  {idx === 0
                    ? "Explained process for your visa journey."
                    : idx === 1
                    ? "Step-by-step guidance to secure your visa."
                    : "Smooth transition for your career journey."}
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
      <section className="py-16 bg-gray-100 px-4 sm:px-6 lg:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2  style={{ fontFamily: 'Marcellus, serif' }} className="text-2xl sm:text-4xl font-[400] text-black mb-10">
            What Our Users Say
          </h2>
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
