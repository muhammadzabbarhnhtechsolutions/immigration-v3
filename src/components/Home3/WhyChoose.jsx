'use client';

import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import img1 from "../../assets/img00022.jpg"
import img2 from "../../assets/img00033.jpg"
import img3 from "../../assets/img00044.png"
import img4 from "../../assets/img00055.png"
import Image from 'next/image';
import img7 from "../../assets/newUser.jpg";
import img5 from "../../assets/pic2.png";
import img6 from "../../assets/pic3.png";
import img11 from "../../assets/ii3.png";
import img12 from "../../assets/ii4.png";
import img13 from "../../assets/ii5.png";
import { FaQuoteLeft } from 'react-icons/fa6';
import { ArrowLeft, ArrowRight } from 'lucide-react';
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination } from "swiper";
// import "swiper/css";
// import "swiper/css/pagination";

const PlatformBenefits = () => {
  const [isClient, setIsClient] = useState(false);
 const [current, setCurrent] = useState(0);
  const startX = useRef(null);



   const testimonials = [
    {
      id: 1,
      text: "“As a junior lawyer, this platform helped me master the Global Talent Visa route.”",
      name: "General Public User",
      role: "Built by immigration lawyers",
      avatar: img7, // replace with your image
      badge: img11, // replace with your image
    },
    {
      id: 2,
      text: "“As a junior lawyer, this platform helped me master the Global Talent Visa route.”",
      name: "General Public User",
      role: "Built by immigration lawyers",
      avatar: img6,
      badge: img11,
    },
    {
      id: 3,
      text: "“As a junior lawyer, this platform helped me master the Global Talent Visa route.”",
      name: "General Public User",
      role: "Built by immigration lawyers",
      avatar: img5,
      badge: img11,
    },   {
      id: 1,
      text: "“As a junior lawyer, this platform helped me master the Global Talent Visa route.”",
      name: "General Public User",
      role: "Built by immigration lawyers",
      avatar: img7, // replace with your image
      badge: img11, // replace with your image
    },
    {
      id: 2,
      text: "“As a junior lawyer, this platform helped me master the Global Talent Visa route.”",
      name: "General Public User",
      role: "Built by immigration lawyers",
      avatar: img6,
      badge: img11,
    },
    {
      id: 3,
      text: "“As a junior lawyer, this platform helped me master the Global Talent Visa route.”",
      name: "General Public User",
      role: "Built by immigration lawyers",
      avatar: img5,
      badge: img11,
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

  useEffect(() => {
    setIsClient(true); // Ensures component only renders on client
  }, []);

  const benefits = [
    {
      title: 'Legal Representation Guidance',
      description: 'When and how to use a lawyer or an OISC adviser.',
      image: img1,
    },
    {
      title: 'Referral Network',
      description: 'Trusted partners for complex or specialist needs.',
      image: img2,
    },
    {
      title: 'Multiple Tools',
      description: 'Track learning progress, feedback and reports.',
      image: img3,
    },  {
      title: 'Legal Representation Guidance',
      description: 'When and how to use a lawyer or an OISC adviser.',
      image: img4,
    },
    {
      title: 'Referral Network',
      description: 'Trusted partners for complex or specialist needs.',
      image: img1,
    },
    {
      title: 'Multiple Tools',
      description: 'Track learning progress, feedback and reports.',
      image: img2,
    },
  ];

  return (
    <>
      <section className="py-12 px-4 md:py-20 sm:px-8 lg:px-16 text-center bg-white">
  <h2  className="font-marko text-2xl  sm:text-5xl font-[400] mb-2">
    Why Choose Immigration Navigator
  </h2>
  <p  className="font-marko text-black text-lg sm:text-3xl mt-4 mb-14">Platform Benefits</p>

{isClient && (
  <Swiper
    modules={[Pagination]}
    spaceBetween={20}
    slidesPerView={1}
    pagination={{ clickable: true }}
    breakpoints={{
      640: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    }}
    className="px-2 sm:px-6 "
  >
    {benefits.map((benefit, index) => (
      <SwiperSlide key={index}>
        <div className="group transition-transform h-[270px] duration-300 ease-in-out transform hover:-translate-y-2 rounded-2xl shadow-md overflow-hidden hover:shadow-xl border border-gray-200">
          
          {/* Image Container */}
          <div className="relative w-full h-48 sm:h-72">
            <Image
              src={benefit.image}
              alt={benefit.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            
            {/* Text at Bottom Left */}
            <div className="absolute py-5 text-left bottom-4 left-4 right-4">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-1">
                {benefit.title}
              </h3>
              <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                {benefit.description}
              </p>
            </div>
          </div>

        </div>
      </SwiperSlide>
    ))}
  </Swiper>
)}



  <button className="mt-0 md:mt-12 bg-[#76a088] text-white text-sm sm:text-base px-5 sm:px-6 py-3 sm:py-3 rounded-full hover:bg-[#94c2a8] transition-all">
    Request a Demo
  </button>
</section>

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
    className="h-[380px]" // 👈 Swiper container ki height

>
  {/* slides */}

        {testimonials.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="bg-white shadow-md h-[250px]  rounded-xl p-6 relative">
            <div className="flex -mt-1 justify-between items-start">
                <span className="w-12 h-12 md-mt-12 rounded-b-md">
               <Image
                  src={img12}
                  alt="Badge"
                  width={30}
                  height={80}
                  className="object-contain"
                />                </span>
              {/* Top Bookmark Icon + Badge */}
                <Image
                  src={item.badge}
                  alt="Badge"
                  width={30}
                  height={30}
                  className="object-contain"
                />
              </div>

              {/* Text */}
              <p className="text-gray-700 text-[15px] mt-4 italic">{item.text}</p>

              {/* User */}
              <div className="flex items-center gap-3 mt-12">
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
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
   
 </>
  );
};

export default PlatformBenefits;
