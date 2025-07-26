import Image from "next/image"
import Link from "next/link"
import logo from "../../assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-[#3D61AB]  text-white">
      <div className="container mx-auto px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Social Media */}
          <div className="flex flex-col items-start">
            <div className="mb-6">
             <Image className="bg-white"  src={logo} alt="Logo" width={133} height={123} />
            </div>
            <div className="mb-4 mt-2">
              <p className="font-semibold">Follow Us</p>
            </div>
            <div className="flex space-x-4">
              <Link href="#" className="bg-white rounded-full p-2 text-[#3D61AB]  hover:bg-[#3D61AB] hover:text-white transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </Link>
              <Link href="#" className="bg-white rounded-full p-2 text-[#3D61AB]  hover:bg-[#3D61AB] hover:text-white transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </Link>
              <Link href="#" className="bg-white rounded-full p-2 text-[#3D61AB] hover:bg-[#3D61AB] hover:text-white transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </Link>
              <Link href="#" className="bg-white rounded-full p-2 text-[#3D61AB]  hover:bg-[#3D61AB] hover:text-white transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3 text-base">
              <li>
                <Link href="#" className="hover:underline hover:text-black">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline hover:text-black">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline hover:text-black">
                  User Content Agreement
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline hover:text-black">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline hover:text-black">
                  Cookies Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline hover:text-black">
                  CPR Reforms
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline hover:text-black">
                  GDPR Compliance
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Contact Us</h3>
            <div className="space-y-3">
              <div>
                <p className="font-semibold">Address:</p>
                <p>Level 17 Dashwood House, 69 Old Broad</p>
                <p>Street London EC2M1QS</p>
              </div>
              <div>
                <p className="font-semibold">Tel:</p>
                <p>07578979789</p>
              </div>
              <div>
                <p className="font-semibold">Email:</p>
                <p>info@healthcarenavigator.co.uk</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white py-2 bg-white text-black font-sans">
        <div className="container mx-auto px-4 ">
          <p className="text-center text-sm">Copyright © 2025 immigrationnavigator - All rights reserved
          </p>
        </div>
      </div>
    </footer>
  )
}
