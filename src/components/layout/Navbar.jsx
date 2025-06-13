"use client";
import { useEffect, useRef, useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaArrowRight,
  FaBars,
  FaTimes,
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
    setResources(userData?.package?.resources);
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
    <div className="w-full  mb-8 relative z-[100]">
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
                <a href="/login" className="hover:underline font-semibold">
                  Login
                </a>
                <Link href="/signup" className="hover:underline font-semibold">
                  Sign Up
                </Link>
              </>
            ) : (
              <button
                onClick={Logout}
                className="hover:underline font-semibold"
              >
                Logout
              </button>
            )}
          </div>
        </div>

        {/* Main Navbar */}
        <div className="bg-white px-4 md:px-18 py-2 flex justify-between items-center shadow-md">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={logo}
              alt="logo"
              width={124}
              height={124}
              className="w-[80px] h-[80px] md:w-[119px] md:h-[119px] object-contain"
            />
          </Link>

          <nav className="hidden md:flex space-x-6 text-[#90B29F] font-sans text-[16px]">
            <Link className="focus:text-black hover:text-black" href="/">
              Home
            </Link>
            {profile?.package?.resources.length && (
              <>
                {/* <Link
                  className="text-[#88AE98] focus:text-black hover:text-black"
                  href="/forum"
                >
                  Discussion Forum
                </Link> */}
                <Link
                  className="focus:text-black hover:text-black"
                  href="/courses"
                >
                  Courses
                </Link>
              </>
            )}
            <Link
              className="hover:text-black focus:text-black"
              href="/about-us"
            >
              About Us
            </Link>
            <Link
              className="hover:text-black focus:text-black"
              href="/our-products"
            >
              Our Products
            </Link>
            {/* {isLoggedIn && !userData?.is_active && ( */}
            {(!isLoggedIn || !profile?.package?.resources) && (
              <Link
                className="hover:text-black focus:text-black"
                href="/pricing"
              >
                Pricing
              </Link>
            )}

            {/* )} */}
            <Link
              className="hover:text-black focus:text-black"
              href="/latest-news"
            >
              Latest News
            </Link>
            <Link
              className="hover:text-black focus:text-black"
              href="/contact-us"
            >
              Contact Us
            </Link>
            <Link
              className="hover:text-black focus:text-black"
              href="/video-trailer"
            >
              Video Trailors
            </Link>

            {profile?.package?.resources.length > 0 && (
              <div
                ref={dropdownRef}
                className="relative -mt-2 inline-block text-left"
              >
                <button
                  onClick={() => setOpen(!open)}
                  className="inline-flex items-center gap-2 px-2 py-2 text-base text-[#90B29F] bg-white rounded-full hover:text-black transition duration-300 ease-in-out "
                >
                  Resources
                  <svg
                    className={`w-5 h-5 transform transition-transform duration-300 ${
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
                  <div className="absolute right-0 left-6 z-20 mt-1 w-48 rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 animate-fade-in">
                    <div className="py-2">
                      {profile?.package?.resources.map((resource, index) => {
                        let href = "#";

                        if (resource === "E-book") {
                          href = "/e-book";
                        } else if (resource === "General Resource") {
                          href = "/course-topics/resources";
                        } else if (resource === "Reference Material") {
                          href = "/refrence-material";
                        } else if (resourceLinks[resource]) {
                          href = resourceLinks[resource];
                        }

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
            )}
          </nav>
          <Link href="/request-a-demo">
            <div className="hidden md:block">
              <button className="bg-[#90B29F] cursor-pointer hover:bg-[#7fa98b] transition duration-200 flex items-center gap-2 text-white text-sm font-medium px-4 py-3 rounded-md">
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
        {isMobileMenuOpen && (
          <div className="bg-white px-6 py-4 h-screen flex flex-col space-y-4 md:hidden border-t-2 border-gray-100 shadow-md">
            <Link href="/" className="text-[#88AE98]">
              Home
            </Link>
            {isLoggedIn && userData?.is_active && (
              <>
                <Link className="text-[#88AE98]" href="/videos">
                  Courses
                </Link>
                {/* <Link className="text-[#88AE98]" href="/forum">
                  Discussion Forum
                </Link> */}
              </>
            )}
            <Link href="/about-us" className="text-[#88AE98]">
              About Us
            </Link>
            <Link href="/our-products" className="text-[#88AE98]">
              Our Products
            </Link>
            {isLoggedIn && !userData?.is_active && (
              <Link href="/pricing" className="text-[#88AE98]">
                Pricing
              </Link>
            )}
            <Link href="/latest-news" className="text-[#88AE98]">
              Latest News
            </Link>
            <Link href="/contact-us" className="text-[#88AE98]">
              Contact Us
            </Link>
            <div className="flex flex-col space-y-2 pt-4 border-t-2 border-gray-100">
              <span className="flex items-center gap-2 text-[#88AE98]">
                <FaPhone /> 07578979789
              </span>
              <span className="flex items-center gap-2 text-[#88AE98]">
                <FaEnvelope /> immigration@training.com
              </span>
            </div>
            <button className="bg-[#90B29F] cursor-pointer hover:bg-[#7fa98b] transition duration-200 flex items-center justify-center gap-2 text-white text-sm font-semibold px-4 py-3 rounded-md">
              REQUEST A DEMO <FaArrowRight />
            </button>
          </div>
        )}
      </div>

      {/* Spacer to prevent layout shift */}
      <div className="h-[76px] md:h-[116px]"></div>
    </div>
  );
}
