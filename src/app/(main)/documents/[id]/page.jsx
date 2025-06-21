"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getAppointmentDocuments } from "../../../../services/getAppointmentsDocuments";

const Page = () => {
  const appointmentId = useParams()?.id;
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [documentData, setDocumentData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAppointmentDocuments(router, appointmentId);
        if (data) setDocumentData(data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (appointmentId) fetchData();
  }, [appointmentId, router]);

  return (
    <div className="max-w-7xl mx-auto px-12 py-12 mt-8">
      <h2 className="text-3xl mt-12 font-bold text-[#8abd9f] mb-10 text-center">
        Appointment Documents
      </h2>

      {loading ? (
        <div className="mx-auto px-4 mt-8 py-20 text-center flex flex-col items-center justify-center gap-4 animate-fade-in">
          {/* Spinner */}
          <div className="h-10 w-10 border-4 border-[#88ae98] border-t-transparent rounded-full animate-spin"></div>

          {/* Text */}
          <p className="text-[#88ae98] text-xl font-medium">
            Loading Documents..
          </p>
        </div>
      ) : documentData?.data?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {documentData?.data.map((document, index) => (
            <a
              key={index}
              href={document.document}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border rounded-xl shadow-lg p-5 flex flex-col items-center justify-between transition-transform hover:scale-105 hover:shadow-xl"
            >
              <img
                src="https://img.icons8.com/color/96/000000/pdf.png"
                alt="PDF"
                className="w-16 h-16 mb-4"
              />
              <h3 className="text-lg font-semibold text-center text-gray-800 mb-2">
                {document.title}
              </h3>
              <p className="text-sm text-gray-500 text-center px-2">
                Click to view document
              </p>
            </a>
          ))}
        </div>
      ) : (
        <p className="text-center text-red-500 text-lg">No documents found.</p>
      )}
    </div>
  );
};

export default Page;
