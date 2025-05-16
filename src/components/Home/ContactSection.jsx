"use client"
import { useState } from "react"
import Image from "next/image"
// import bg3 from "../../assets/bg33.png"
export default function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Here you would typically send the data to your backend
    alert("Form submitted successfully!")
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      message: "",
    })
  }

  return (
    <section className="py-16 px-14 bg-[#E6EDE9] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0">
        <Image
          // src={bg3}
          alt="Background pattern"
          fill
          className="object-cover opacity-30"
          priority
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div  style={{ boxShadow: '0px 4px 0px 17px rgba(139, 172, 154, 0.12)' }}  className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-2 text-center">
              <span className="text-gray-900">Get In </span>
              <span className="text-[#88B29AAD]">Touch</span>
            </h2>
            <p className="text-center text-[#88B29AAD] uppercase text-sm font-semibold tracking-wider mb-6">Contact us.</p>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-300"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-300"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-300"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-300"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message"
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-300"
                  required
                ></textarea>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-[#88B29AAD] cursor-pointer text-white px-8 font-semibold py-3 rounded hover:bg-emerald-500 transition-colors duration-300 uppercase text-sm font-medium"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-center md:text-center">
              <span className="text-[#88B29AAD]">Find Us </span>
              <span className="text-[#88B29AAD]">At</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="bg-[#88B29AAD] bg-opacity-50 slide-in backdrop-blur-sm p-6 rounded-lg transition-transform transform duration-500 ease-in-out ">
        <h3 className="uppercase text-sm font-sans font-semibold text-white mb-4">Contact Us</h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-white mt-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <p className="text-white">Old Broad Street London</p>
          </div>
          <div className="flex items-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-white mt-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <p className="text-white">07578979789</p>
          </div>
          <div className="flex items-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-white mt-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <p className="text-white">info@immigration.com</p>
          </div>
        </div>
      </div>

      <div className="bg-[#88B29AAD] bg-opacity-50 slide-in backdrop-blur-sm p-6 rounded-lg transition-transform transform duration-500 ease-in-out ">
        <h3 className="uppercase text-sm font-semibold text-white mb-4">Our Working Hours</h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-white mt-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-white">Monday - Friday: 9:30 - 17:30</p>
          </div>
        </div>
      </div>
    </div>
          </div>
        </div>
      </div>
    </section>
  )
}
