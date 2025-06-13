"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCourses } from "../../services/courseServices";



export default function CoursePage() {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await getCourses(router);
      if (result?.data) {
        setCourses(result.data);
      }
      setLoading(false);
    };

    fetchCourses();
  }, [router]);

  if (loading) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading courses...</p>
      </main>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen px-4 py-24">
      <h2 className="text-3xl font-bold text-[#88ae98] text-left ml-12 mb-10">
        All Courses
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-10 max-w-7xl mx-12">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-xl hover:shadow-xl hover:-translate-y-4 hover:scale-100 transition-all cursor-pointer shadow-sm border border-gray-200 p-4"
          >
            {/* Thumbnail */}
            <div className="relative w-full h-40 rounded-md overflow-hidden mb-4">
              <Image
                src={course.thumbnail}
                alt={course.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {course.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-4">
              {course.description?.slice(0, 172)}...
            </p>

            {/* Button */}
            <Link href={`/course-module/${course.id}`}>
              <button className="w-full h-12 bg-[#6b967e] hover:bg-[#88AE98] text-white text-sm font-medium rounded-lg shadow">

                VIEW COURSE
              </button>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
