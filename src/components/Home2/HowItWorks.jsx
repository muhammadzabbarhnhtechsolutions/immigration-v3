import Image from "next/image";
import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

// Import local images
import img1 from "../../assets/user.png";
import img2 from "../../assets/video.png";
import img3 from "../../assets/apply.png";
import img4 from "../../assets/pic1.png";
import img5 from "../../assets/pic2.png";
import img6 from "../../assets/pic3.png";
import bg from "../../assets/bg33.png"
const HomeSections = () => {
  return (
    <div
  className="w-full bg-cover bg-center"
  style={{ backgroundImage: `url(${bg})` }}
>
      {/* HOW IT WORKS */}
      <section className="py-20 ">
        <h2 className="text-center md:text-3xl font-normal mb-8">HOW IT WORKS</h2>
        <div className="flex flex-col md:flex-row mt-12 justify-center items-center gap-6 px-4 md:px-0">
          {/* Step 1 */}
          <div className="flex flex-col items-center leading-relaxed text-center max-w-[280px]">
            <Image src={img1} alt="Create Account"width={78} height={60} className="mb-2" />
            <h3 className="font-semibold">Create Your Free Account</h3>
            <p className="text-sm text-gray-600 mt-1">
              Discover courses and prepare for success.
            </p>
          </div>

          <div className="hidden md:block w-12 h-[2px] bg-gray-300"></div>

          {/* Step 2 */}
          <div className="flex flex-col items-center leading-relaxed text-center max-w-[280px]">
            <Image src={img2} alt="Start Learning" width={78} height={60} className="mb-2" />
            <h3 className="font-semibold">Start Learning Instantly</h3>
            <p className="text-sm text-gray-600 mt-1">
              Watch tutorials, explore resources, and boost your knowledge.
            </p>
          </div>

          <div className="hidden md:block w-12 h-[2px] bg-gray-300"></div>

          {/* Step 3 */}
          <div className="flex flex-col items-center leading-relaxed text-center max-w-[280px]">
            <Image src={img3} alt="Apply with Confidence" width={78} height={60} className="mb-2" />
            <h3 className="font-semibold">Apply With Confidence</h3>
            <p className="text-sm text-gray-600 mt-1">
              Submit your applications with success strategies.
            </p>
          </div>
        </div>

        <div className="flex justify-center mt-20">
          <button className="bg-[#3D61AB] hover:bg-[#3D61AB] text-white px-6 py-2.5 font-semibold rounded-full shadow">
            Request a Demo
          </button>
        </div>
      </section>

      {/* FEATURED COURSES */}
      <section className="py-12 bg-white">
        <h2 className="text-center md:text-3xl font-normal mb-14">Featured Courses</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 px-4 md:px-0">
          {/* Course Card */}
          <div className="bg-gray-50 rounded-lg shadow hover:shadow-lg h-[346px]  pb-12 w-80 text-center">
            <Image
              src={img4}
              alt="UK Spouse Visa"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <div className="py-2 pb-4 px-5">
            <h3 className="font-semibold text-lg mb-2">UK Spouse Visa Step-by-Step Guide</h3>
            <p className="text-sm text-gray-600 mb-22">Explained process for your visa journey.</p>
          </div>
          </div> 

          {/* Course Card */}
          <div className="bg-gray-50 rounded-lg shadow hover:shadow-lg h-[346px] pb-12 w-80 text-center">
            <Image
              src={img5}
              alt="Global Talent Visa"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <div className="py-2 pb-4 px-5">
            <h3 className="font-semibold text-lg mb-2">Global Talent Visa Essentials</h3>
            <p className="text-sm text-gray-600 mb-22">Step-by-step guidance to secure your visa.</p>
            </div>
          </div>

          {/* Course Card */}
          <div className="bg-gray-50 rounded-lg shadow hover:shadow-lg h-[346px]  pb-12 w-80 text-center">
            <Image
              src={img6}
              alt="Student to Skilled Worker"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <div className="py-2 pb-4 px-5">
            <h3 className="font-semibold text-lg mb-2">Student to Skilled Worker Route</h3>
            <p className="text-sm text-gray-600 mb-22">Smooth transition for your career journey.</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-16">
          <button className="bg-[#3D61AB] hover:bg-[#3D61AB] text-white px-6 py-2.5 font-semibold rounded-full shadow">
            Browse All Courses
          </button>
        </div>
      </section>

      {/* WHAT OUR USERS SAY */}
      <section className="py-12 bg-gray-50">
        <h2 className="text-center text-2xl font-bold mb-8">What Our Users Say</h2>
        <div className="flex justify-center px-4">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-md relative">
            <FaQuoteLeft className="text-blue-500 text-3xl absolute -top-4 left-4" />
            <p className="text-gray-700 mb-4">
              "I was overwhelmed before I found this platform. The step-by-step guidance and courses helped me achieve my visa goals with confidence!"
            </p>
            <p className="font-semibold text-gray-900">General Public User</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeSections;
