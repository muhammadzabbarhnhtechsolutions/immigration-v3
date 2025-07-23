'use client';

import React from 'react';

export default function ContactSection() {
  return (
    <section className="relative bg-[#8bac9d] py-16 md:py-24  px-4 sm:px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2  gap-12 items-start">
        {/* Left: Map + Address */}
        <div>
          <h2 className="text-white text-2xl md:text-3xl font-semibold mb-4">
            GET IN TOUCH TODAY
          </h2>
          <h4 className="text-white font-medium mb-4">Our Address</h4>
          <div className="w-full h-[300px] mb-12 sm:h-[350px]">
            <iframe
              className="w-full h-full rounded-md border-none"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19809.492585193684!2d-0.13420662003894928!3d51.50732166618945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b333c03e7ab%3A0x3dfb8c60ea4f1e3d!2sLondon%20Eye!5e0!3m2!1sen!2suk!4v1680000000000!5m2!1sen!2suk"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="bg-white p-6  sm:p-8 rounded-sm shadow-lg w-full max-w-xl mx-auto">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">
            <span className="border-b-3 pb-2 border-[#3D61AB]">Reque</span>st A{' '}
            <span className="text-[#3D61AB]">Demo</span>
          </h3>

          <form className="space-y-4 mb-6">
            <div>
              <label className="text-sm font-medium text-gray-600 block mb-1">Name</label>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2 bg-gray-100 rounded-md outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 block mb-1">Phone</label>
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-4 py-2 bg-gray-100 rounded-md outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 block mb-1">Email Address</label>
              <input
                type="email"
                placeholder="name@gmail.com"
                className="w-full px-4 py-2 bg-gray-100 rounded-md outline-none"
              />
            </div>
            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="bg-[#3D61AB] cursor-pointer text-white px-6 py-2 rounded-md mt-2 hover:bg-[#769b8e] transition-colors"
              >
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-24"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <path
            d="M0,0 C300,100 900,0 1200,100 L1200,120 L0,120 Z"
            fill="#fff"
          />
        </svg>
      </div>
    </section>
  );
}
