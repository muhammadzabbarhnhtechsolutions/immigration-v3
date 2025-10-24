"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { MapPin, QuoteIcon } from "lucide-react"
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa"

export default function TestimonialsSection() {
    const testimonials = [
        {
          id: 1,
          text: "I was a bit skeptical about taking an online course, but this service exceeded my expectations. The course materials were engaging and interactive, and the feedback from the instructors was timely and constructive. I would definitely recommend this service to anyone looking to enhance their knowledge and skills.",
          name: "Anglina",
          role: "Student",
          avatar: "https://immigrationnavigator.co.uk/wp-content/uploads/2023/06/img__0002_Layer-6.jpg?height=60&width=60",
        },
        {
          id: 2,
          text: "I was a bit skeptical about taking an online course, but this service exceeded my expectations. The course materials were engaging and interactive, and the feedback from the instructors was timely and constructive. I would definitely recommend this service to anyone looking to enhance their knowledge and skills.",
          name: "Anglina",
          role: "Student",
          avatar: "https://immigrationnavigator.co.uk/wp-content/uploads/2023/06/img__0002_Layer-6.jpg?height=60&width=60",
        },
        {
          id: 3,
          text: "I was a bit skeptical about taking an online course, but this service exceeded my expectations. The course materials were engaging and interactive, and the feedback from the instructors was timely and constructive. I would definitely recommend this service to anyone looking to enhance their knowledge and skills.",
          name: "Anglina",
          role: "Student",
          avatar: "https://immigrationnavigator.co.uk/wp-content/uploads/2023/06/img__0002_Layer-6.jpg?height=60&width=60",
        },
        {
          id: 4,
          text: "I was a bit skeptical about taking an online course, but this service exceeded my expectations. The course materials were engaging and interactive, and the feedback from the instructors was timely and constructive. I would definitely recommend this service to anyone looking to enhance their knowledge and skills.",
          name: "Anglina",
          role: "Student",
          avatar: "https://immigrationnavigator.co.uk/wp-content/uploads/2023/06/img__0002_Layer-6.jpg?height=60&width=60",
        },
        {
          id: 5,
          text: "I was a bit skeptical about taking an online course, but this service exceeded my expectations. The course materials were engaging and interactive, and the feedback from the instructors was timely and constructive. I would definitely recommend this service to anyone looking to enhance their knowledge and skills.",
          name: "Anglina",
          role: "Student",
          avatar: "https://immigrationnavigator.co.uk/wp-content/uploads/2023/06/img__0002_Layer-6.jpg?height=60&width=60",
        },
      ]

  const prevRef = useRef(null)
  const nextRef = useRef(null)
  const [swiperReady, setSwiperReady] = useState(false)

  useEffect(() => {
    setSwiperReady(true)
  }, [])

  return (
   <section className="py-12 sm:py-14 md:py-16 bg-[#cbdad1] relative overflow-hidden">
  {/* Left quote icon */}
  <div className="absolute left-4 sm:left-6 md:left-10 top-10 sm:top-16 md:top-20">
    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-white/70 rounded-full flex items-center justify-center text-emerald-600">
      {/* <FaQuoteLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" /> */}
       <MapPin className="w-5 h-5 text-rose-600" />
    </div>
  </div>

  <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-10 md:mb-12 text-gray-900">
      Testimonials
    </h2>

    <div className="relative">
      {/* Prev button */}
      <button
        ref={prevRef}
        className="absolute left-0 -translate-x-1/2 sm:-translate-x-0 top-1/2 -translate-y-1/2 z-10 bg-white/60 rounded-full p-2 shadow-md hover:bg-white/80 transition"
        aria-label="Previous testimonial"
      >
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 15l-5-5 5-5" />
        </svg>
      </button>

      {swiperReady && (
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          pagination={{
            clickable: true,
            el: ".swiper-pagination",
            bulletClass:
              "inline-block w-2 h-2 rounded-full bg-emerald-500 mx-1",
            bulletActiveClass: "bg-white",
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          className="testimonials-swiper"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="bg-white rounded-lg p-6 sm:p-7 md:p-8 shadow-sm h-full">
                <p className="text-gray-700 mb-6 italic text-center">
                  &quot;{t.text}&quot;
                </p>
                <div className="flex items-center justify-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden mr-3 sm:mr-4">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      width={60}
                      height={60}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{t.name}</h4>
                    <p className="text-gray-600 text-sm">{t.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* pagination bullets */}
      <div className="swiper-pagination mt-6 flex justify-center" />

      {/* Next button */}
      <button
        ref={nextRef}
        className="absolute right-0 translate-x-1/2 sm:translate-x-0 top-1/2 -translate-y-1/2 z-10 bg-white/60 rounded-full p-2 shadow-md hover:bg-white/80 transition"
        aria-label="Next testimonial"
      >
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M8 5l5 5-5 5" />
        </svg>
      </button>
    </div>
  </div>

  {/* Right quote icon */}
  <div className="absolute right-4 sm:right-6 md:right-10 bottom-10 sm:bottom-12 md:bottom-10">
    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-white/70 rounded-full flex items-center justify-center text-emerald-600">
      <FaQuoteRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
    </div>
  </div>
</section>

  )
}
