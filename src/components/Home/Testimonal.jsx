"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { QuoteIcon } from "lucide-react"
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
    <section className="py-16  bg-[#cbdad1] relative">
      <div className="absolute left-10 top-26 md:top-20">
        <div className="w-16 h-16 bg-white bg-opacity-70  rounded-full flex items-center justify-center text-emerald-600">
          <FaQuoteLeft className="w-6 h-6" />
        </div>
      </div>

      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">Testimonials</h2>

        <div className="relative mx-12">
          {/* Prev button */}
          <button
            ref={prevRef}
            className="absolute cursor-pointer left-0 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-50 rounded-full p-2 shadow-md hover:bg-opacity-70 transition-all"
            aria-label="Previous testimonial"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6"></path>
            </svg>
          </button>

          {swiperReady && (
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              pagination={{
                clickable: true,
                el: ".swiper-pagination",
                bulletClass: "inline-block w-2 h-2 rounded-full bg-emerald-500 mx-1",
                bulletActiveClass: "bg-white",
              }}
              onBeforeInit={(swiper) => {
                // This ensures refs are assigned before Swiper is initialized
                swiper.params.navigation.prevEl = prevRef.current
                swiper.params.navigation.nextEl = nextRef.current
              }}
              className="testimonials-swiper"
            >
              {testimonials.map((t) => (
                <SwiperSlide key={t.id}>
                  <div className="bg-white rounded-lg p-8 cursor-grab shadow-sm h-full">
                    <p className="text-gray-700 mb-6 italic text-center">"{t.text}"</p>
                    <div className="flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
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
                        <p className="text-gray-600">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
<div className="mt-8 flex justify-center item-center">


          <div className="swiper-pagination absolute flex justify-center text-center items-center mt-12"></div>
</div>
          {/* Next button */}
          <button
            ref={nextRef}
            className="absolute cursor-pointer right-0 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-50 rounded-full p-2 shadow-md hover:bg-opacity-70 transition-all"
            aria-label="Next testimonial"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Right quote icon */}
      <div className="absolute right-0 bottom-10">
        <div className="w-16 h-16 bg-white bg-opacity-70 rounded-full flex items-center justify-center text-emerald-600">
        <div className="w-16 h-16 bg-white bg-opacity-70  rounded-full flex items-center justify-center text-emerald-600">
          <FaQuoteRight className="w-6 h-6" />
        </div>
        </div>
      </div>
    </section>
  )
}
