"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import icon2 from "../../../../../assets/meeting.png";
import icon1 from "../../../../../assets/meeting1.png";
import { useSearchParams } from "next/navigation";
import { getAllMeetingDetails, getMeetingDetails } from "../../../../../services/getAllMeetings.js";
import Link from "next/link";

const platformIcons = {
  google: icon2,
  zoom: icon1,
};

export default function MeetingCards() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const appointmentId = searchParams.get("appointment_id");
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const data = await getMeetingDetails(appointmentId, type);
      setMeetings(data);
      console.log("Fetched data:", data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };
  

  const fetchDataAll = async () => {
    try {
      const data = await getAllMeetingDetails(appointmentId);
      setMeetings(data);
      console.log("Fetched data:", data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (appointmentId && type) {
            setLoading(false);
      fetchData();
    }
  }, [appointmentId, type]);
  useEffect(() => {
    if (appointmentId && !type) {
          setLoading(false);
    fetchDataAll()
    }
  }, [])
  // ...
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl mt-6 font-bold text-[#3D61AB] mb-10">Meetings</h2>

      {loading ? (
        <div className="mx-auto bg-[#ebf0ed] px-4 mt-0 py-20 text-center flex flex-col items-center justify-center gap-4 animate-fade-in">
          {/* Spinner */}
          <div className="h-10 w-10 border-4 border-[#3D61AB] border-t-transparent rounded-full animate-spin"></div>

          {/* Text */}
          <p className="text-[#3D61AB] text-lg font-medium">Loading ...</p>
        </div>
      ) : meetings.length === 0 ? (
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
          <p className="text-lg font-semibold">No meetings found</p>
          <span className="text-sm text-red-400">
            You don’t have any meetings scheduled yet.
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-8">
          {meetings.map((meeting, index) => (
            <Link href={meeting.link} key={meeting.id || index} target="_blank">
              <div className="bg-[#3D61AB] cursor-pointer shadow-xl relative hover:scale-105 transition-transform duration-300 rounded-2xl px-6 py-8 text-white text-center">
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white w-24 h-24 rounded-full flex items-center justify-center shadow-md border-4 p-4 border-white">
                  <Image
                    src={meeting.type === 1 ? icon1 : icon2} // ✅ proper conditional logic
                    alt={meeting?.platform}
                    className="w-26 h-26 object-cover"
                  />
                </div>

                <div className="pt-12 flex justify-between">
                  <div>
                    <p className="text-base font-medium">DATE</p>
                    <p className="font-medium mb-2">{meeting.date}</p>
                  </div>
                  <div>
                    <p className="text-base font-medium">TIME</p>
                    <p className="font-medium">{meeting.time}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
