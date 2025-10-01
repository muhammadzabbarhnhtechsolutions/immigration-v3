"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

import img1 from "../../assets/i11.png";
import img2 from "../../assets/i12.png";
import img3 from "../../assets/i13.png";
import img4 from "../../assets/ig1.png";
import img5 from "../../assets/ig2.png";
import img6 from "../../assets/ig3.png";
import bg from "../../assets/bg33.png";

// 🔹 Variants
const cardVariant = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.2, duration: 0.6, type: "spring", stiffness: 120 },
  }),
  hover: { scale: 1.05, y: -8, transition: { type: "spring", stiffness: 250 } },
};

const imageCardVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.25, duration: 0.7, ease: "easeOut" },
  }),
  hover: { scale: 1.03, transition: { duration: 0.4 } },
};

export default function HomeSections() {
  return (
    <div
      className="w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${bg.src})` }}
    >
      {/* --- HOW IT WORKS --- */}
      {/* <section className="py-16 px-4 bg-gradient-to-b from-[#F8FAF9] via-[#EFEFEF] to-[#F8FAF9] sm:px-8 lg:px-12">
        {/* Title */}
        {/* <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center font-marko text-2xl sm:text-[38px] font-[400] mb-14 relative"
        >
          HOW IT WORKS
          <span className="block w-20 h-1 bg-[#88B29A] mx-auto mt-3 rounded-full"></span>
        </motion.h2>

        {/* Cards */}
        {/* <div className="flex flex-col md:flex-row justify-center items-center gap-12 relative">
          {[
            { img: img1, title: "Sign Up", desc: "Choose your goals." },
            { img: img2, title: "Start Learning", desc: "Watch, read, and engage" },
            { img: img3, title: "Get Results", desc: "Apply what you’ve learned confidently" },
          ].map((item, i) => (
            <React.Fragment key={i}>
              <motion.div
                className="flex flex-col items-center text-center max-w-[300px] p-8 rounded-2xl bg-white/30 shadow-md cursor-pointer group border border-transparent hover:border-[#88B29A]/50"
                variants={cardVariant}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true, amount: 0.3 }}
                custom={i}
              >
                <div className="w-40 h-40 flex items-center justify-center rounded-full bg-[#88B29A]/10 mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <Image src={item.img} alt={item.title} width={100} height={100} />
                </div>
                <h3 className="font-semibold text-xl text-gray-800 group-hover:text-[#88B29A] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-sm w-[142px] text-gray-600 mt-2">{item.desc}</p>
              </motion.div>

              {i < 2 && (
                <div className="hidden md:block w-16 h-[2px] bg-gradient-to-r from-[#88B29A] to-transparent"></div>
              )}
            </React.Fragment>
          ))}
        </div> */}

        {/* Button */}
        {/* <div className="flex justify-center mt-10">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#88B29A] hover:bg-[#6FA589] text-white px-7 sm:px-9 py-3 font-semibold rounded-full shadow-md hover:shadow-xl transition-all duration-300 animate-pulse"
          >
            Request a Demo
          </motion.button>
        </div>  */}
      {/* </section>  */}

      {/* --- EXPLORE COURSES --- */}
      <section className="py-20 bg-gradient-to-b from-white via-[#F9FAFB] to-[#F3F7F5] px-4 sm:px-8 lg:px-12">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center font-marko text-2xl sm:text-[40px] font-[400] mb-14"
        >
          Content Teaser
          <span className="block w-20 h-1 bg-[#88B29A] mx-auto mt-4 rounded-full"></span>
        </motion.h2>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
          {[img4, img5, img6].map((img, idx) => (
            <motion.div
              key={idx}
              className="relative group w-80 sm:w-[344px] rounded-2xl overflow-hidden shadow-lg cursor-pointer"
              variants={imageCardVariant}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, amount: 0.3 }}
              custom={idx}
            >
              {/* Image */}
              <Image
                src={img}
                alt="Course"
                className="w-full h-60 object-cover transform group-hover:scale-110 transition-transform duration-700"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-all duration-500"></div>

              {/* Content */}
              <div className="absolute bottom-0 p-6 text-white">
                <h3 className="font-semibold text-xl mb-2">
                  {idx === 0
                    ? "Spouse Visa"
                    : idx === 1
                    ? "Skilled Worker Visa"
                    : "Innovator Visa"}
                </h3>
                <p className="text-sm text-gray-200 leading-relaxed">
                  {idx === 0
                    ? "Learn how to prepare, apply, and avoid rejections."
                    : idx === 1
                    ? "Eligibility, endorsements, and key supporting documents."
                    : "Your complete transition guide post-graduation."}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Button */}
        <div className="flex justify-center mt-16">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#88B29A] text-white px-8 py-3 font-semibold rounded-full shadow-lg hover:bg-[#6e9d81] hover:shadow-xl transition-all duration-300"
          >
            Free Sample Lesson
          </motion.button>
        </div>
      </section>
    </div>
  );
}
