"use client";

import {
  buyPakages,
  getPackageResources,
} from "@/services/getPackageResources";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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

export default function IndividualUsers() {
  const [packageData, setPackageData] = useState([]);
  const [billing, setBilling] = useState("monthly");
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const userToken = localStorage.getItem("user");
    console.log(userToken);
    if (!userToken || userToken === "undefined") {
      router.push("/login"); // Redirect to login if token is not found
    } else {
      setToken(userToken); // Set token if exists
    }
  }, []);

  const getPricing = async () => {
    try {
      setLoading(true);
      const res = await getPackageResources();
      if (res.data?.status) {
        setPackageData(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching package data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPricing();
  }, []);

  const filteredPackages = packageData.filter((pkg) =>
    billing === "monthly"
      ? pkg.package_duration === 1
      : pkg.package_duration === 2
  );

  const handlebuyPakages = async (id) => {
    if (!token) {
      return router.push("/signup");
    }

    try {
      const res = await buyPakages(id);

      const checkoutUrl = res?.data?.checkout_url;

      if (checkoutUrl && typeof checkoutUrl === "string") {
        window.open(checkoutUrl, "_blank");
      } else {
        console.error("Invalid checkout URL:", checkoutUrl);
        toast.error("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Error in handlebuyPakages:", error);
      toast.error("Failed to process payment. Try again.");
    }
  };

  if (loading) {
    return (
      <div className="mx-auto bg-[#ebf0ed] px-4 mt-8 py-20 text-center">
        <p>Loading packages...</p>
      </div>
    );
  }

  if (filteredPackages.length === 0) {
    return (
      <div className="mx-auto bg-[#ebf0ed] px-4 mt-8 py-20 text-center">
        <p>No {billing} packages available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto bg-[#ebf0ed] px-4 mt-8 py-20">
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
        {filteredPackages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-[#fbfcfc] rounded-md overflow-hidden relative h-full shadow-sm"
          >
            {/* Header section */}
            <div className="py-4 text-center bg-[#7bab8e] text-white">
              <h3 className="font-semibold md:text-[24px] text-xl">
                {pkg.name}
              </h3>
            </div>

            {/* Main content */}
            <div className="p-6 flex flex-col h-full">
              {/* Description moved here */}

              {/* Price */}
              <div className="text-center mb-6">
                <span className="text-gray-400 text-base font-semibold align-top">
                  £
                </span>
                <span className="text-[#7bab8e] text-5xl font-semibold">
                  {parseFloat(pkg.price).toFixed(2)}
                </span>
                <span className="text-gray-500 text-sm">
                  {" "}
                  / {billing === "monthly" ? "Monthly" : "Annually"}
                </span>
              </div>

              {/* Features */}
              {/* Description before features list */}
              <p className="text-left text-sm text-gray-600 mb-6 px-4">
                {pkg.description}
              </p>

              <ul className="space-y-4 px-4 flex-1">
                {pkg.resources.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center border-b border-gray-200 pb-2"
                  >
                    <div className="h-5 w-5 rounded-full bg-[#7bab8e] flex items-center justify-center text-white">
                      <CheckIcon />
                    </div>
                    <span className="ml-3 text-[#90B29F]">{feature}</span>
                  </li>
                ))}
                <div className="text-center mt-6">
                  <button
                    onClick={() => handlebuyPakages(pkg.id)}
                    className="bg-[#7bab8e] cursor-pointer mb-4 text-white px-8 py-3 text-sm rounded-md hover:bg-[#6a9a7d] transition-colors uppercase tracking-wider font-medium"
                  >
                    Buy Now
                  </button>
                </div>
              </ul>

              {/* Button */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
