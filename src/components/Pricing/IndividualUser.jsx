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
import { ChevronDown, Euro } from "lucide-react";

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
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  const [resources, setResources] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem("access_token");
    setToken(userToken);
  }, []);

  useEffect(() => {
    const userToken = localStorage.getItem("user");
    setcheckLogin(userToken);
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

  const handlebuyPakages = async (id) => {
    if (!token) {
      router.push(`/login?next=/pricing`);
      return;
    }

    try {
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

  useEffect(() => {
    if (status === "success") {
      toast.success("Payment successful!");
      getPricing();
    } else if (status === "cancel") {
      toast.error("Payment was cancelled.");
    }
  }, [status]);

  useEffect(() => {
    const fetchResources = async () => {
      const res = await getAllResources(router);
      if (res?.status && Array.isArray(res.data)) {
        setResources(res.data);
      }
    };
    fetchResources();
  }, [router]);

  const toggleSelect = async (id) => {
    const updated = selectedIds.includes(id)
      ? selectedIds.filter((item) => item !== id)
      : [...selectedIds, id];

    setSelectedIds(updated);

    if (updated.length === 0) {
      setFilteredPackagesByResources([]);
      return;
    }

    const res = await filterByResources(updated, router);
    if (res?.status) {
      setFilteredPackagesByResources(res.data);
    }
  };

  const filteredPackages = (selectedIds.length > 0 ? filteredPackagesByResources : packageData).filter((pkg) => {
    if (billing === "Service") return pkg.package_type === 1;
    if (billing === "Consultation") return pkg.package_type === 2;
    if (billing === "Business Plan" || billing === "buisness Plan") return pkg.package_type === 3;
    return false;
  });

  if (loading) {
    return (
      <div className="mx-auto  bg-[#ebf0ed] px-4 mt-0 py-20 text-center flex flex-col items-center justify-center gap-4 animate-fade-in">
        <div className="h-10 w-10 border-4 border-[#88B29A] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[#88B29A] text-lg font-medium">Loading packages...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 mt-0 py-12 sm:py-16 md:px-22">
      <div className="text-center mb-8">
        <div className="flex justify-center">
          <div className="inline-flex flex-wrap justify-start items-center gap-4 mb-6 mt-6 px-4 py-3 rounded-2xl border border-gray-200 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto max-w-xs">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full sm:w-[210px] px-4 py-2 text-left bg-gray-100 border border-[#d1e7dd] rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#88B29A] flex justify-between items-center text-gray-800 hover:shadow-lg transition"
              >
                {selectedIds?.length === 0 ? "Select Resources" : `${selectedIds?.length} Selected`}
                <ChevronDown className="ml-2 text-[#88B29A]" size={18} />
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
                        className="form-checkbox text-[#88B29A] rounded focus:ring-0"
                      />
                      <span className="ml-2 text-gray-800">{res.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {["Service", "Consultation", "Business Plan"].map((type) => (
                <button
                  key={type}
                  onClick={() => setBilling(type)}
                  className={`px-5 py-2.5 font-semibold text-sm sm:text-base rounded-full transition duration-300 ${
                    billing === type
                      ? "bg-[#88B29A] text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-[#e7f6ee] hover:text-[#88B29A]"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {filteredPackages.length === 0 ? (
        <div className="text-center py-10 text-gray-600">
          <p>No {billing} packages available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-screen-xl  px-2 mx-20">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-[#fbfcfc] rounded-lg overflow-hidden shadow-sm flex flex-col  md:px-22  "
            >
              <div className="py-4 text-center bg-[#88B29A] text-white">
                <h3 className="font-semibold text-xl sm:text-2xl md:text-[24px] mx-4">
                  {pkg.name}
                </h3>
              </div>
              <div className="px-4 py-6 flex flex-col flex-grow justify-between">
                <div>
                  <div className="text-center mb-6">
                    <div className="flex justify-center items-end gap-2 text-[#88B29A]">
                      <span className="text-3xl sm:text-4xl font-semibold flex items-center gap-1">
                        <Euro className="w-5 h-5 mt-1" />
                        {parseFloat(pkg.price).toFixed(2)}
                      </span>
                      <span className="text-gray-500 text-xs mb-1">
                        / {pkg.package_duration === 1 ? "Monthly" : "Annually"}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-6">{pkg.description}</p>
                  <ul className="space-y-4">
                    {pkg.resources.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center border-b border-gray-200 pb-2"
                      >
                        <div className="h-5 w-5 rounded-full bg-[#88B29A] flex items-center justify-center text-white">
                          <CheckIcon />
                        </div>
                        <span className="ml-3 text-[#88B29A]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-center mt-6">
                  <button
                    onClick={() => handlebuyPakages(pkg.id)}
                    className="bg-[#88B29A] cursor-pointer text-white px-6 py-3 text-sm rounded-md hover:bg-[#6a9a7d] transition uppercase tracking-wider font-medium w-full"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}