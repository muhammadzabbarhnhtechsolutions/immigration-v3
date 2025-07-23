import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../../assets/finnal logo.png";

export default function Navbar1() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about-us", label: "About Us" },
    { href: "/refrences", label: "Our Products" },
    { href: "/pricing", label: "Pricing" },
    { href: "/latest-news", label: "Latest News" },
    { href: "/contact-us", label: "Contact Us" },
    { href: "/video-trailer", label: "Video Trailers" },
    { href: "/all-appointments", label: "Appointments" },
    { href: "/templetes", label: "Templates" },
  ];

  return (
    <nav className="w-full  top-0 left-0 z-50 bg-white/90 backdrop-blur-md text-[#3D61AB] shadow-md">
      <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center py-2">
        {/* Logo */}
        <Link href="/" className="">
          <Image
            src={logo}
            alt="logo"
            width={80} // Pehle 48 tha
            height={80} // Pehle 48 tha
            className="h-20 w-auto object-fill" // Pehle h-14 tha
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-4 font-medium">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="hover:text-[#2B4570] transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/signup" className="font-semibold ">
            Sign Up
          </Link>
          <Link href="/login" className="font-semibold flex">
          <button className="bg-[#F0F2F5] text-black px-5 py-2.5 rounded-xl hover:bg-gray-100 transition">
            Login
          </button>
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white text-[#3D61AB] px-6 pt-4 pb-6 space-y-4 shadow-md animate-slideDown">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block hover:text-[#2B4570] transition"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-gray-200">
            <Link
              href="#signup"
              className="block font-semibold hover:underline mb-3"
            >
              Sign Up
            </Link>
            <button className="w-full bg-[#F0F2F5] text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition">
              Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
