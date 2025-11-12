
import Image from "next/image";
import logo from "../../assets/logo2.0.png";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
const Footer2 = () => {
  return (
    <>
    
    <div className="bg-[#99b9a7]  mb-12 text-white py-8 px-4 sm:px-8 lg:px-12 text-center">
    <h3 className="text-lg sm:text-xl font-semibold mb-4">
      Enhance Your UK Immigration Knowledge Today
    </h3>
    <p className="text-sm sm:text-base mb-6">
      We specialise in delivering tailored Courses, Materials, Resources and Legal Advice through our platform
    </p>
    <button className="bg-white text-[#88B29A] px-6 py-3 font-semibold rounded-full shadow-md hover:bg-gray-100 transition-all animate-pulse">
      Free Demo
    </button>
  </div>

  <footer className="bg-[#88B29A] mt-2 py-10 px-6 sm:px-12 md:px-24 text-white">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:gap-8 gap-10 text-base">
    {/* Logo Section */}
    <div className="md:w-[324px]">
      <Image
        src={logo}
        alt="Logo"
        className="w-20 h-20 md:w-24 md:h-24 object-cover"
      />
      <p className="text-white mt-4 leading-relaxed text-sm sm:text-base">
        Your Global Journey Starts Here <br />
        Trusted Visa Experts
      </p>
      <p className="text-white font-bold mt-4 leading-relaxed text-sm sm:text-base">
        Follow Us
      </p>
      <div className="flex gap-3 mt-4">
        <a className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-[#88B29A] hover:bg-[#88B29A]/80 hover:text-white transition-all">
          <FaFacebookF />
        </a>
        <a className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-[#88B29A] hover:bg-[#88B29A]/80 hover:text-white transition-all">
          <FaTwitter />
        </a>
        <a className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-[#88B29A] hover:bg-[#88B29A]/80 hover:text-white transition-all">
          <FaInstagram />
        </a>
      </div>
    </div>

    {/* Contact Us */}
<div
  id="contact"
  className="space-y-4 leading-relaxed md:w-[300px]"
>
  <h3 className="text-lg font-semibold">Contact Us</h3>
  <p className="text-white text-sm sm:text-base">
    <span className="font-semibold">Address:</span> <br />
    Level 17 Dashwood House, 69 Old Broad Street London EC2M1QS
  </p>
  <p className="text-white text-sm sm:text-base">
    <span className="font-semibold">Tel:</span> 07578979789
  </p>
  <p className="text-white text-sm sm:text-base">
    <span className="font-semibold">Email:</span> info@healthcarenavigator.co.uk
  </p>
</div>

    {/* Quick Links */}
    <div>
      <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
      <ul className="space-y-2 text-white text-sm sm:text-base">
        <li className="hover:text-white cursor-pointer transition">Home</li>
        <li className="hover:text-white cursor-pointer transition">Courses</li>
        <li className="hover:text-white cursor-pointer transition">About</li>
        <li className="hover:text-white cursor-pointer transition">Contact</li>
        <li className="hover:text-white cursor-pointer transition">Resources</li>
        <li className="hover:text-white cursor-pointer transition">Forums</li>
      </ul>
    </div>
  </div>

  {/* Banner */}
  {/* <div className="bg-[#88B29A] text-white py-8 px-4 sm:px-8 lg:px-12 text-center">
    <h3 className="text-lg sm:text-xl font-semibold mb-4">
      Enhance Your UK Immigration Knowledge Today
    </h3>
    <p className="text-sm sm:text-base mb-6">
      We specialise in delivering tailored Courses, Materials, Resources and Legal Advice through our platform
    </p>
    <button className="bg-white text-[#88B29A] px-6 py-3 font-semibold rounded-full shadow-md hover:bg-gray-100 transition-all animate-pulse">
      Free Demo
    </button>
  </div> */}

  <div className="text-center mt-10 text-white text-xs sm:text-sm border-t border-gray-300 pt-4">
    © 2025 Immigration Navigator. All Rights Reserved.
  </div>
</footer>
</>
  )
}

export default Footer2
