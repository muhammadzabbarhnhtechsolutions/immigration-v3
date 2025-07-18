import React from "react";
import Image from "next/image";
// import mapPlaceholder from "../../assets/map-london.png"; // Add your map image here
import img1 from "../../assets/pic4.png"
import img2 from "../../assets/pic5.png"
import img3 from "../../assets/pic6.png"
const ExploreSections = () => {
  return (
    <div className="w-full">

      {/* EXPLORE MORE SECTION */}
      <section className="py-12 bg-white">
        <p className="text-center text-3xl font-normal mb-16">
          Explore More from Immigration Navigator
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 px-4 md:px-0">
          {/* Card 1 */}
          <div className="bg-gray-50 h-72 rounded-lg shadow hover:shadow-lg overflow-hidden w-80">
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
          <div className="bg-gray-50 h-72 rounded-lg shadow hover:shadow-lg overflow-hidden w-80">
            <Image
              src={img2}
              alt="Community Forum"
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-center">
              <p className="font-normal text-lg">Join Our Community Forum</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-gray-50 h-72 rounded-lg shadow hover:shadow-lg overflow-hidden w-80">
            <Image
              src={img3}
              alt="Immigration Tips"
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-center">
              <p className="font-normal text-lg">Latest Blog Post With Immigration Tips</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button className="bg-[#3D61AB] text-white px-6 py-3 rounded-full shadow">
            Book a Demo
          </button>
        </div>
      </section>

      {/* GET IN TOUCH */}
      <section className="py-12 bg-gray-50 px-4 md:px-10">
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
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
                rows="4"
                className="border border-gray-300 p-2 rounded w-full focus:outline-blue-500"
              ></textarea>
              <button
                type="submit"
                className="bg-[#3D61AB] text-white px-6 py-3 rounded-full shadow"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Map */}
          <div className="rounded-lg overflow-hidden shadow">
           {/* <Image */}
              {/* src={mapPlaceholder} */}
              {/* alt="Map Location"
              className="w-full h-full object-cover"
            />  */}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t py-10 text-gray-700">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-4 gap-6 text-sm">
          {/* Logo Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Immigration Navigator</h3>
            <p className="text-gray-600 text-sm">
              Trusted Visa Experts guiding your path to success.
            </p>
            <div className="flex gap-3 mt-3">
              <div className="w-8 h-8 rounded-full bg-gray-200"></div>
              <div className="w-8 h-8 rounded-full bg-gray-200"></div>
              <div className="w-8 h-8 rounded-full bg-gray-200"></div>
            </div>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="font-semibold mb-2">Contact Us</h3>
            <p>Address: 123 London Road, UK</p>
            <p>Email: support@immigrationnavigator.co.uk</p>
            <p>Phone: +44 123 456 789</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-2">Quick Links</h3>
            <p>Home</p>
            <p>Courses</p>
            <p>About</p>
            <p>Contact</p>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-2">Subscribe</h3>
            <input
              type="email"
              placeholder="Your Email"
              className="border p-2 rounded w-full mb-2"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full">
              Subscribe
            </button>
          </div>
        </div>

        <div className="text-center mt-6 text-gray-500 text-xs">
          © Copyright 2025. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default ExploreSections;
