import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Briefcase, LogOut, Menu, PackageCheck, UserCircle2, X } from "lucide-react";
import logo from "../../assets/logo1.png";
import { useRouter } from "next/navigation";
import imgContact from "../../assets/contactIcon.png";
export default function Navbar1() {
  const [isOpen, setIsOpen] = useState(false);
  const [checklogin, setCheckLogin] = useState(false);
  const [openLogout, setLogoutOpen] = useState(false);

  const navLinks = [
    { href: "/about-us", label: "About Us" },
    { href: "/our-products", label: "Our Products" },
    { href: "/legal-advice", label: "Legal Advice" },
    { href: "/podcasts", label: "Podcast" },
    { href: "/forum", label: "Community" },
    { href: "/contact-us", label: "Contact Us" },
    { href: "/pricing", label: "Pricing" },

  ];

  const router = useRouter();
  // ....

  useEffect(() => {
    const userToken = localStorage.getItem("user");
    setCheckLogin(!!userToken); // Converts to true/false
  }, []);
  // ...

  const Logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    localStorage.removeItem("course_id");
    // Cookies.remove("access_token");
    setCheckLogin(false);
    router.push("/login");
  };

  const hanldeShowLogoutButton = () => {
    setLogoutOpen(!openLogout);
  };
  return (
    <nav className="w-full z-50 top-0 left-0  bg-white/90 backdrop-blur-md text-[#88B29A] shadow-md">
      <div className="container px-4 sm:px-6 flex justify-between items-center py-4">
        {/* Logo */}
        <Link href="/" className="">
          <Image
            src={logo}
            alt="logo"
            width={160} // Made bigger
            height={160} // Made bigger
            className="h-32 w-auto object-fill" // Adjusted height
          />
        </Link>

        {/* Desktop Menu */}
          {/* Desktop Menu */}
        <div className="hidden md:flex flex-col items-center space-y-2">
          <ul className="flex space-x-6 font-medium">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-[#6d9e82] text-[16.8px] font-[600] transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side Buttons */}
        {!checklogin ? (
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/signup" className="font-semibold hover:text-[#62af84]">
              Sign Up
            </Link>
            <Link href="/login">
              <button className="bg-[#F0F2F5] text-black px-5 py-2.5 rounded-xl hover:bg-gray-100 transition">
                Login
              </button>
            </Link>
            <Link
              href="#contact"
              className="flex items-center justify-center w-7 h-7 mt-2 transition"
            >
              <Image src={imgContact} alt="contact" className="w-7 h-7" />
            </Link>
          </div>
        )  : (
          // Agar login hai => Sirf profile icon + dropdown
         <div className=" flex gap-4 items-center">
  {/* User Avatar */}
  <button
    onClick={hanldeShowLogoutButton}
    className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full hover:ring-2 hover:ring-[#88B29A] hover:scale-105 transition-transform duration-300 shadow-sm"
  >
    <UserCircle2 className="w-7 h-7 text-gray-700" />
  </button>

  {/* Contact Icon */}
  <a
    href="#contact"
    className="flex items-center justify-center w-10 h-10  rounded-full hover:bg-[#f0fdf4] hover:scale-110 transition-transform duration-300 shadow-sm"
  >
    <Image
      src={imgContact}
      width={100}
      height={100}
      alt="contact"
      className="rounded-full p-0"
    />
  </a>

  {/* Dropdown Menu */}
{openLogout && (
  <div className="absolute right-0 top-[112px] w-56 rounded-lg bg-white shadow-2xl ring-1 ring-gray-200 z-50 mb-[133px]">

    {/* Dropdown Items */}
    <Link href="/business-account">
      <button
        onClick={() => setLogoutOpen(false)}
        className="flex w-full items-center gap-2 px-4 pt-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#2E7D32] transition-all duration-200 rounded-lg"
      >
        <Briefcase className="w-5 h-5 text-gray-600" />
        Business Account
      </button>
    </Link>

    <Link href="/subscriptions">
      <button
        onClick={() => setLogoutOpen(false)}
        className="flex w-full items-center gap-2 px-4 pt-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#2E7D32] transition-all duration-200 rounded-lg"
      >
        <PackageCheck className="w-5 h-5 text-gray-600" />
        My Subscription
      </button>
    </Link>

    <div className="border-t border-gray-200 my-1"></div>

    <button
      onClick={Logout}
      className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200 rounded-lg"
    >
      <LogOut className="w-4 h-4" />
      Logout
    </button>
  </div>
)}


</div>


        )}

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white text-[#88B29A] px-6 pt-4 pb-6 space-y-4 shadow-md animate-slideDown">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block hover:text-[#88B29A] transition"
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
