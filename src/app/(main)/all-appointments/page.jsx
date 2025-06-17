import {
  CheckCircle,
  XCircle,
  RefreshCw,
  Loader,
} from "lucide-react";
import Link from "next/link";

const statuses = [
  {
    type: "confirmed",
    icon: (
      <div className="bg-green-600 p-2 rounded-full shadow-lg">
        <CheckCircle className="text-white" size={20} />
      </div>
    ),
  },
  {
    type: "cancelled",
    icon: (
      <div className="bg-red-600 p-2 rounded-full shadow-lg">
        <XCircle className="text-white" size={20} />
      </div>
    ),
  },
  {
    type: "loading",
    icon: (
      <div className="bg-yellow-300 p-2 rounded-full shadow-lg animate-spin">
        <Loader className="text-white" size={20} />
      </div>
    ),
  },
  {
    type: "reschedule",
    icon: (
      <div className="bg-blue-500 p-2 rounded-full shadow-lg animate-spin">
        <RefreshCw className="text-white" size={20} />
      </div>
    ),
  },
];

const AppointmentCard = ({ status }) => {
  return (
    <div className="relative bg-gradient-to-br from-[#5AAA7C]/90 to-[#367f5d]/90 rounded-3xl px-6 py-12 w-full sm:w-[363px] text-white text-center  shadow-2xl hover:scale-105 transition-transform duration-300">
       <Link className="flex" href="/appointment">
      {/* Profile Image */}
      <div className="absolute -top-14 left-1/2 transform -translate-x-1/2">
        <img
          src="https://randomuser.me/api/portraits/men/75.jpg"
          alt="Profile"
          className="w-28 h-28 rounded-full border-4 border-white object-cover shadow-lg"
        />
      </div>

      {/* Status Icon */}
      <div className="absolute top-4 right-4">{status.icon}</div>

      {/* Text Content */}
      <div className="pt-8 space-y-1">
        <h3 className="font-bold text-xl tracking-wide">Muhammad Zawwar</h3>
        <p className="text-sm text-white/90">Email: muhammadzawwar@gmail.com</p>
      </div>
      </Link>
    </div>
  );
};

export default function AppointmentCards() {
  return (
    <div className="max-w-6xl mx-auto px-6 mt-8 py-12">
            <h2 className="text-3xl mt-6  font-bold text-[#71a587] mb-20">All Appointments</h2>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3  gap-16">
        {statuses.map((status, index) => (
          <AppointmentCard key={index} status={status} />
        ))}
      </div>
    </div>
  );
}
