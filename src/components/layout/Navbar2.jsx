import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Briefcase, LogOut, Menu, UserCircle2, X } from "lucide-react";
import logo from "../../assets/finnal logo.png";
import { useRouter } from "next/navigation";

export default function Navbar1() {
  const [isOpen, setIsOpen] = useState(false);
const [ checklogin,setcheckLogin ] = useState("");
  const [openLogout, setLogoutOpen] = useState(false);

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

  const router = useRouter();


  useEffect(() => {
    const userToken = localStorage.getItem("user");
    setcheckLogin(userToken);
  }, []);

  const Logout = () => {
    router.push("/login");
    // Remove tokens from storage
    localStorage.removeItem("user");
    localStorage.removeItem("course_id");
    Cookies.remove("access_token"); // Agar cookie use ho rahi hai

    // Redirect to login page
  };

        const hanldeShowLogoutButton = () => {
    setLogoutOpen(!openLogout);
  };
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
        {!checklogin ? (
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
        ):(
           <div className="relative">
                <button
                  onClick={hanldeShowLogoutButton}
                  className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full hover:ring-2 hover:ring-[#3D61AB] transition"
                >
                  <UserCircle2 className="w-7 h-7 text-gray-700" />
                </button>

                {openLogout && (
                  <div className="absolute -right-4 z-20 mt-3 py-1  w-44 rounded-lg bg-white shadow-lg ring-1 ring-gray-200">
                    {/* Logout always shown */}

                    {/* Business Account shown only if any package has package_type === 3 */}
                   
                      <Link href="/business-account">
                        <button onClick={()=>setLogoutOpen(!openLogout)} className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100               transition-all duration-200">
                          <Briefcase className="w-5 h-5 text-gray-600" />
                          Business Account
                        </button>
                      </Link>
                  
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
