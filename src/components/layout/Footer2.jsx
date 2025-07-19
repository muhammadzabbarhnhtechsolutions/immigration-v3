
import Image from "next/image";
import logo from "../../assets/logo2.0.png";
const Footer2 = () => {
  return (
    <footer className="bg-gradient-to-r from-[#2B4570] to-[#3D61AB] py-12 px-24 text-white">
        <div className="max-w-7xl  px-2 flex flex-row gap-8 text-base">
          {/* Logo Section */}

          <div className="md:w-[324px]">
            <Image
              src={logo}
              alt="Logo"
              className="w-24 md:-mt-4 h-24 object-cover"
            />
            <p className="text-gray-200 mt-4 leading-relaxed">
              Your Global Journey Starts Here <br />
              Trusted Visa Experts{" "}
            </p>{" "}
            <p className="text-gray-200 font-bold mt-4 leading-relaxed">
              Follow Us{" "}
            </p>
            <div className="flex gap-3 mt-4">
              <a className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-[#3D61AB] hover:bg-[#2B4570] hover:text-white transition-all">
                <FaFacebookF />
              </a>
              <a className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-[#3D61AB] hover:bg-[#2B4570] hover:text-white transition-all">
                <FaTwitter />
              </a>
              <a className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-[#3D61AB] hover:bg-[#2B4570] hover:text-white transition-all">
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Contact Us */}
          <div className="space-y-2 md:w-[488px]">
            <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
            <p className="text-gray-200">
              <p className="font-semibold">Address:</p>
              Level 17 Dashwood House, 69 Old Broad Street London EC2M1QS
            </p>
            <p className="text-gray-200">
              <p className="font-semibold">Tel:</p>
              07578979789
            </p>
            <p className="text-gray-200">
              <p className="font-semibold">Email:</p>
              info@healthcarenavigator.co.uk
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-gray-200">
              <li className="hover:text-white cursor-pointer transition">
                Home
              </li>
              <li className="hover:text-white cursor-pointer transition">
                Courses
              </li>
              <li className="hover:text-white cursor-pointer transition">
                About
              </li>
              <li className="hover:text-white cursor-pointer transition">
                Contact
              </li> <li className="hover:text-white cursor-pointer transition">
                Resources
              </li><li className="hover:text-white cursor-pointer transition">
                Forums
              </li>
            </ul>
          </div>

          {/* Newsletter */}
        </div>

        <div className="text-center mt-10 text-gray-300 text-sm border-t border-gray-500 pt-4">
          © 2025 Immigration Navigator. All Rights Reserved.
        </div>
      </footer>
  )
}

export default Footer2
