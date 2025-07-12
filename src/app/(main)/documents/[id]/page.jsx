"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getAppointmentDocuments } from "../../../../services/getAppointmentsDocuments";

const Page = () => {
  const appointmentId = useParams()?.id;
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [documentData, setDocumentData] = useState([]);
  const [activeTab, setActiveTab] = useState("all"); // 'all' or 'your'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAppointmentDocuments(router, appointmentId);
        if (data?.data) setDocumentData(data.data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (appointmentId) fetchData();
  }, [appointmentId, router]);

  // Filtered data based on tab
  const filteredDocuments =
    activeTab === "your"
      ? documentData.filter((doc) => doc.type === 2)
      : documentData;

  return (
    <div className="max-w-7xl mx-auto px-12 py-12 mt-8">
      <h2 className="text-3xl mt-12 font-bold text-[#8abd9f] mb-10 text-center">
        Appointment Documents
      </h2>

      {/* Tabs */}
      <div className="flex justify-center gap-6 mb-8">
        <button
          className={`px-6 py-2 rounded-full font-medium border ${
            activeTab === "all"
              ? "bg-[#8abd9f] text-white"
              : "border-[#8abd9f] text-[#8abd9f]"
          }`}
          onClick={() => setActiveTab("all")}
        >
          All Documents
        </button>
        <button
          className={`px-6 py-2 rounded-full font-medium border ${
            activeTab === "your"
              ? "bg-[#8abd9f] text-white"
              : "border-[#8abd9f] text-[#8abd9f]"
          }`}
          onClick={() => setActiveTab("your")}
        >
          Your Documents
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="mx-auto px-4 mt-8 py-20 text-center flex flex-col items-center justify-center gap-4 animate-fade-in">
          <div className="h-10 w-10 border-4 border-[#88ae98] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#88ae98] text-xl font-medium">Loading Documents..</p>
        </div>
      ) : filteredDocuments.length > 0 ? (
        <div className="flex justify-center items-start gap-6">
  {filteredDocuments.map((document, index) => (
 <a
  key={index}
  href={document.document}
  target="_blank"
  rel="noopener noreferrer"
  className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl shadow-md hover:shadow-2xl transform hover:scale-[1] transition-all duration-300 p-4 sm:p-5 flex items-center gap-4  px-22 "
>
  {/* Icon Circle */}
  <div className="min-w-[62px] min-h-[60px] sm:min-w-[72px] sm:min-h-[72px] rounded-full bg-[#E6F4EA] flex items-center justify-center shadow-inner">
   {document.type === 1 ? (
     <img
       src="https://img.icons8.com/color/96/000000/pdf.png"
       alt="PDF"
       className="w-8 h-8 sm:w-10 sm:h-10"
     />
   ) :(
    <img
      src="https://cdn1.iconfinder.com/data/icons/application-file-formats/128/microsoft-word-512.png"
      alt="PDF"
      className="w-8 h-8 sm:w-10 sm:h-10"
    />
   )}

      
  </div>

  {/* Text Content */}
  <div className="flex-1">
    <h3 className="text-sm sm:text-base font-bold text-gray-800 mb-1 line-clamp-1">
      {document.title}
    </h3>
    <p className="text-xs sm:text-sm text-gray-500">Click to view document</p>
  </div>
</a>

  ))}
</div>

      ) : (
        <div className="flex flex-col items-center justify-center text-center mt-10 bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-xl shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 mb-2 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M12 3.75c-4.56 0-8.25 3.69-8.25 8.25s3.69 8.25 8.25 8.25 8.25-3.69 8.25-8.25S16.56 3.75 12 3.75z"
            />
          </svg>
          <p className="text-lg font-semibold">No Documents found</p>
          <span className="text-sm text-red-400">
            You don’t have any Documents yet.
          </span>
        </div>
      )}
    </div>
  );
};

export default Page;
