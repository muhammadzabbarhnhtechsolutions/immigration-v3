"use client";

import React, { useEffect, useState } from "react";
import { Home, User, BookOpen, Code2, BarChart3 } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { getCourseModule } from "../../services/courseModuleServices";

const Module = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const courseId = useParams().id;
  console.log(courseId, "courseId");
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModules = async () => {
      if (!courseId) return;
      const result = await getCourseModule(router, courseId);
      if (result?.data) {
        setModules(result.data);
      }
      setLoading(false);
    };

    fetchModules();
  }, []);

  const iconClasses = "w-5 h-5 text-white mb-1";
  const textClasses = "text-sm text-white";

  if (loading) {
    return (
      <div className="mx-auto bg-[#ebf0ed] px-4 mt-8 py-20 text-center flex flex-col items-center justify-center gap-4 animate-fade-in">
        {/* Spinner */}
        <div className="h-10 w-10 border-4 border-[#5bb180] border-t-transparent rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-[#5bb180] text-lg font-medium">
          Loading modules...
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-[80px] bg-[#5c967d] p-4 flex flex-col gap-6 pt-14 items-center">
        <div className="flex flex-col items-center cursor-pointer">
          <Home className={iconClasses} />
          <span className={textClasses}>Home</span>
        </div>
        <div className="flex flex-col items-center cursor-pointer">
          <User className={iconClasses} />
          <span className={textClasses}>Profile</span>
        </div>
        <div className="flex flex-col items-center cursor-pointer">
          <BookOpen className={iconClasses} />
          <span className={textClasses}>Lessons</span>
        </div>
        <div className="flex flex-col items-center cursor-pointer">
          <Code2 className={iconClasses} />
          <span className={textClasses}>Practice</span>
        </div>
        <div className="flex flex-col items-center cursor-pointer">
          <BarChart3 className={iconClasses} />
          <span className={textClasses}>Progress</span>
        </div>
      </div>

      {/* Main Content */}
      {/* .. */}
      <div className="flex-1 p-8 mt-8">
        <h1 className="text-3xl font-bold text-[#88AE98] mb-6">
          Course Modules
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
{modules.map((module) => (
  <div
    key={module.id}
    className="relative bg-white rounded-lg p-8 shadow-md h-full flex flex-col justify-between"
  >
    {/* Top-right small circular percentage */}
    <div className="absolute top-4 right-4">
      <div className="relative w-10 h-10">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="20"
            cy="20"
            r="16"
            stroke="#e5e7eb"
            strokeWidth="3"
            fill="none"
          />
          <circle
            cx="20"
            cy="20"
            r="16"
            stroke="#7EB69E"
            strokeWidth="3"
            fill="none"
            strokeDasharray={2 * Math.PI * 16}
            strokeDashoffset={
              2 * Math.PI * 16 * (1 - module.progress / 100)
            }
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-[13px] font-semibold text-[#7EB69E]">
          {module.progress}%
        </div>
      </div>
    </div>

    {/* Content */}
    <div>
      <h2 className="text-2xl font-normal mb-4">{module.title}</h2>
      <p className="text-gray-600 w-[90%] leading-relaxed mb-6">
        {module.description}
      </p>
    </div>

    {/* Continue Button */}
    <Link href={`/course-topics/${module.id}`}>
      <div className="flex items-center justify-center mt-auto">
        <button className="bg-[#7EB69E] text-white px-6 py-2.5 rounded hover:bg-[#6a9884] transition-colors">
          CONTINUE
        </button>
      </div>
    </Link>
  </div>
))}



        </div>
      </div>
    </div>
  );
};

export default Module;
