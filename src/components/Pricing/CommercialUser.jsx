"use client";

import { useState } from "react";

// Icon Components
const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);
const CrossIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const basePlans = {
  Silver: { monthly: 150, annually: 1500 },
  Gold: { monthly: 200, annually: 2000 },
  Bronze: { monthly: 50, annually: 500 },
};

const sizeMultipliers = {
  Small: 0.75,
  Medium: 1,
  Large: 1.5,
};

const featuresData = {
  Silver: {
    "Up to 15 Users": true,
    "Video Resources": true,
    "Application Templates": false,
    "Written Resources": false,
  },
  Gold: {
    "Up to 15 Users": true,
    "Video Resources": true,
    "Application Templates": true,
    "Written Resources": true,
  },
  Bronze: {
    "Up to 15 Users": true,
    "Application Templates": true,
    "Written Resources": true,
    "Video Resources": false,
  },
};

export default function IndividualUsers() {
  const [billing, setBilling] = useState("monthly");
  const [size, setSize] = useState("Small");

  const plans = Object.keys(basePlans).map((planName) => {
    const base = basePlans[planName];
    const price = base[billing] * sizeMultipliers[size];
    return {
      name: planName,
      price,
      features: featuresData[planName],
      popular: planName === "Gold",
    };
  });

  return (
    <div className="min-h-screen bg-[#ebf0ed] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl md:text-[38px] mb-6 font-semibold text-gray-900">
            Commercial <span className="text-sage-600">Users</span>
          </h2>

          {/* Size Toggle */}
          <div className="mt-12 flex justify-center gap-4">
            {["Small", "Medium", "Large"].map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`px-5 py-3 font-medium text-gray-600 cursor-pointer text-base md:text-[18px] rounded-md ${
                  size === s ? "bg-sage-400 text-white" : "hover:bg-sage-100"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Billing Toggle */}
          <div className="mt-0  flex justify-center gap-4">
            {["monthly", "annually"].map((type) => (
              <button
                key={type}
                onClick={() => setBilling(type)}
                className={`px-5 py-3 mb-8 font-medium cursor-pointer text-base text-gray-700 md:text-[18px] rounded-md ${
                  billing === type ? "bg-sage-400 text-white" : "hover:bg-sage-100"
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Plans */}
        <div className="mt-12 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`bg-[#fbfcfc] rounded-md overflow-hidden relative h-full 
              shadow-sm ${plan.popular ? "shadow-3xl transform -translate-y-4 md:scale-110" : ""}`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0">
                <div className="bg-[#88B29A] text-white text-xs py-1 px-4 rotate-45 translate-x-[30%] translate-y-[40%] w-28 text-center">
                  Popular
                </div>
              </div>
            )}
              <div className={`${plan.popular ? "bg-white " : "bg-[#88B29A]"} p-6`}>
                <h3 className={`text-xl md:text-[24px] font-semibold items-center flex justify-center ${plan.popular ? "text-[#88B29A]" : "text-white"}`}>{plan.name}</h3>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-center">
                  <span className="text-2xl font-light text-[#88B29A]">£</span>
                  <span className="text-5xl font-bold text-[#88B29A]">{plan.price}</span>
                  <span className="ml-2 text-gray-500">/{billing.charAt(0).toUpperCase() + billing.slice(1)}</span>
                </div>
                <ul className="mt-0 space-y-4 px-4">
                  {Object.entries(plan.features).map(([feature, enabled]) => (
                    <li key={feature} className="flex items-center border-b border-gray-200 ">
                      <div className="h-5 w-5 rounded-full bg-[#88B29A] flex items-center justify-center mr-2 mb-3 text-white">
                        {enabled ? <CheckIcon /> : <CrossIcon />}
                      </div>
                      <span className="ml-3 mb-4 text-[#88B29A]">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="mt-0 w-full cursor-pointer bg-sage-400 text-white py-2 px-4 rounded-md hover:bg-sage-500 transition-colors">
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .text-sage-600 {
          color: #88B29A;
        }
        .bg-sage-400 {
          background-color: #88B29A;
        }
        .bg-sage-500 {
          background-color: #76998a;
        }
        .hover\:bg-sage-100:hover {
          background-color: #e8f1e9;
        }
        .text-sage-400 {
          color: #88B29A;
        }
      `}</style>
    </div>
  );
}