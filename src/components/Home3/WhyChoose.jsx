'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import img1 from "../../assets/img00022.jpg"
import img2 from "../../assets/img00033.jpg"
import img3 from "../../assets/img00044.png"
import img4 from "../../assets/img00055.png"
import Image from 'next/image';

const PlatformBenefits = () => {
  const [isClient, setIsClient] = useState(false);

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
  <section className="py-12 px-4 md:py-20 sm:px-8 lg:px-16 text-center bg-white">
  <h2 style={{ fontFamily: 'Marcellus, serif' }} className="text-2xl  sm:text-5xl font-[400] mb-2">
    Why Choose Immigration Navigator
  </h2>
  <p style={{ fontFamily: 'Marcellus, serif' }} className="text-black text-lg sm:text-3xl mt-4 mb-14">Platform Benefits</p>

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
    className="px-2 sm:px-6"
  >
    {benefits.map((benefit, index) => (
      <SwiperSlide key={index}>
        <div className="group transition-transform duration-300 ease-in-out transform hover:-translate-y-2 rounded-2xl shadow-md overflow-hidden hover:shadow-xl border border-gray-200">
          
          {/* Image Container */}
          <div className="relative w-full h-48 sm:h-56">
            <Image
              src={benefit.image}
              alt={benefit.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            
            {/* Text at Bottom Left */}
            <div className="absolute text-left bottom-4 left-4 right-4">
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

  );
};

export default PlatformBenefits;
