
import Image from "next/image";
import icon1 from "../../../assets/meeting.png"
import icon2 from "../../../assets/meeting1.png"
const meetings = [
  { platform: "google", date: "15-06-2025", time: "08:35:53" },
  { platform: "zoom", date: "15-06-2025", time: "08:35:53" },
  { platform: "google", date: "15-06-2025", time: "08:35:53" },
  { platform: "google", date: "15-06-2025", time: "08:35:53" },
  { platform: "zoom", date: "15-06-2025", time: "08:35:53" },
  { platform: "google", date: "15-06-2025", time: "08:35:53" },
  { platform: "google", date: "15-06-2025", time: "08:35:53" },
  { platform: "zoom", date: "15-06-2025", time: "08:35:53" },
  { platform: "google", date: "15-06-2025", time: "08:35:53" },
];

const platformIcons = {
  google: icon1,
  zoom: icon2,
};

export default function MeetingCards() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl mt-6 font-bold text-[#71a587] mb-10">Meetings</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-8">
        {meetings.map((meeting, index) => (
          <div
            className="bg-[#5AAA7C] cursor-pointer shadow-xl relative hover:scale-105 transition-transform duration-300 rounded-2xl px-6 py-8 text-white text-center relative shadow-md"
          >
            {/* Platform Icon */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white w-24 h-24 rounded-full flex items-center justify-center shadow-md border-4 p-4 border-white">
              <Image
                src={platformIcons[meeting.platform]}
                alt="platform"
                className="w-26 h-26 object-cover"
              />
            </div>

            {/* Meeting Info */}
            <div className="pt-12 flex justify-between flex-row">
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
        ))}
      </div>
    </div>
  );
}