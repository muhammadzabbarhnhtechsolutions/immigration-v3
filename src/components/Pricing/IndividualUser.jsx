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

// Pricing data
const plans = [
  {
    name: "Silver",
    prices: { monthly: 150, annually: 1500 },
    features: {
      "Video Resources": true,
      "Application Templates": false,
      "Written Resources": false,
    },
  },
  {
    name: "Gold",
    prices: { monthly: 200, annually: 2000 },
    features: {
      "Video Resources": true,
      "Application Templates": true,
      "Written Resources": true,
    },
    popular: true,
  },
  {
    name: "Bronze",
    prices: { monthly: 50, annually: 500 },
    features: {
      "Application Templates": true,
      "Written Resources": true,
      "Video Resources": false,
    },
  },
];

export default function IndividualUsers() {
  const [billing, setBilling] = useState("monthly");

  return (
    <div className="mx-auto bg-[#ebf0ed] px-4  mt-8 py-20">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-[40px] font-bold mb-6">
          <span className="text-black">Individual </span>
          <span className="text-[#7bab8e]">Users</span>
        </h1>

        <div className="flex justify-center">
          <div className="inline-flex rounded-md mb-6 p-1">
            {["monthly", "annually"].map((type) => (
              <button
                key={type}
                onClick={() => setBilling(type)}
                className={`px-5 py-3 mb-8 font-semibold cursor-pointer text-base md:text-[18px] rounded-md transition-colors ${
                  billing === type
                    ? "bg-[#7bab8e] text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 leading-loose gap-8 md:max-w-[988px] mx-auto">
      {plans.map((plan) => (
          <div
            key={plan.name}
            className={`bg-[#fbfcfc] rounded-md overflow-hidden relative h-full 
              shadow-sm ${plan.popular ? "shadow-3xl transform -translate-y-4 md:scale-110" : ""}`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0">
                <div className="bg-[#7bab8e] text-white text-xs py-1 px-4 rotate-45 translate-x-[30%] translate-y-[40%] w-28 text-center">
                  Popular
                </div>
              </div>
            )}

            <div
              className={`py-4 text-center ${
                plan.name === "Silver" || plan.name === "Bronze"
                  ? "bg-[#7bab8e] text-white"
                  : "bg-white text-[#7bab8e]"
              }`}
            >
              <h3 className="font-semibold items-center md:text-[24px] text-xl mb-2">{plan.name}</h3>
            </div>

            <div className="p-6">
              <div className="text-center mb-6">
                <span className="text-gray-400 text-base font-semibold align-top">£</span>
                <span className="text-[#7bab8e] text-5xl font-semibold">
                  {plan.prices[billing]}
                </span>
                <span className="text-gray-500 text-sm">
                  {" "}
                  / {billing === "monthly" ? "Monthly" : "Annually"}
                </span>
              </div>

              {/* <ul className="space-y-4 mb-8"> */}
              <ul className="mt-8 space-y-4 px-4">
                  {Object.entries(plan.features).map(([feature, enabled]) => (
                    <li key={feature} className="flex items-center border-b border-gray-200 ">
                      <div className="h-5 w-5 rounded-full bg-[#7bab8e] flex items-center justify-center mr-2 mb-3 text-white">
                        {enabled ? <CheckIcon /> : <CrossIcon />}
                      </div>
                      <span className="ml-3 mb-4 text-[#90B29F]">{feature}</span>
                    </li>
                  ))}
                </ul>

              <div className="text-center">
                <button className="bg-[#7bab8e] cursor-pointer mb-4 mt-6 text-white px-8 py-3 text-sm rounded-md hover:bg-[#6a9a7d] transition-colors uppercase tracking-wider font-medium">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}