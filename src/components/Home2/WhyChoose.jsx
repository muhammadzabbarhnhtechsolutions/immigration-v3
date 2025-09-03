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
  <h2 className="text-2xl sm:text-4xl font-semibold mb-2">
    Why Choose Immigration Navigator
  </h2>
  <p className="text-black text-lg sm:text-xl mt-4 mb-14">Platform Benefits</p>

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
          <div className="group transition-transform duration-300 ease-in-out transform hover:-translate-y-2 bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl border border-gray-200">
            <div className="w-full h-40 sm:h-48 overflow-hidden">
              <Image
                src={benefit.image}
                alt={benefit.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4 sm:p-5 text-left">
              <h3 className="text-lg sm:text-xl font-semibold text-[#88B29A] mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                {benefit.description}
              </p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )}

  <button className="mt-0 md:mt-12 bg-[#88B29A] text-white text-sm sm:text-base px-5 sm:px-6 py-3 sm:py-3 rounded-full hover:bg-blue-700 transition-all">
    Request a Demo
  </button>
</section>

  );
};

export default PlatformBenefits;
