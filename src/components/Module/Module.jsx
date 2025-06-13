"use client";

import React, { useEffect, useState } from "react";
import {
  Home,
  User,
  BookOpen,
  Code2,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { getCourseModule } from "../../services/courseModuleServices";


const Module = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const courseId = useParams().id;;
console.log(courseId, 'courseId');
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
      <main className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading modules...</p>
      </main>
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
      <div className="flex-1 p-8 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {modules.map((module) => (
            <div key={module.id} className="bg-white rounded-lg p-8 shadow-md">
              <h2 className="text-2xl font-normal mb-4">{module.title}</h2>
              <p className="text-gray-600 w-[90%] leading-relaxed mb-6">
                {module.description}
              </p>
              <Link href={`/course-topics/${module.id}`}>
                <div className="flex items-center justify-center">
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
