import Link from "next/link";
import logo from "../../assets/logo1.png";
import Image from "next/image";
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
export default function Navbar1() {
   const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white top-0 left-0 z-50 bg-transparent text-[#3D61AB] py-4">
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        {/* Logo */}
       <Link href="/" className="flex items-center h-16 gap-3">
  <Image
    src={logo}
    alt="logo"
    width={48}
    height={48}
    className="h-20 w-auto object-contain"
  />
</Link>


        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 font-medium">
          <li><a href="#home" className="hover:text-gray-700">Home</a></li>
          <li><a href="#about" className="hover:text-gray-700">About Us</a></li>
          <li><a href="#lawyers" className="hover:text-gray-700">Lawyers & Students</a></li>
          <li><a href="#public" className="hover:text-gray-700">General public</a></li>
          <li><a href="#pricing" className="hover:text-gray-700">Pricing</a></li>
          <li><a href="#contact" className="hover:text-gray-700">Contact Us</a></li>
        </ul>

        {/* Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <a href="#signup" className="font-semibold text-[#4069bd]">Sign Up</a>
          <button className="bg-[#F0F2F5] text-black px-5 py-2.5 rounded-xl hover:bg-gray-100">
            Login
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white text-[#3D61AB] px-6 pt-4 pb-6 space-y-4 shadow-md">
          <a href="#home" className="block hover:text-gray-400">Home</a>
          <a href="#about" className="block hover:text-gray-400">About Us</a>
          <a href="#lawyers" className="block hover:text-gray-400">Lawyers & Students</a>
          <a href="#pricing" className="block hover:text-gray-400">Pricing</a>
          <a href="#contact" className="block hover:text-gray-400">Contact Us</a>
          <a href="#signup" className="block hover:underline">Sign Up</a>
          <button className="w-full bg-[#F0F2F5] text-blue-600 px-4 py-2 rounded hover:bg-gray-100 mt-2">
            Login
          </button>
        </div>
      )}
    </nav>
  
  );
}
