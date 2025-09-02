import React from "react";
import Image from "next/image";
import img1 from "../../assets/pic4.png";
import img2 from "../../assets/pic5.png";
import img3 from "../../assets/pic6.png";
import logo from "../../assets/logo2.0.png";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
// ...
const ExploreSections = () => {
  return (
    <div className="w-full mt-2 mb-20">
      {/* Title */}
      <h2 className="text-center flex justify-center mx-auto items-center max-w-3xl font-marko py-12 text-2xl sm:text-5xl font-[400]">
        Get Free Immigration Tips & Templates Weekly
      </h2>

      {/* Section */}
      <section className=" bg-[#88B29A4D] flex justify-center">
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-6  rounded-lg  overflow-hidden">
          {/* Left - Map */}
          <div className="w-full h-[350px] md:h-[430px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.3110274881847!2d67.12743827934567!3d24.921472199999993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb338faac8fd535%3A0x42e10fe1ea00ac97!2sB-293%20Long%20St%2C%20Block%2014%20Gulistan-e-Johar%2C%20Karachi%2C%20Pakistan!5e0!3m2!1sen!2s!4v1756560971730!5m2!1sen!2s"
              className="w-full h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Right - Form */}
          <div className="p-8 flex flex-col justify-center">
            <h3 className="text-2xl font-[400] mb-6">Get In Touch</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="border border-gray-300 p-3 rounded w-full focus:outline-[#88B29A]"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="border border-gray-300 p-3 rounded w-full focus:outline-[#88B29A]"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="border border-gray-300 p-3 rounded w-full focus:outline-[#88B29A]"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="border border-gray-300 p-3 rounded w-full focus:outline-[#88B29A]"
                />
              </div>
              <button
                type="submit"
                className="bg-[#88B29A] hover:bg-[#6e9d81] text-white px-8 py-3 rounded-full shadow transition-all"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExploreSections;
