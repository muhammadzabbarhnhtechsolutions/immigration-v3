"use client";

import {
  buyPakages,
  getPackageResources,
} from "@/services/getPackageResources";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import { appointmentPakageBuy } from "@/services/appointmentSubscribe";
import { filterByResources, getAllResources } from "@/services/getAllResources";
import { Select } from "flowbite-react";
import { ChevronDown } from "lucide-react";

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
  const [billing, setBilling] = useState("Service");
  const [loading, setLoading] = useState(true);
  const [checklogin, setcheckLogin] = useState("");
  const [token, setToken] = useState(null);
  const [filteredPackagesByResources, setFilteredPackagesByResources] = useState([]);

  const router = useRouter();
  useEffect(() => {
    const userToken = localStorage.getItem("access_token");
    setToken(userToken); // Set token if exists
  }, []);

  useEffect(() => {
    const userToken = localStorage.getItem("user");
    setcheckLogin(userToken);
  }, []);

  // useEffect(() => {
  //   const userToken = localStorage.getItem("access_token");
  //   console.log(userToken);

  //   if (!userToken || userToken === "undefined") {
  //     router.push("/login");
  //   } else {
  //     setToken(userToken); // ✅ Set it here
  //   }
  // }, []);

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
  // .

  useEffect(() => {
    getPricing();
  }, []);




  // const handlebuyPakages = async (id) => {
  //   if (!token) {
  //     return router.push("/signup");
  //   }

  //   try {
  //     const res = await buyPakages(id);

  //     const checkoutUrl = res?.data?.checkout_url;

  //     if (checkoutUrl && typeof checkoutUrl === "string") {
  //       window.open(checkoutUrl, "_blank");
  //     } else {
  //       console.error("Invalid checkout URL:", checkoutUrl);
  //       toast.error("Something went wrong. Please try again later.");
  //     }
  //   } catch (error) {
  //     console.error("Error in handlebuyPakages:", error);
  //     toast.error("Failed to process payment. Try again.");
  //   }
  // };

  // ...

  const pathname = usePathname(); // 👈 Add inside component

  const handlebuyPakages = async (id) => {
    if (!token) {
      router.push(`/login?next=/pricing`);
      return;
    }

    try {
      // 👇 Check if current tab is "Consultation" and path includes "consultation"
      if (billing === "Consultation") {
        const formData = new FormData();
        formData.append("package_id", id);

        const res = await appointmentPakageBuy(router, formData);

        if (res?.checkout_url) {
          window.open(res.checkout_url, "_blank");
        } else {
          toast.error("Failed to initiate consultation payment.");
        }
      } else {
        // Regular service or business plan purchase
        const res = await buyPakages(id, token);

        const checkoutUrl = res?.data?.checkout_url;
        if (checkoutUrl && typeof checkoutUrl === "string") {
          window.open(checkoutUrl, "_blank");
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error in handlebuyPakages:", error);
      toast.error("Failed to process payment. Try again.");
    }
  };

  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  useEffect(() => {
    if (status === "success") {
      toast.success("Payment successful!");
      // ✅ Optionally: refresh package data
      getPricing();
    } else if (status === "cancel") {
      toast.error("Payment was cancelled.");
    }
  }, [status]);

  const [resources, setResources] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Fetch API on mount
  useEffect(() => {
    const fetchResources = async () => {
      const res = await getAllResources(router);
      if (res?.status && Array.isArray(res.data)) {
        setResources(res.data);
      }
    };
    fetchResources();
  }, [router]);

  // Handle selection
const toggleSelect = async (id) => {
  const updated = selectedIds.includes(id)
    ? selectedIds.filter((item) => item !== id)
    : [...selectedIds, id];

  setSelectedIds(updated);

  if (updated.length === 0) {
    setFilteredPackagesByResources([]); // Reset to empty when none selected
    return;
  }

  const res = await filterByResources(updated, router);
  if (res?.status) {
    setFilteredPackagesByResources(res.data); // Update card data
  }
};

  const filteredPackages = (selectedIds.length > 0 ? filteredPackagesByResources : packageData).filter(
  (pkg) => {
    if (billing === "Service") return pkg.package_type === 1;
    if (billing === "Consultation") return pkg.package_type === 2;
    if (billing === "Business Plan" || billing === "buisness Plan") return pkg.package_type === 3;
    return false;
  }
);

  if (loading) {
    return (
      <div className="mx-auto bg-[#ebf0ed] px-4 mt-8 py-20 text-center flex flex-col items-center justify-center gap-4 animate-fade-in">
        {/* Spinner */}
        <div className="h-10 w-10 border-4 border-[#5bb180] border-t-transparent rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-[#5bb180] text-lg font-medium">
          Loading packages...
        </p>
      </div>
    );
  }

  if (filteredPackages.length === 0) {
    return (
      <div className="mx-auto px-4 mt-8 py-20 text-center">
        <div className="text-center mb-8">
          {/* <h1 className="text-2xl md:text-[40px] font-bold mb-6">
          <span className="text-black">Individual </span>
          <span className="text-[#7bab8e]">Users</span>
        </h1> */}

          <div className="flex justify-center">
            
            <div className="inline-flex rounded-md gap-4 mb-6 mt-6 p-1">
                 <div className="relative w-full sm:w-auto max-w-md">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full sm:w-[240px] px-4 py-2 text-left bg-gray-100 border border-[#d1e7dd] rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5AAA7C] flex justify-between items-center text-gray-800 hover:shadow-lg transition"
              >
                {selectedIds?.length === 0
                  ? "Select Resources"
                  : `${selectedIds?.length} Selected`}
                <ChevronDown className="ml-2 text-[#5AAA7C]" size={18} />
              </button>

              {isOpen && (
                <div className="absolute z-50 mt-2 w-full sm:w-[240px] bg-white border border-gray-300 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                  {resources.map((res) => (
                    <label
                      key={res.id}
                      className="flex items-center px-4 py-2 hover:bg-green-50 cursor-pointer transition-all"
                    >
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(res.id)}
                        onChange={() => toggleSelect(res.id)}
                        className="form-checkbox text-[#5AAA7C] rounded focus:ring-0"
                      />
                      <span className="ml-2 text-gray-800">{res.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
              {["Service", "Consultation", "buisness Plan"].map((type) => (
                <button
                  key={type}
                  onClick={() => setBilling(type)}
                  className={`px-5 py-2.5 font-semibold text-sm sm:text-base rounded-full transition duration-300 ${
                    billing === type
                      ? "bg-[#5AAA7C] text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-[#e7f6ee] hover:text-[#5AAA7C]"
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
        <p>No {billing} packages available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto bg-[#ebf0ed] px-4 mt-8 py-20">
      <div className="text-center mb-8">
        {/* <h1 className="text-2xl md:text-[40px] font-bold mb-6">
          <span className="text-black">Individual </span>
          <span className="text-[#7bab8e]">Users</span>
        </h1> */}

        <div className="flex justify-center">
          <div className="inline-flex flex-wrap justify-start items-center gap-4 mb-6 mt-6 px-4 py-3  rounded-2xl   border-gray-200">
            {/* 🌿 Multi-Select Dropdown */}
            <div className="relative w-full sm:w-auto max-w-md">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full sm:w-[210px] px-4 py-2 text-left bg-gray-100 border border-[#d1e7dd] rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5AAA7C] flex justify-between items-center text-gray-800 hover:shadow-lg transition"
              >
                {selectedIds?.length === 0
                  ? "Select Resources"
                  : `${selectedIds?.length} Selected`}
                <ChevronDown className="ml-2 text-[#5AAA7C]" size={18} />
              </button>

              {isOpen && (
                <div className="absolute z-50 mt-2 w-full sm:w-[240px] bg-white border border-gray-300 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                  {resources.map((res) => (
                    <label
                      key={res.id}
                      className="flex items-center px-4 py-2 hover:bg-green-50 cursor-pointer transition-all"
                    >
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(res.id)}
                        onChange={() => toggleSelect(res.id)}
                        className="form-checkbox text-[#5AAA7C] rounded focus:ring-0"
                      />
                      <span className="ml-2 text-gray-800">{res.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* 🧾 Tabs */}
            <div className="flex flex-wrap gap-2">
              {["Service", "Consultation", "Business Plan"].map((type) => (
                <button
                  key={type}
                  onClick={() => setBilling(type)}
                  className={`px-5 py-2.5 font-semibold text-sm sm:text-base rounded-full transition duration-300 ${
                    billing === type
                      ? "bg-[#5AAA7C] text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-[#e7f6ee] hover:text-[#5AAA7C]"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 leading-loose gap-8 md:max-w-[988px] mx-auto">
        {filteredPackages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-[#fbfcfc] rounded-md overflow-hidden relative h-full shadow-sm flex flex-col"
          >
            {/* Header */}
            <div className="py-4 text-center bg-[#7bab8e] text-white">
              <h3 className="font-semibold md:text-[24px] text-xl">
                {pkg.name}
              </h3>
            </div>

            {/* Main content */}
            <div className="p-6 flex flex-col h-full justify-between flex-grow">
              <div>
                {/* Price */}
                <div className="text-center mb-6">
                  <span className="text-gray-400 text-base font-semibold align-top">
                    £
                  </span>
                  <span className="text-[#7bab8e] text-5xl font-semibold">
                    {parseFloat(pkg.price).toFixed(2)}
                  </span>
                  <span className="text-gray-500 text-sm">
                    / {pkg.package_duration === 1 ? "Monthly" : "Annually"}
                  </span>
                </div>

                {/* Description */}
                <p className="text-left text-sm text-gray-600 mb-6 px-4">
                  {pkg.description}
                </p>

                {/* Features list */}
                <ul className="space-y-4 px-4">
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
                </ul>
              </div>

              {/* Button at bottom */}
              <div className="text-center mt-6">
                <button
                  onClick={() => handlebuyPakages(pkg.id)}
                  className="bg-[#7bab8e] cursor-pointer mb-2 text-white px-8 py-3 text-sm rounded-md hover:bg-[#6a9a7d] transition-colors uppercase tracking-wider font-medium"
                >
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
