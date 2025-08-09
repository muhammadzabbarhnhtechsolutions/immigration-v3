import React from "react";
import Image from "next/image";
import img1 from "../../assets/pic4.png";
import img2 from "../../assets/pic5.png";
import img3 from "../../assets/pic6.png";
import logo from "../../assets/logo2.0.png";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const ExploreSections = () => {
  return (
    <div className="w-full">
      {/* EXPLORE MORE SECTION */}
      <section className="py-14 bg-white">
        <p className="text-center text-2xl md:mt-4 sm:text-4xl font-[500] mb-10">
          Explore More from Immigration Navigator
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 px-4 md:py-10 md:px-0">
          {/* Card 1 */}
          <div className="bg-gray-50 rounded-lg shadow hover:shadow-lg overflow-hidden w-full max-w-xs">
            <Image
              src={img1}
              alt="Podcast"
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-center">
              <p className="font-normal text-lg">1-Minute Clips from Our Podcast</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-gray-50 rounded-lg shadow hover:shadow-lg overflow-hidden w-full max-w-xs">
            <Image
              src={img2}
              alt="Community Forum"
              className="w-full h-48 object-cover"
            />
            <div className="p-4 md:p-8 text-center">
              <p className="font-normal text-lg">Join Our Community Forum</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-gray-50 rounded-lg shadow hover:shadow-lg overflow-hidden w-full max-w-xs">
            <Image
              src={img3}
              alt="Immigration Tips"
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-center">
              <p className="font-normal text-lg">
                Latest Blog Post With Immigration Tips
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button className="bg-[#88B29A] text-white px-6 py-3 rounded-full shadow hover:bg-[#2B4570] transition">
            Book a Demo
          </button>
        </div>
      </section>

      {/* GET IN TOUCH */}
      <section className="py-12 bg-gray-50 px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {/* Form */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Get In Touch</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="border border-gray-300 p-2 rounded w-full focus:outline-blue-500"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="border border-gray-300 p-2 rounded w-full focus:outline-blue-500"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Phone"
                  className="border border-gray-300 p-2 rounded w-full focus:outline-blue-500"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="border border-gray-300 p-2 rounded w-full focus:outline-blue-500"
                />
              </div>
              <textarea
                placeholder="Write Message..."
                rows={4}
                className="border border-gray-300 p-2 rounded w-full focus:outline-blue-500"
              ></textarea>
              <button
                type="submit"
                className="bg-[#88B29A] hover:bg-[#2B4570] text-white px-6 py-3 rounded-full shadow transition-all"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Map */}
          <div className="rounded-lg overflow-hidden shadow h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14473.976763919587!2d67.03261105!3d24.91522925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33fbd469d9bcd%3A0x749325c6e39952f3!2sNazimabad%2C%20Karachi!5e0!3m2!1sen!2s!4v1752918559740!5m2!1sen!2s"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FOOTER */}
    
    </div>
  );
};

export default ExploreSections;
