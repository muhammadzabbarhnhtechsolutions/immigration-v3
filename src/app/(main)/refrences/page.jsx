"use client";

import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance"; // Make sure it's correctly set up
import Image from "next/image";
import Link from "next/link";

const ResourcesSection = () => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await axiosInstance.get("user/user_profile/resource_view/");
        if (res.data?.status && Array.isArray(res.data.data)) {
          setResources(res.data.data);
        } else {
          console.error("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };

    fetchResources();
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-wrap justify-center items-center pb-14 pt-24">
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto md:mx-6">
        {resources.map((resource, index) => {
          const title = resource.name?.trim() || `Resource ${index + 1}`;
          const icon = resource.icon;
          const href = resource.url_route ? `/${resource.url_route}` : "#";

          return (
            <Link
              key={index}
              href={href}
              className="bg-white border rounded-xl hover:-translate-y-2 cursor-pointer shadow hover:shadow-lg transition duration-300 p-6 flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 bg-[#5AAA7CC9] rounded-full flex items-center justify-center mb-3 overflow-hidden">
                {/* External images need width/height */}
                <Image
                  src={icon}
                  alt={title}
                  width={56}
                  height={56}
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold text-[#5AAA7CC9]">{title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ResourcesSection;
