"use client";
import { useEffect, useState } from 'react';
import { FaPhone, FaEnvelope, FaArrowRight, FaBars, FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import logo from "../../assets/logo1.png";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("up");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const Logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    router.push('/login');
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? "down" : "up";
      if (direction !== scrollDirection && Math.abs(currentScrollY - lastScrollY) > 10) {
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
      const result = await GetProfile()
      if (result.data) {
        setProfile(result.data.data);
      }
    } catch (_) {
      toast.error('something went wrong')
    }
  }

  useEffect(() => {
    getProfileData()
  }, [])




  return (
    <div className="w-full relative z-[100]">
      {/* Fixed Navigation Container */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"}`}>
        {/* Top Contact Bar */}
        <div className="bg-[#88AE98] text-white px-14 py-2 hidden md:flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <FaPhone /> 07578979789
            </span>
            <span className="flex items-center gap-2">
              <FaEnvelope /> immigration@training.com
            </span>
          </div>
          <div className="space-x-4">
            {!isLoggedIn ? (
              <>
                <Link href="/login" className="hover:underline font-semibold">Login</Link>
                <Link href="/signup" className="hover:underline font-semibold">Sign Up</Link>
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
            <Link className='focus:text-black hover:text-black' href="/">Home</Link>
            {isLoggedIn && (
              <>
                <Link className='text-[#88AE98] focus:text-black hover:text-black' href="/forum">Discussion Forum</Link>
                <Link className='focus:text-black hover:text-black' href="/videos">Courses</Link>
              </>
            )}
            <Link className='hover:text-black focus:text-black' href="/about-us">About Us</Link>
            <Link className='hover:text-black focus:text-black' href="/our-products">Our Products</Link>
            <Link className='hover:text-black focus:text-black' href="/pricing">Pricing</Link>
            <Link className='hover:text-black focus:text-black' href="/latest-news">Latest News</Link>
            <Link className='hover:text-black focus:text-black' href="/contact-us">Contact Us</Link>
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
            <Link href="/" className="text-[#88AE98]">Home</Link>
            {isLoggedIn && (
              <>
                <Link className='text-[#88AE98]' href="/videos">Courses</Link>
                <Link className='text-[#88AE98]' href="/forum">Discussion Forum</Link>
              </>
            )}
            <Link href="/about-us" className="text-[#88AE98]">About Us</Link>
            <Link href="/our-products" className="text-[#88AE98]">Our Products</Link>
            <Link href="/pricing" className="text-[#88AE98]">Pricing</Link>
            <Link href="/latest-news" className="text-[#88AE98]">Latest News</Link>
            <Link href="/contact-us" className="text-[#88AE98]">Contact Us</Link>
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
