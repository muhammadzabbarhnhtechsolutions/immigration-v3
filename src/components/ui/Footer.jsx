"use client";
import { ArrowUp } from "lucide-react";
import Image from "next/image";
import React from "react";
const Footer = (props) => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className=" z-[99] mx-auto max-w-screen-2xl">
      <div className=" bg-[#101010]  pt-20 px-24 flex flex-col gap-12">
        <div className="flex items-center md:flex-row flex-col gap-5 justify-between w-full lg:w-[60%]">
          <Image
            src={"/assets/logo2.png"}
            alt="logo"
            width={200}
            height={200}
          />
          <div className="tracking-wider">
            <h1 className="text-xl mb-4">Pages</h1>
            <div className="flex items-center gap-24">
              <ul className="uppercase text-xs opacity-70 flex flex-col gap-4">
                <li>For Women</li>
                <li>Login</li>
                <li>Contact</li>
              </ul>
              <ul className="uppercase text-xs opacity-70 flex flex-col gap-4">
                <li>About</li>
                <li>FAQ</li>
                <li>Testimonials</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="relative flex justify-center w-full items-center text-xs py-2 opacity-70">
          &copy; 2024 Made by HNH Soft Tech Solutions.
          <div className="absolute -top-8 right-0 flex items-center gap-2">
            To Top
            <button
              className="p-2 rounded-full border bg-[#1a1917]"
              onClick={handleScrollToTop}
            >
              <ArrowUp color="white" size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
