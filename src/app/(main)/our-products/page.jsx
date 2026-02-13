"use client";

import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const ResourcesSection = () => {
  const [resources, setResources] = useState([]);

  const cardVariant = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        type: "spring",
        stiffness: 120,
      },
    }),
    hover: { scale: 1.05, y: -5, transition: { type: "spring", stiffness: 300 } },
  };

  const iconVariant = {
    hover: { scale: 1.2, rotate: [0, 10, -10, 0], transition: { duration: 0.6 } },
  };

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await axiosInstance.get("user/user_profile/resource_view/");
        if (res.data?.status && Array.isArray(res.data.data)) {
          // ✅ Filter out "Reference Material" and "General Resource"
          const filtered = res.data.data.filter(
            (r) =>
              r.name?.toLowerCase() !== "reference material" &&
              r.name?.toLowerCase() !== "general resource"
          );
          setResources(filtered);
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
    <>
       <h2 className="text-2xl font-marko sm:text-5xl md:text-center  mt-16 ">
Our Products        </h2>
    <div className="min-h-screen bg-white flex flex-wrap justify-center items-center ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 max-w-7xl mt-28 md:-mt-32">
        {resources.map((resource, index) => {
          const title = resource.name?.trim() || `Resource ${index + 1}`;
          const icon = resource.icon;
          const href = resource.url_route ? `/${resource.url_route}` : "#";

          return (
            <Link key={index} href={href}>
              <motion.div
                className="flex items-center justify-center flex-col cursor-pointer border bg-[#CFE0D6] border-gray-200 px-1 w-[366px] py-4 rounded-2xl shadow-sm"
                variants={cardVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index}
                whileHover="hover"
              >
                <motion.div
                  className="mb-4 h-[100px] w-[100px] flex items-center justify-center"
                  variants={iconVariant}
                >
                  <Image
                    src={icon}
                    alt={title}
                    width={80}
                    height={80}
                    className="rounded-md"
                  />
                </motion.div>
                <h3 className="font-semibold text-center text-[19px] text-gray-800 mb-2">
                  {title}
                </h3>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
    </>
  );
};

export default ResourcesSection;
