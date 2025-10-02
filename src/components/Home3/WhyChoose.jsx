"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { motion } from "framer-motion";

import img1 from "../../assets/img00022.jpg";
import img2 from "../../assets/img00033.jpg";
import img3 from "../../assets/img00044.png";
import img4 from "../../assets/img00055.png";
import img5 from "../../assets/pic2.png";
import img6 from "../../assets/pic3.png";
import img7 from "../../assets/newUser.jpg";
import img11 from "../../assets/ii3.png";
import img12 from "../../assets/ii4.png";
import icon1 from "../../assets/1.gif";
import icon2 from "../../assets/2.gif";
import icon3 from "../../assets/3.gif";
import icon4 from "../../assets/4.gif";
import icon5 from "../../assets/5.gif";
import icon9 from "../../assets/6.gif";
import i7 from "../../assets/010.png";
import i8 from "../../assets/020.png";
import i9 from "../../assets/030.png";
import Link from "next/link";
const PlatformBenefits = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);



  const testimonials = [
    {
      id: 1,
      text: "“This platform simplified the Global Talent Visa process for me. The guidance was spot-on!”",
      name: "Amelia Clarke",
      role: "Tech Professional",
      avatar: img7,
      badge: img11,
    },
    {
      id: 2,
      text: "“The templates and resources saved me countless hours. Highly recommend it to lawyers and clients alike.”",
      name: "James Patel",
      role: "Immigration Lawyer",
      avatar: img6,
      badge: img11,
    },
    {
      id: 3,
      text: "“As an entrepreneur, I found the visa route guidance extremely clear and practical.”",
      name: "Sophia Martinez",
      role: "Startup Founder",
      avatar: img5,
      badge: img11,
    },
  ];

  const benefits = [
    {
      title: "Legal Representation Guidance",
      description: "When and how to use a lawyer or an OISC adviser.",
      image: img1,
    },
    {
      title: "Referral Network",
      description: "Trusted partners for complex or specialist needs.",
      image: img2,
    },
    {
      title: "Multiple Tools",
      description: "Track learning progress, feedback and reports.",
      image: img3,
    },
    {
      title: "Support",
      description: "Step by step guidance for your success.",
      image: img4,
    },
  ];

  const keyFeatures = [
    { icon: icon2, title: "Easy to Step-by-step courses" },
    { icon: icon4, title: "Podcast & video learning" },
    { icon: icon9, title: "Downloadable templates" },
    { icon: icon5, title: "Instant feedback quizzes" },
    { icon: icon3, title: "Verified by immigration lawyers" },
    { icon: icon1, title: "Active support & community" },
  ];

  const audience = [
    { icon: i9, title: "Podcast", text: "Stay updated with legal training", route: "/video-trailer" },
    { icon: i8, title: "Forums", text: "Learn how to apply the right way", route: "/forum" },
    { icon: i7, title: "Legal Advice", text: "Understand your immigration options", route: "/legal-advice" },
  ];

  // Animation variants
  const cardVariant = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: i * 0.15, duration: 0.6, type: "spring", stiffness: 120 },
    }),
    hover: { scale: 1.0, y: -5, transition: { type: "spring", stiffness: 300 } },
  };

  const iconVariant = {
    hover: { scale: 1.2, rotate: [0, 10, -10, 0], transition: { duration: 0.6 } },
  };
  return (
    <>
      {/* ✅ Benefits Section */}
      <section className="py-12 px-4 md:py-20 sm:px-8 lg:px-16 text-center bg-white">
        <h2 className="font-marko text-2xl sm:text-5xl font-[400] mb-2">
Community
        </h2>
        {/* <p className="font-marko text-black text-lg sm:text-3xl mt-4 mb-14">
          Platform Benefits
        </p> */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:py-12">
         {audience.map(({ icon, title, text, route }, idx) => (
            <Link key={idx} href={route}>
              <motion.div
                className="bg-[#3F855D40] transform transition-all duration-300 cursor-pointer hover:-translate-y-3 hover:shadow-xl bg-opacity-20 border border-[#D9E3F2] p-6 sm:p-8 rounded-2xl shadow-sm"
                variants={cardVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx}
              >
                <motion.div
                  className="flex items-center gap-4 mb-4"
                  variants={iconVariant}
                >
                  <Image
                    src={icon}
                    alt={title}
                    width={72}
                    height={72}
                    className="rounded-lg"
                  />
                  <h3
                    style={{ fontFamily: "Marcellus, serif" }}
                    className="font-semibold text-2xl sm:text-[28px] ml-1   text-[#1A2B4B]"
                  >
                    {title}
                  </h3>
                </motion.div>
                {/* <p classsName="text-sm text-[#637587] leading-relaxed">{text}</p> */}
              </motion.div>
            </Link>
          ))}
          </div>
        {/* <button className="mt-10 bg-[#76a088] text-white text-sm sm:text-base px-5 sm:px-6 py-3 rounded-full hover:bg-[#94c2a8] transition-all animate-pulse">
          Request a Demo
        </button> */}
      </section>

      {/* ✅ Testimonials Section */}
      <section className="py-12 md:py-20 px-4 sm:px-8 lg:px-12 bg-[#f9fafb]">
        <h2 className="text-center font-marko text-2xl sm:text-[36px] font-[500] mb-10">
          Testimonials
        </h2>

        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="h-[330px]"
        >
          {testimonials.map((item, i) => (
            <SwiperSlide key={item.id}>
              <motion.div
                variants={cardVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                whileHover="hover"
                custom={i}
                className="bg-white shadow-md h-[270px] rounded-xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <Image
                      src={img12}
                      alt="quote"
                      width={30}
                      height={30}
                      className="object-contain"
                    />
                    <Image
                      src={item.badge}
                      alt="badge"
                      width={30}
                      height={30}
                      className="object-contain"
                    />
                  </div>
                  <p className="text-gray-700 text-[15px] mt-4 italic">
                    {item.text}
                  </p>
                </div>

                {/* User */}
                <div className="flex items-center gap-3 mt-6">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    width={46}
                    height={46}
                    className="rounded-full"
                  />
                  <div>
                    <h4 className="text-gray-800 font-medium text-base">
                      {item.name}
                    </h4>
                    <p className="text-sm text-green-600 font-semibold">
                      {item.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
};

export default PlatformBenefits;
