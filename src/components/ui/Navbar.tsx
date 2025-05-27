'use client';
import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  // SheetFooter,
} from "@/components/ui/sheet";
import { FiAlignRight } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from '../../app/Redux/store';

type Props = {};

const Navbar = (props: Props) => {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  const profiledata = useSelector((state: RootState) => state.example.profile);

  console.log('profiledata', profiledata)
  useEffect(() => {
    let access_token = localStorage.getItem('access_token');
    setToken(access_token);
    if (!access_token) setIsLogin(false);
  }, []);



  const Logout = () => {
    localStorage.clear()
    router.push('/login')
  }
  return (
    <div className="fixed top-5 w-full z-[60] flex justify-center items-center">
      <div className="w-full lg:w-[85%]  max-w-screen-2xl  flex mx-auto items-center justify-between p-2 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-50 bg-black rounded-sm border border-[#252422] px-6 ">
        <Link href={"/"} className="w-[15%] lg:w-[7%]">
          <Logo />
        </Link>
        <ul className="hidden uppercase lg:flex items-center text-md lg:text-sm gap-4">
          <Link href={"/"}>Home</Link>
          <Link href={"/contact-us"}>Contact Us</Link>
          <Link href={"/"}>About US</Link>
          <Link href={"/"}>FAQ</Link>
          <Link href={"/"}>Testimonials</Link>
          {!profiledata?.is_active_subscriber ?
            <Link href={"/pricing"}>Become a Mistresswife</Link> : ""}
          {token !== null ? <Link href={profiledata?.is_active_subscriber ? '/videos' : "/pricing"}>Videos</Link> : ""}
          {profiledata?.is_fighclub_active ? (
            <Link href="/forum">Fight Club</Link>
          ) : (
            <span>Fight Club Disable </span>
          )}
        </ul>


        <div className='flex justify-between gap-2'>
          {isLogin ? (
            <button
              onClick={Logout}
              className="hidden lg:block bg-signin py-2 px-8 rounded-tl-md rounded-tr-md text-md lg:text-sm rounded-bl-xl rounded-br-xl"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                href={"/login"}
                className="hidden lg:block bg-signin py-2 px-8 rounded-tl-md rounded-tr-md text-md lg:text-sm rounded-bl-xl rounded-br-xl"
              >
                Sign In
              </Link>
              <Link
                href={"/signup"}
                className="hidden lg:block bg-signin py-2 px-8 rounded-tl-md rounded-tr-md text-md lg:text-sm rounded-bl-xl rounded-br-xl"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
        <div className="lg:hidden ">
          <Sheet>
            <SheetTrigger asChild>
              <FiAlignRight size={35} />
            </SheetTrigger>
            <SheetContent className="text-white z-[99999] bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10  border-l border-gray-100">
              <SheetHeader>
                <SheetTitle className="text-4xl font-saira">
                  Mistress Wife
                </SheetTitle>
                <div className="flex flex-col justify-evenly mt-14 items-center py-4 text-lg h-[50vh]">
                  <SheetDescription className="flex flex-col items-center gap-4">
                    <SheetClose asChild>
                      <Link href={"/"}> About Us</Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href={"/"}> Contact Us</Link>
                    </SheetClose>

                    <SheetClose asChild>
                      <Link href={"/"}> Faq</Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href={"/"}> Testimonals</Link>
                    </SheetClose>
                    <SheetClose asChild>
                      {token !== null ? <Link href={profiledata?.is_active_subscriber ? '/videos' : "/pricing"}> Videos</Link> : ""}
                    </SheetClose>
                    {!profiledata?.is_active_subscriber ?
                      <SheetClose asChild>
                        <Link href={"/pricing"}> Paywal to purchase course</Link>
                      </SheetClose> : ""}
                    <SheetClose asChild>
                      <Link href={"/forum"}> Forum</Link>
                    </SheetClose>

                    <SheetClose asChild>
                      <Link href={"/login"}> Sign In</Link>
                    </SheetClose>
                  </SheetDescription>
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
