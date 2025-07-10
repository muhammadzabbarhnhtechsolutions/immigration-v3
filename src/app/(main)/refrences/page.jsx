import React from 'react';
import { Sun } from 'lucide-react';

import img1 from "../../../assets/icon02.png";
import img2 from "../../../assets/icon022.png";
import img3 from "../../../assets/icon023.png";
import img4 from "../../../assets/icon024.png";
import img5 from "../../../assets/icon025.png";
import img6 from "../../../assets/icon026.png";
import img7 from "../../../assets/icon027.png";
import img8 from "../../../assets/icon028.png";
import img9 from "../../../assets/icon029.png";
import Image from 'next/image';

const resources = [
  { title: "MCQS", icon: img1 },
  { title: "Reference Materials", icon: img2 },
  { title: "Courses Videos", icon: img3 },
  { title: "E-Book", icon: img4 },
  { title: "General Resources", icon: img5 },
  { title: "PodCast", icon: img6 },
  { title: "Blogs", icon: img7 },
  { title: "E-Book", icon: img8 },
  { title: "Articles", icon: img9 },
];

const ResourcesSection = () => {
  return (
    <div className="min-h-screen bg-white flex flex-wrap justify-center items-center pb-14 pt-24">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto md:mx-6">
        {resources.map((resource, index) => (
          <div
            key={index}
            className="bg-white border rounded-xl hover:-translate-y-2 cursor-pointer shadow hover:shadow-lg transition duration-300 p-6 flex flex-col items-center text-center"
          >
            <div className="w-24 h-24 bg-[#5AAA7CC9] rounded-full flex items-center justify-center mb-3">
              <Image
                src={resource.icon}
                alt={resource.title}
                className="w-14 h-14 object-contain"
              />
            </div>
            <span className="text-xl font-bold text-[#5AAA7CC9]">
              {resource.title}
            </span>
          </div>
        ))}
      </div>

      {/* Optional Theme Toggle Control */}
      <div className="fixed bottom-6 right-6 bg-black text-white rounded-full p-3 flex items-center justify-center shadow-md">
        <Sun size={18} />
        <div className="ml-2 w-24 h-2 bg-gray-600 rounded-full overflow-hidden">
          <div className="w-1/2 h-full bg-white rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesSection;
