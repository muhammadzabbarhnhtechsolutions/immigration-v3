import React from "react";
import Image from "next/image";
import img1 from "../../assets/pic4.png";
import img2 from "../../assets/pic5.png";
import img3 from "../../assets/pic6.png";
import logo from "../../assets/logo2.0.png";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const ExploreSections = () => {
  return (
    <div className="w-full mt-12 mb-20">
      {/* EXPLORE MORE SECTION */}
      

      {/* GET IN TOUCH */}
             <h2 style={{ fontFamily: 'Marcellus, serif' }} className="text-center py-16  text-2xl sm:text-4xl font-[400] mb-0">
       Get Free Immigration Tips & Templates Weekly
        </h2> 
      <section className="py-12 flex items-center justify-center bg-[#88B29A4D] px-4 sm:px-6">
        <div className="max-w-6xl flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-2xl font-[400] mb-4">Get In Touch</h3>
            <form className="space-y-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="border border-gray-300 p-2 rounded w-full focus:outline-[#88B29A]"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="border border-gray-300 p-2 rounded w-full focus:outline-[#88B29A]"
                />
              </div>
             
              <input
                placeholder="Write email..."
               type="email"
                className="border border-gray-300 p-2 rounded w-full focus:outline-[#88B29A]"
              />
              <button
                type="submit"
                className="bg-[#88B29A] hover:bg-[#89b89d] text-white px-6 py-3 rounded-full shadow transition-all"
              >
                Submit
              </button>
            </form>
          </div>

       
        </div>
      </section>

      {/* FOOTER */}
    
    </div>
  );
};

export default ExploreSections;
