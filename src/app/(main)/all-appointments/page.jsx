"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getAppointments } from "../../../services/getAllAppointments";
import { CheckCircle, Loader, RefreshCw, XCircle } from "lucide-react";

// Function to return icon based on status
const getStatusIcon = (status) => {
  switch (status) {
    case 1: // PROCESS
      return (
        <div className="bg-yellow-400 p-2 rounded-full shadow-lg">
          <Loader className="text-white" size={20} />
        </div>
      );
    case 2: // PROCESSING
      return (
        <div className="bg-blue-500 p-2 rounded-full shadow-lg animate-spin">
          <RefreshCw className="text-white" size={20} />
        </div>
      );
    case 3: // COMPLETE
      return (
        <div className="bg-green-600 p-2 rounded-full shadow-lg">
          <CheckCircle className="text-white" size={20} />
        </div>
      );
    case 4: // UNCOMPLETE
      return (
        <div className="bg-red-600 p-2 rounded-full shadow-lg">
          <XCircle className="text-white" size={20} />
        </div>
      );
    default:
      return (
        <div className="bg-gray-400 p-2 rounded-full shadow-lg">
          <Loader className="text-white" size={20} />
        </div>
      );
  }
};

// Appointment Card Component
const AppointmentCard = ({ appointment }) => {
  const icon = getStatusIcon(appointment.status);

  return (
    <>
   
      <Link  className="flex"
        href={`/all-appointments/data?appointment_id=${appointment.appointment_id}`}
      >
    <div className="relative bg-gradient-to-br from-[#5AAA7C]/90 to-[#367f5d]/90 rounded-3xl px-6 py-12 w-full sm:w-[363px] text-white text-center shadow-2xl hover:scale-105 transition-transform duration-300">
      
        {/* Profile Image */}
        <div className="absolute -top-14 left-1/2 transform -translate-x-1/2">
          <img
            src={
              appointment.profile ||
              "https://randomuser.me/api/portraits/men/75.jpg"
            }
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-white object-cover shadow-lg"
          />
        </div>

        {/* Status Icon */}
        <div className="absolute top-4 right-4">{icon}</div>
        {/* Text Content */}
        <div className="pt-8 flex justify-center items-center flex-col ml-4 space-y-1">
          <h3 className="font-bold text-xl tracking-wide">
            {appointment.name}
          </h3>
          <p className="text-sm items-center text-white/90">
            Email: {appointment.email}
          </p>
        </div>
    </div>
      </Link>
       </>
  );
};

// Main Component
export default function AppointmentCards() {
  const [appointments, setAppointments] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAppointments(router);
      if (data?.data) {
        setAppointments(data.data);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 mt-8 py-12">
      <h2 className="text-3xl mt-6 font-bold text-[#71a587] mb-20">
        All Appointments
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-16">
        {appointments.map((appointment, index) => (
          <AppointmentCard key={index} appointment={appointment} />
        ))}
      </div>
    </div>
  );
}
