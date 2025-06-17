import { MoreVertical, Upload, Eye } from "lucide-react";
import img1 from "../../../assets/img1.png";
import img2 from "../../../assets/img2.png";
import img3 from "../../../assets/img3.png";
import Image from "next/image";
import Link from "next/link";
const cards = [
  {
    title: "Send Meeting Links",
    icon: <Image src={img1} alt="Meeting" className="w-14 h-14" />,
    dropdown: true,
  },
  {
    title: "Chat",
    icon: <Image src={img2} alt="Chat" className="w-14 h-14" />,
  },
  {
    title: "Share Document",
    icon: <Image src={img3} alt="Share" className="w-14 h-14" />,
    dropdown: true,
  },
];

export default function AppointmentActions() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl mt-6 font-bold text-[#71a587] mb-10">
        Appointment
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="relative z-50 h-[306px] bg-white width: 365;
             top: 235px;
             left: 1138px;
             border-radius: 22.48px;
              rounded-2xl shadow-xl w-full max-w-xs mx-auto"
          >
            {/* Top green half */}
            <div className="bg-[#5AAA7C] h-36 rounded-t-xl flex justify-center items-center relative">
              {/* White avatar bubble */}
              <div className="bg-white w-28 h-28 rounded-full flex items-center justify-center shadow-lg border-4 border-white absolute -bottom-12">
                {card.icon}
              </div>

              {/* Dropdown menu trigger */}
              {card.dropdown && (
                <div className="absolute top-4 right-4 group">
                  <MoreVertical
                    className="text-white cursor-pointer"
                    size={20}
                  />

                  <div className="absolute right-0 mt-0 hidden group-hover:block bg-white rounded-lg shadow-lg text-sm text-gray-700 z-10 w-40">
                    {card.title === "Send Meeting Links" ? (
                      <Link
                        href="/meetings"
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                      >
                        <Eye size={16} /> View
                      </Link>
                    ) : (
                      <Link href="/documents">
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                        <Eye size={16} /> View
                      </button>
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom half */}
            <div className="pt-16 pb-6 px-6 text-center">
            <Link href={card.title === "Share Document" ? "/documents": card.title === "Send Meeting Links" ?"/meetings":"/"} >
              <button className="bg-[#5AAA7C] hover:bg-[#46996a] mt-[23px] text-white font-medium py-2 px-4 rounded-full transition">
                {card.title}
              </button>
            </Link>
            </div>

            {/* Pointer/triangle */}
            <div className="absolute  bottom-[-12px] left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white rotate-45 "></div>
          </div>
        ))}
      </div>
    </div>
  );
}
