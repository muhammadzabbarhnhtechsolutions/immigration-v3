"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { MoreVertical, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Icons
import img1 from "../../../../assets/img1.png";
import img2 from "../../../../assets/img2.png";
import img3 from "../../../../assets/img3.png";
import img4 from "../../../../assets/meeting.png";
import img5 from "../../../../assets/meeting1.png";

import FileUploadBox from "./FileUploadBox";

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
    title: "Upload Document",
    icon: <Image src={img3} alt="Share" className="w-14 h-14" />,
    dropdown: true,
  },
];

export default function AppointmentActions() {
  const searchParams = useSearchParams();
  const id = searchParams.get("appointment_id");
  const [showUpload, setShowUpload] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl mt-6 font-bold text-[#71a587] mb-10">
        Appointment
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="relative z-10 h-[306px] bg-white rounded-2xl shadow-xl w-full max-w-xs mx-auto"
          >
            {/* Top green half */}
            <div className="bg-[#5AAA7C] h-36 rounded-t-xl flex justify-center items-center relative">
              <div className="bg-white w-28 h-28 rounded-full flex items-center justify-center shadow-lg border-4 border-white absolute -bottom-12">
                {card.icon}
              </div>

              {/* Dropdown Menu */}
              {card.dropdown && (
                <div className="absolute top-4 right-4 group">
                  <MoreVertical
                    className="text-white cursor-pointer"
                    size={20}
                  />
                  <div className="absolute right-0 mt-0 hidden group-hover:block bg-white rounded-lg shadow-lg text-sm text-gray-700 z-10 w-44">
                    {card.title === "Send Meeting Links" ? (
                      <>
                        <Link
                          href={`/all-appointments/meetings/s?type=1&appointment_id=${id}`}
                          className="block cursor-pointer w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                        >
                          <Image src={img5} alt="Zoom" className="w-6 h-6" />
                          Zoom Meeting
                        </Link>
                        <Link
                          href={`/all-appointments/meetings/s?type=2&appointment_id=${id}`}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                        >
                          <Image src={img4} alt="Google" className="w-6 h-6" />
                          Google Meeting
                        </Link>
                      </>
                    ) : (
                      <Link href={`/documents/${id}`}>
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
              {card.title === "Upload Document" ? (
                <button
                  onClick={() => setShowUpload(true)}
                  className="bg-[#5AAA7C] hover:bg-[#46996a] mt-[23px] text-white font-medium py-2 px-4 rounded-full transition"
                >
                  {card.title}
                </button>
              ) : (
                <Link
                  href={card.title === "Send Meeting Links" ? "/meetings" : "/"}
                >
                  <button className="bg-[#5AAA7C] hover:bg-[#46996a] mt-[23px] text-white font-medium py-2 px-4 rounded-full transition">
                    {card.title}
                  </button>
                </Link>
              )}
            </div>

            {/* Pointer triangle */}
            <div className="absolute bottom-[-12px] left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white rotate-45"></div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed  pt-[282px] overflow-scroll inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-xl relative transform transition-all duration-500 ease-out animate-slide-down">
            <button
              onClick={() => setShowUpload(false)}
              className="absolute top-2 right-3 text-green-500 font-medium hover:text-red-500 text-2xl"
            >
              &times;
            </button>
            <FileUploadBox />
          </div>
        </div>
      )}
    </div>
  );
}
