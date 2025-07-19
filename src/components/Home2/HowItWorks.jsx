"use client"
import Image from "next/image";
import React, { useRef, useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";

// Import local images
import img1 from "../../assets/user.png";
import img2 from "../../assets/video.png";
import img3 from "../../assets/apply.png";
import img4 from "../../assets/pic1.png";
import img5 from "../../assets/pic2.png";
import img6 from "../../assets/pic3.png";
import img7 from "../../assets/newUser.jpg";
import bg from "../../assets/bg33.png"
import { ArrowLeft, ArrowRight } from "lucide-react";
const HomeSections = () => {
    const [current, setCurrent] = useState(0);
const testimonials = [
  {
    name: "John Doe",
    text: "Immigration Navigator made my visa process super easy. Highly recommended!",
    role: "Software Engineer",
    image:img7
  },
  {
    name: "Sara Ali",
    text: "Great experience! The team guided me step by step.",
    role: "Student",
    image:img5

  },
  {
    name: "Michael Smith",
    text: "The best service I have used for visa consultation.",
    role: "Businessman",
    image:img6

  },
];
// const [current, setCurrent] = useState(0);
  const startX = useRef(null);

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    if (startX.current - endX > 100) {
      nextCard();
    } else if (endX - startX.current > 100) {
      prevCard();
    }
  };

  const nextCard = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prevCard = () => {
    setCurrent((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };
  return (
    <div
  className="w-full bg-cover bg-center"
  style={{ backgroundImage: `url(${bg})` }}
>
      {/* HOW IT WORKS */}
      <section className="py-20 ">
        <h2 className="text-center md:text-3xl font-normal mb-8">HOW IT WORKS</h2>
        <div className="flex flex-col md:flex-row mt-12 justify-center items-center gap-6 px-4 md:px-0">
          {/* Step 1 */}
          <div className="flex flex-col items-center leading-relaxed text-center max-w-[280px]">
            <Image src={img1} alt="Create Account"width={78} height={60} className="mb-2" />
            <h3 className="font-semibold">Create Your Free Account</h3>
            <p className="text-sm text-gray-600 mt-1">
              Discover courses and prepare for success.
            </p>
          </div>

          <div className="hidden md:block w-12 h-[2px] bg-gray-300"></div>

          {/* Step 2 */}
          <div className="flex flex-col items-center leading-relaxed text-center max-w-[280px]">
            <Image src={img2} alt="Start Learning" width={78} height={60} className="mb-2" />
            <h3 className="font-semibold">Start Learning Instantly</h3>
            <p className="text-sm text-gray-600 mt-1">
              Watch tutorials, explore resources, and boost your knowledge.
            </p>
          </div>

          <div className="hidden md:block w-12 h-[2px] bg-gray-300"></div>

          {/* Step 3 */}
          <div className="flex flex-col items-center leading-relaxed text-center max-w-[280px]">
            <Image src={img3} alt="Apply with Confidence" width={78} height={60} className="mb-2" />
            <h3 className="font-semibold">Apply With Confidence</h3>
            <p className="text-sm text-gray-600 mt-1">
              Submit your applications with success strategies.
            </p>
          </div>
        </div>

        <div className="flex justify-center mt-20">
          <button className="bg-[#3D61AB] hover:bg-[#3D61AB] text-white px-6 py-2.5 font-semibold rounded-full shadow">
            Request a Demo
          </button>
        </div>
      </section>

      {/* FEATURED COURSES */}
      <section className="py-12 bg-white">
        <h2 className="text-center md:text-3xl font-normal mb-14">Featured Courses</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 px-4 md:px-0">
          {/* Course Card */}
          <div className="bg-gray-50 rounded-lg shadow hover:shadow-lg h-[346px]  pb-12 w-80 text-center">
            <Image
              src={img4}
              alt="UK Spouse Visa"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <div className="py-2 pb-4 px-5">
            <h3 className="font-semibold text-lg mb-2">UK Spouse Visa Step-by-Step Guide</h3>
            <p className="text-sm text-gray-600 mb-22">Explained process for your visa journey.</p>
          </div>
          </div> 

          {/* Course Card */}
          <div className="bg-gray-50 rounded-lg shadow hover:shadow-lg h-[346px] pb-12 w-80 text-center">
            <Image
              src={img5}
              alt="Global Talent Visa"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <div className="py-2 pb-4 px-5">
            <h3 className="font-semibold text-lg mb-2">Global Talent Visa Essentials</h3>
            <p className="text-sm text-gray-600 mb-22">Step-by-step guidance to secure your visa.</p>
            </div>
          </div>

          {/* Course Card */}
          <div className="bg-gray-50 rounded-lg shadow hover:shadow-lg h-[346px]  pb-12 w-80 text-center">
            <Image
              src={img6}
              alt="Student to Skilled Worker"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <div className="py-2 pb-4 px-5">
            <h3 className="font-semibold text-lg mb-2">Student to Skilled Worker Route</h3>
            <p className="text-sm text-gray-600 mb-22">Smooth transition for your career journey.</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-16">
          <button className="bg-[#3D61AB] hover:bg-[#3D61AB] text-white px-6 py-2.5 font-semibold rounded-full shadow">
            Browse All Courses
          </button>
        </div>
      </section>

      {/* WHAT OUR USERS SAY */}
      <section className="py-16 bg-gray-100 px-4 md:px-10">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-normal text-black mb-10">
          What Our Users Say
        </h2>

        <div
          className="relative w-full h-80 flex justify-center items-center overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {testimonials.map((item, index) => {
            const isActive = index === current;
            const isPrev =
              index === (current - 1 + testimonials.length) % testimonials.length;
            const isNext = index === (current + 1) % testimonials.length;

            return (
              <div
                key={index}
                className={`absolute transition-all duration-500 ease-in-out p-6 rounded-2xl shadow-lg bg-white w-96
                  ${isActive ? "z-20 scale-100 opacity-100" : ""}
                  ${isPrev ? "z-10 -translate-x-16 scale-95 opacity-70" : ""}
                  ${isNext ? "z-10 translate-x-16 scale-95 opacity-70" : ""}
                  ${!isActive && !isPrev && !isNext ? "opacity-0" : ""}
                `}
              >
                <FaQuoteLeft className="text-3xl text-[#3D61AB] mx-auto mb-4" />
                <Image
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 rounded-full mx-auto border-none mb-3"
                />
                <p className="text-gray-700 italic">"{item.text}"</p>
                <h4 className="mt-4 text-lg font-semibold text-[#3D61AB]">
                  {item.name}
                </h4>
                <span className="text-gray-500 text-sm">{item.role}</span>
              </div>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={prevCard}
            className="bg-[#3D61AB] text-white px-4 py-2 rounded-full hover:bg-[#2B4570] transition"
          >
            <ArrowLeft/>
          </button>
          <button
            onClick={nextCard}
            className="bg-[#3D61AB] text-white px-4 py-2 rounded-full hover:bg-[#2B4570] transition"
          >
            <ArrowRight/>
          </button>
        </div>
      </div>
    </section>

    </div>
  );
};

export default HomeSections;
