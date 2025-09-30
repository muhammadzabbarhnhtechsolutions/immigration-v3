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

const PlatformBenefits = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // ✅ Animation Variants
  const cardVariant = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        type: "spring",
        stiffness: 120,
      },
    }),
    hover: {
      scale: 1.03,
      y: -8,
      transition: { type: "spring", stiffness: 300 },
    },
  };

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

  return (
    <>
      {/* ✅ Benefits Section */}
      <section className="py-12 px-4 md:py-20 sm:px-8 lg:px-16 text-center bg-white">
        <h2 className="font-marko text-2xl sm:text-5xl font-[400] mb-2">
          Why Choose Immigration Navigator
        </h2>
        <p className="font-marko text-black text-lg sm:text-3xl mt-4 mb-14">
          Platform Benefits
        </p>

        {isClient && (
          <Swiper
            modules={[Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="px-2 sm:px-6"
          >
            {benefits.map((benefit, i) => (
              <SwiperSlide key={i}>
                <motion.div
                  variants={cardVariant}
                  initial="hidden"
                  whileInView="visible" // 👈 scroll par animate hoga
                  viewport={{ once: true, amount: 0.3 }}
                  whileHover="hover"
                  custom={i}
                  className="group h-[270px] rounded-2xl shadow-md overflow-hidden border border-gray-200"
                >
                  {/* Image */}
                  <div className="relative w-full h-48 sm:h-72">
                    <Image
                      src={benefit.image}
                      alt={benefit.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                    {/* Text */}
                    <div className="absolute bottom-4 left-4 right-4 text-left text-white">
                      <h3 className="text-lg sm:text-xl font-semibold">
                        {benefit.title}
                      </h3>
                      <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <button className="mt-10 bg-[#76a088] text-white text-sm sm:text-base px-5 sm:px-6 py-3 rounded-full hover:bg-[#94c2a8] transition-all">
          Request a Demo
        </button>
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
