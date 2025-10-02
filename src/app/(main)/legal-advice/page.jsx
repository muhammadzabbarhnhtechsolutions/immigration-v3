"use client";

import { useState } from "react";
import { FaPlayCircle } from "react-icons/fa";

export default function LegalAdvicePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    enquiry: "",
    session: "30min",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    // 🔹 Yahan API call hogi for appointment + payment
    alert("Appointment booked! (Payment Integration Here)");
  };

  const [isPlaying, setIsPlaying] = useState(false);
  
    const handlePlay = () => setIsPlaying(true);
  
    // Animation variants
    const textVariant = {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0, transition: { duration: 1 } },
    };
  
    const buttonVariant = {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1, transition: { delay: 0.5, duration: 0.5 } },
    };
  
    const imageVariant = {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
    };
  
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-22 items-center">
        {/* Left */}
        <div className="ml-4">
          <h1 style={{lineHeight:"54px"}} className="text-3xl md:text-4xl font-bold text-[#88B29A] mb-6">
            Legal Advice & Confidential Consultation
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Book a confidential consultation with a UK-qualified solicitor for
            clear, expert immigration advice tailored to your circumstances.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Choose a <span className="font-semibold">30-minute session (£150 + VAT)</span>
            or a <span className="font-semibold">60-minute session (£300 + VAT)</span>
            to get answers you can trust and practical guidance on your next steps.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            With in-depth knowledge of UK immigration law and a focus on your
            individual needs, we provide professional support to help you move
            forward with confidence.
          </p>
        </div>

        {/* Right - Video */}
        <div className="relative w-full max-w-lg mx-auto ">
          {isPlaying ? (
            <div className="relative w-full h-[220px] sm:h-[280px] md:h-[330px] rounded-xl overflow-hidden shadow-lg">
              <iframe
                className="w-full h-full rounded-xl shadow-lg"
                src="https://www.youtube.com/embed/9C2fSBHryiQ?autoplay=1&controls=1"
                title="YouTube video player"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div className="relative group">
              <img
                src="https://immigrationnavigator.co.uk/wp-content/uploads/2023/06/creative-copywriters-working-on-articles.jpg"
                alt="People discussing immigration law"
                className="w-full rounded-xl shadow-lg transition-transform duration-500 group-hover:scale-105"
              />
              <button
                onClick={handlePlay}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full text-white"
              >
                <FaPlayCircle className="text-5xl sm:text-6xl drop-shadow-xl" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Appointment Booking Section */}
      <section className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Book Your Appointment
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#88B29A] focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#88B29A] focus:outline-none"
              />
            </div>

            {/* Number */}
            <div>
              <label htmlFor="number" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                id="number"
                name="number"
                type="tel"
                placeholder="+92 300 1234567"
                value={formData.number}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#88B29A] focus:outline-none"
              />
            </div>

            {/* Nature of Enquiry */}
            <div>
              <label htmlFor="enquiry" className="block text-sm font-medium text-gray-700 mb-1">
                Nature of Enquiry
              </label>
              <textarea
                id="enquiry"
                name="enquiry"
                placeholder="Briefly describe your case or enquiry..."
                value={formData.enquiry}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#88B29A] focus:outline-none"
              />
            </div>

            {/* Session Selection */}
            <div>
              <span className="block text-sm font-medium text-gray-700 mb-2">
                Select Session Type
              </span>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="session"
                    value="30min"
                    checked={formData.session === "30min"}
                    onChange={handleChange}
                    className="h-4 w-4 text-[#88B29A] focus:ring-[#88B29A]"
                  />
                  <span>30-Min Session (£150 + VAT)</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="session"
                    value="60min"
                    checked={formData.session === "60min"}
                    onChange={handleChange}
                    className="h-4 w-4 text-[#88B29A] focus:ring-[#88B29A]"
                  />
                  <span>60-Min Session (£300 + VAT)</span>
                </label>
              </div>
            </div>

            {/* Submit / Payment Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-[#88B29A] hover:bg-[#6f967f] text-white font-medium py-3 rounded-lg transition-colors"
              >
                Proceed to Payment
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
