"use client";

import React from "react";
import { Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import img1 from "../../../assets/icon02.png";
import img2 from "../../../assets/icon022.png";
import img3 from "../../../assets/icon023.png";
import img4 from "../../../assets/icon024.png";
import img5 from "../../../assets/icon025.png";
import img6 from "../../../assets/icon026.png";
import img7 from "../../../assets/icon027.png";
import img8 from "../../../assets/icon028.png";
import img9 from "../../../assets/icon029.png";

const resourceLinks = {
  "E-book": "/e-book",
  "General Resources": "/course-topics/resources",
  "Courses Videos": "/courses",
  "Reference Materials": "/refrence-material",
  "Forums": "/forum",
  "Blogs": "/blogs",
  "Articles": "/article",
  "Create Blog": "/article/create",
  "Videos": "/videos",
  "Courses": "/courses",
  "PodCast": "/podcast",
  "MCQS": "#",
};

const resources = [
  { title: "MCQS", icon: img1 },
  { title: "Reference Materials", icon: img2 },
  { title: "Courses Videos", icon: img3 },
  { title: "E-book", icon: img4 },
  { title: "General Resources", icon: img5 },
  { title: "PodCast", icon: img6 },
  { title: "Blogs", icon: img7 },
  { title: "E-book", icon: img8 },
  { title: "Articles", icon: img9 },
];

const ResourcesSection = () => {
  return (
    <div className="min-h-screen bg-white flex flex-wrap justify-center items-center pb-14 pt-24">
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto md:mx-6">
        {resources.map((resource, index) => {
          // Normalize title
          const title = resource.title.trim();
          const href = resourceLinks[title] || "#";

          return (
            <Link
              key={index}
              href={href}
              className="bg-white border rounded-xl hover:-translate-y-2 cursor-pointer shadow hover:shadow-lg transition duration-300 p-6 flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 bg-[#5AAA7CC9] rounded-full flex items-center justify-center mb-3">
                <Image
                  src={resource.icon}
                  alt={title}
                  className="w-14 h-14 object-contain"
                />
              </div>
              <span className="text-xl font-bold text-[#5AAA7CC9]">
                {title}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ResourcesSection;
