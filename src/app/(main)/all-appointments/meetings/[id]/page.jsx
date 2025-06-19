"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import icon1 from "../../../../../assets/meeting.png";
import icon2 from "../../../../../assets/meeting1.png";
import { useSearchParams } from "next/navigation";
import {getMeetingDetails} from "../../../../../services/getAllMeetings.js";
import Link from "next/link";

  const platformIcons = {
    google: icon1,
    zoom: icon2,
  };

export default function MeetingCards() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const appointmentId = searchParams.get("appointment_id");

  console.log("type",type)
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    if (appointmentId) {
      fetchData();
    }
  }, [appointmentId, type]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl mt-6 font-bold text-[#71a587] mb-10">Meetings</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : meetings.length === 0 ? (
        <p className="text-center text-red-500">No meetings found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-8">
          {meetings.map((meeting, index) => (
            <Link href={meeting.link} key={meeting.id || index} target="_blank">
              <div
                className="bg-[#5AAA7C] cursor-pointer shadow-xl relative hover:scale-105 transition-transform duration-300 rounded-2xl px-6 py-8 text-white text-center"
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white w-24 h-24 rounded-full flex items-center justify-center shadow-md border-4 p-4 border-white">
                  <Image
                    src={platformIcons[meeting.type] === 1 ? icon2 : icon1}
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
