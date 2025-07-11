"use client";
import { useEffect, useRef, useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaArrowRight,
  FaBars,
  FaTimes,
  FaAccessibleIcon,
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/logo1.png";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {
  removeAccessToken,
  removeRefreshToken,
} from "../../utils/localStorage";
import { GetProfile } from "../../services/postServices";
import { Dropdown } from "flowbite-react";
import { Briefcase, BusIcon, LogOut, UserCircle2 } from "lucide-react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("up");
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState();
  const [profile, setProfile] = useState();
  const [resources, setResources] = useState([]);
  const [packageData, setPackageData] = useState([]);
  const [checklogin, setcheckLogin] = useState("");
  const [openLogout, setLogoutOpen] = useState(false);
  const [isMobileResourcesOpen, setMobileResourcesOpen] = useState(false);

  console.log("......", userData, "...............");
  const hanldeShowLogoutButton = () => {
    setLogoutOpen(!openLogout);
  };
  console.log("profile resources", profile?.package?.resources);
  useEffect(() => {
    const userToken = localStorage.getItem("user");
    setcheckLogin(userToken);
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("user");
    setUserData(token);
    console.log("dddddddddd", packageData);
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  useEffect(() => {
    const userToken = localStorage.getItem("user");
    setcheckLogin(userToken);
  }, []);
  console.log(resources, "resources");
  const Logout = () => {
    // Clear tokens
    removeAccessToken();
    removeRefreshToken(); // Optional if using refresh tokens
    Cookies.remove("access_token"); // Remove cookie

    // Remove additional data
    localStorage.removeItem("user");
    localStorage.removeItem("course_id");

    // Optionally, clear all
    // localStorage.clear();

    // Redirect to login
    router.push("/login");
  };

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const resourceLinks = {
    Forums: "/forum",
    Blogs: "/blogs",
    Articles: "/article",
    "Create Blog": "/article/create",
    Videos: "/videos",
    Courses: "/courses",
    Podcast: "/podcast",
  };
  // ...
  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? "down" : "up";
      if (
        direction !== scrollDirection &&
        Math.abs(currentScrollY - lastScrollY) > 10
      ) {
        setScrollDirection(direction);
      }
      lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
    };

    window.addEventListener("scroll", updateScrollDirection);
    return () => {
      window.removeEventListener("scroll", updateScrollDirection);
    };
  }, [scrollDirection]);

  const getProfileData = async () => {
    try {
      const result = await GetProfile();
      if (result.data) {
        const newProfileData = result?.data?.data;
        setProfile(newProfileData);
        setResources(newProfileData?.resources || []);
        // Update localStorage "user" key with latest profile data
        localStorage.setItem("user", JSON?.stringify(newProfileData));
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);
  useEffect(() => {
    const userToken = localStorage.getItem("user");
    setToken(userToken);
  }, []);
  console.log(resources, "resources");
  useEffect(() => {
    const userObject = localStorage?.getItem("user");

    if (userObject && userObject !== "undefined") {
      try {
        const parsedata = JSON.parse(userObject);
        if (parsedata) {
          setUserData(parsedata);
        }
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    }
  }, []);

  useEffect(() => {
    setResources(userData);
    console.log("ddd", userData);
  }, [userData?.package?.resources]);

  useEffect(() => {
    const userObject = localStorage?.getItem("user");

    if (userObject?.package === null) {
      setPackageData(false);
    } else {
      setPackageData(true);
    }
  }, []);
  return (
    <div className="w-full  md:mb-8 relative z-[100]">
      {/* Fixed Navigation Container */}
      <div
        className={`fixed top-0 left-0 mb-12 right-0 z-50 transition-transform duration-300`}
        //  ${
        // scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
        // }
      >
        {/* Top Contact Bar */}
        <div className="bg-[#88AE98]  text-white px-14 py-2 hidden md:flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <FaPhone /> 07578979789
            </span>
            <span className="flex items-center gap-2">
              <FaEnvelope /> immigration@training.com
            </span>
          </div>
          <div className="space-x-4">
            {!checklogin || checklogin === "undefined" ? (
              <>
                <Link href="/login" className="hover:underline font-semibold">
                  Login
                </Link>
                <Link href="/signup" className="hover:underline font-semibold">
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={hanldeShowLogoutButton}
                  className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:ring-2 hover:ring-[#5bb180] transition"
                >
                  <UserCircle2 className="w-6 h-6 text-gray-700" />
                </button>

                {openLogout && (
                  <div className="absolute -right-10 z-20 mt-3 py-1  w-44 rounded-lg bg-white shadow-lg ring-1 ring-gray-200">
                    {/* Logout always shown */}

                    {/* Business Account shown only if any package has package_type === 3 */}
                    {userData?.packages?.some(
                      (pkg) => pkg.package_type === 3
                    ) && (
                      <Link href="/business-account">
                        <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100               transition-all duration-200">
                          <Briefcase className="w-5 h-5 text-gray-600" />
                          Business Account
                        </button>
                      </Link>
                    )}
                    <button
                      onClick={Logout}
                      className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Main Navbar */}
        <div className="bg-white px-4 md:px-18 py-2 flex justify-between items-center shadow-md">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={logo}
              alt="logo"
              width={24}
              height={24}
              className="w-[80px] h-[80px] md:w-[119px] md:h-[119px] object-contain"
            />
          </Link>

          {/* .. */}
          <nav className="hidden md:flex gap-[15px] text-[#90B29F] font-sans text-[16px]">
            {[
              { href: "/", label: "Home" },
              { href: "/about-us", label: "About Us" },
              // { href: "/our-products", label: "Our Products" },
              { href: "/refrences", label: "Our Products" },
              { href: "/pricing", label: "Pricing" },
              { href: "/latest-news", label: "Latest News" },
              { href: "/contact-us", label: "Contact Us" },
              { href: "/video-trailer", label: "Video Trailers" },
              { href: "/all-appointments", label: "Appointments" },
              { href: "/templetes", label: "Templates" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-black focus:text-black transition"
              >
                {link.label}
              </Link>
            ))}

            {/* Resources Dropdown */}
            {/* {Array.isArray(resources) && resources.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setOpen(!open)}
                  className="inline-flex items-center gap-1 px-3 py-1 -mt-1 rounded-full hover:text-black transition"
                >
                  Resources
                  <svg
                    className={`w-4 h-4 transform transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {open && (
                  <div className="absolute right-0 z-20 mt-2 w-48 rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 animate-fade-in">
                    <div className="py-2">
                      {resources.map((resource, index) => {
                        let href = "#";
                        if (resource === "E-book") href = "/e-book";
                        else if (resource === "General Resource")
                          href = "/course-topics/resources";
                        else if (resource === "Course Videos")
                          href = "/courses";
                        else if (resource === "Reference Material")
                          href = "/refrence-material";
                        else if (resourceLinks[resource])
                          href = resourceLinks[resource];

                        return (
                          <Link
                            key={index}
                            href={href}
                            onClick={() => setOpen(false)}
                            className="block px-5 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#6fbe91] transition duration-200 rounded-md"
                          >
                            {resource === "Create Blog"
                              ? "Create Blog"
                              : resource}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )} */}
          </nav>

          <Link href="/request-a-demo">
            <div className="hidden md:block">
              <button className="bg-[#8db39d] cursor-pointer hover:bg-[#7fa98b] transition hover:scale-105 hover:shadow-lg duration-200 flex items-center gap-2 text-white text-sm font-medium px-3 py-3 rounded-full">
                REQUEST A DEMO <FaArrowRight />
              </button>
            </div>
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-[#90B29F] cursor-pointer text-2xl md:hidden"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="bg-white px-6 py-4 h-screen flex flex-col space-y-4 md:hidden border-t-2 border-gray-100 shadow-md overflow-y-auto">
            {/* ─── Main Links ───────────────────────────── */}
            {[
              { href: "/", label: "Home" },
              { href: "/about-us", label: "About Us" },
              { href: "/our-products", label: "Our Products" },
              { href: "/pricing", label: "Pricing" },
              { href: "/latest-news", label: "Latest News" },
              { href: "/contact-us", label: "Contact Us" },
              { href: "/video-trailer", label: "Video Trailers" },
              { href: "/all-appointments", label: "Appointments" },
              { href: "/templetes", label: "Templates" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#88AE98]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* ─── Resources (toggle) ───────────────────── */}
            {Array.isArray(resources) && resources.length > 0 && (
              <>
                <button
                  onClick={() => setMobileResourcesOpen(!isMobileResourcesOpen)}
                  className="flex items-center justify-between w-full text-[#88AE98] font-semibold mt-4"
                >
                  <span>Resources</span>
                  {isMobileResourcesOpen ? (
                    <FaChevronUp className="text-[#88AE98]" />
                  ) : (
                    <FaChevronDown className="text-[#88AE98]" />
                  )}
                </button>

                {isMobileResourcesOpen && (
                  <div className="flex flex-col text-[#88AE98]  space-y-1 pl-4">
                    {resources.map((resource, idx) => {
                      let href = "#";
                      if (resource === "E-book") href = "/e-book";
                      else if (resource === "General Resource")
                        href = "/course-topics/resources";
                      else if (resource === "Course Videos") href = "/courses";
                      else if (resource === "Reference Material")
                        href = "/refrence-material";
                      else if (resourceLinks[resource])
                        href = resourceLinks[resource];

                      return (
                        <Link
                          key={idx}
                          href={href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-base text-[#88AE98] leading-relaxed hover:text-[#51956d] transition"
                        >
                          {resource === "Create Blog"
                            ? "Create Blog"
                            : resource}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </>
            )}

            {/* ─── Auth / Account Section ──────────────── */}
            <hr className="border-t border-gray-100 my-4" />

            {!isLoggedIn ? (
              /* ⇢ User NOT logged‑in → show Login / Sign‑up */
              <>
                <Link
                  href="/login"
                  className="text-[#88AE98]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="text-[#88AE98]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            ) : (
              /* ⇢ User logged‑in → Business Account (if package_type 3) + Logout */
              <>
                {userData?.packages?.some((pkg) => pkg.package_type === 3) && (
                  <Link
                    href="/business-account"
                    className="flex items-center gap-2 text-[#88AE98]"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Briefcase className="w-5 h-5 text-gray-600" /> Business
                    Account
                  </Link>
                )}

                <button
                  onClick={() => {
                    Logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-[#88AE98]"
                >
                  <LogOut className="w-4 h-4 text-gray-600" /> Logout
                </button>
              </>
            )}

            {/* ─── Contact Info ─────────────────────────── */}
            <div className="flex flex-col space-y-2 pt-4 border-t-2 border-gray-100">
              <span className="flex items-center gap-2 text-[#88AE98]">
                <FaPhone /> 07578979789
              </span>
              <span className="flex items-center gap-2 text-[#88AE98]">
                <FaEnvelope /> immigration@training.com
              </span>
            </div>

            {/* ─── Request Demo ─────────────────────────── */}
            <Link
              href="/request-a-demo"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <button className="bg-[#90B29F] mt-4 w-full flex items-center justify-center gap-2 text-white text-sm font-semibold py-3 rounded-md hover:bg-[#7fa98b]">
                REQUEST A DEMO <FaArrowRight />
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Spacer to prevent layout shift */}
      <div className="h-[76px] md:h-[116px]"></div>
    </div>
  );
}
