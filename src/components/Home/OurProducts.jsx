"use client";

import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen mt-16 bg-[#e8f0eb] py-12 px-4 sm:px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-center text-3xl sm:text-4xl font-semibold mb-12">
          Our <span className="text-sage-600 ">Products</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-[#d8e5dd] border border-[#90b29f] p-6 rounded-lg text-center">
            <div className="flex justify-center mb-10">
              <div className="w-24 h-16 flex items-center justify-center">
                <Image
                  src="https://immigrationnavigator.co.uk/wp-content/uploads/2023/06/video-player-2.png"
                  alt="Aim for excellence"
                  width={108}
                  height={108}
                  className="object-contain"
                />
              </div>
            </div>
            <h3 className="text-xl text-[#333333] font-semibold mb-6">Video Resources</h3>
            <p className="text-sm md:text-[14px] text-[#212529]">
              Gain valuable guidance and insight from our extensive collection of expert-led video resources. Our library covers a wide range of immigration topics including visa applications, settlement, appeals, sponsorship and more.
            </p>
          </div>

          <div className="bg-[#d8e5dd] border border-[#90b29f] p-6 rounded-lg text-center">
            <div className="flex justify-center mb-10">
              <div className="w-20 h-16 flex items-center justify-center">
                <Image
                  src="https://immigrationnavigator.co.uk/wp-content/uploads/2023/06/blogging-4.png"
                  alt="Innovative strategies"
                  width={108}
                  height={108}
                  className="object-contain"
                />
              </div>
            </div>
            <h3 className="text-xl text-[#333333] font-semibold mb-6">Innovative strategies</h3>
            <p className="text-sm md:text-[14px] text-[#212529]">
              Enhance your understanding of UK Immigration Law with our comprehensive written resources. Stay up to date with the latest legislative changes, case precedents and practical tips to ensure you remain up to date.
            </p>
          </div>

          <div className="bg-[#d8e5dd] border border-[#90b29f] p-6 rounded-lg text-center">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-16 flex items-center justify-center">
                <Image
                  src="https://immigrationnavigator.co.uk/wp-content/uploads/2023/06/write-3.png"
                  alt="Trusted by many"
                  width={108}
                  height={108}
                  className="object-contain"
                />
              </div>
            </div>
            <h3 className="text-xl text-[#333333] font-semibold mb-3">Trusted by many</h3>
            <p className="text-sm md:text-base text-[#212529]">
              Simplify the application process with our meticulously crafted templates. These templates serve as valuable tools, saving you time and effort whilst ensuring that your applications meet the required standards.
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .text-sage-600 {
          color: #84a98c;
        }
        .bg-sage-400 {
          background-color: #84a98c;
        }
        .bg-sage-500 {
          background-color: #76998a;
        }
        .hover\:bg-sage-100:hover {
          background-color: #e8f1e9;
        }
        .text-sage-400 {
          color: #84a98c;
        }
        .bg-sage-100 {
          background-color: #e8f1e9;
        }
      `}</style>
    </div>
  );
}