"use client";
import { useState } from "react";
import Image from "next/image";
import { FaRightLong } from "react-icons/fa6";
import { ArrowRight } from "lucide-react";

export default function Page() {
  const [activeTab, setActiveTab] = useState("video");

  const imageMap = {
    video:
      "https://immigrationnavigator.co.uk/wp-content/uploads/2023/07/Video-Home.png",
    written:
      "https://immigrationnavigator.co.uk/wp-content/uploads/2023/07/Written-2.png", // replace with actual image
    templates:
      "https://immigrationnavigator.co.uk/wp-content/uploads/2023/07/Templates.png", // replace with actual image
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Platform Preview Section */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              The complete <span className="text-[#84a98c]">platform</span>
            </h2>
            <p className="text-gray-800 text-[14px] max-w-2xl mx-auto">
              We understand that it can sometimes be difficult to grasp the
              different aspects of immigration law. We use our years of
              expertise as solicitors and barristers to prepare you for
              challenges that come your way.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 mx-18 items-start">
            {/* Tabs */}
            <div className="space-y-8 ">
              <div
                onClick={() => setActiveTab("video")}
                className={`cursor-pointer p-6 rounded-lg ${
                  activeTab === "video"
                    ? "bg-[#8cb09c1c] border border-[#88b29a] shadow-4xl"
                    : "bg-white"
                }`}
                style={{
                  boxShadow:
                    activeTab === "video"
                      ? "rgba(0, 0, 0, 0.1) 0px 26px 15px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px"
                      : undefined, // remove box shadow for inactive tab
                }}
              >
                <h3 className="text-xl font-semibold mb-2">Video Resources</h3>
                <p className="text-gray-600">
                  Become a member to access our extensive library of resources
                  pertaining to Immigration Law.
                </p>
              </div>
              <div
                onClick={() => setActiveTab("written")}
                className={`cursor-pointer p-6 rounded-lg shadow-sm ${
                  activeTab === "written" ? "bg-[#8cb09c1c] border border-[#88b29a]" : "bg-white"
                }`}
                style={{
                  boxShadow:
                    activeTab === "written"
                      ? "rgba(0, 0, 0, 0.1) 0px 26px 15px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px"
                      : undefined, // No box shadow for inactive tab
                }}
              >
                <h3 className="text-xl font-semibold mb-2">
                  Written Resources
                </h3>
                <p className="text-gray-600">
                  Login to read succinct and concise summaries to gain the
                  knowledge you need to unlock your potential.
                </p>
              </div>
              <div
                onClick={() => setActiveTab("templates")}
                className={`cursor-pointer p-8 rounded-lg shadow-sm ${
                  activeTab === "templates" ? "bg-[#8cb09c1c] border border-[#88b29a]" : "bg-white"
                }`}
                style={{
                  boxShadow:
                    activeTab === "templates"
                      ? "rgba(0, 0, 0, 0.1) 0px 26px 15px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px"
                      : undefined, // No box shadow for inactive tab
                }}
              >
                <h3 className="text-xl font-semibold mb-2">
                  Application Templates
                </h3>
                <p className="text-gray-600">
                  Proven and substantiated templates for you to use as and when
                  required.
                </p>
              </div>
              <button className="bg-[#84a98c] flex gap-2 item-center cursor-pointer text-white px-6 py-2 rounded hover:bg-[#76998a] transition-colors">
                Learn More <ArrowRight />
              </button>
            </div>

            {/* Dynamic Image */}
            <div className="p-2 rounded-lg">
              <Image
                src={imageMap[activeTab]}
                width={560}
                height={560}
                alt="Platform interface preview"
                className="w-full rounded-lg transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
