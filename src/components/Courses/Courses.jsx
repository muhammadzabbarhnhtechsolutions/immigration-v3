"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCourses } from "../../services/courseServices";

export default function CoursePage() {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await getCourses(router);
      if (result?.data) {
        setCourses(result.data);
        setFilteredCourses(result.data); // Initialize filtered
      }
      setLoading(false);
    };

    fetchCourses();
  }, [router]);

  // 🔍 Handle Search
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = courses.filter((course) =>
      course.title.toLowerCase().includes(query)
    );
    setFilteredCourses(filtered);
  };

  if (loading) {
    return (
      <div className="mx-auto px-4 mt-0 py-20 text-center flex flex-col items-center justify-center gap-4 animate-fade-in">
        <div className="h-10 w-10 border-4 border-[#88B29A] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[#88B29A] text-lg font-medium">Loading courses...</p>
      </div>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen px-4 py-8 md:py-24">
      {/* Heading + Search */}
 <h3 className="text-2xl font-marko sm:text-5xl md:text-center  ">
          Courses
        </h3>
      <div className="flex flex-col sm:flex-row justify-end -mt-12 items-start sm:items-center gap-4 max-w-7xl md:mx-12 mb-10">
        {/* 🔍 Search Bar */}
        <div className="relative w-full  sm:w-96">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search courses..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 focus:ring-[#88B29A] rounded-xl shadow-sm  focus:ring-2 focus:outline-none focus:border-none  transition"
          />
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 mt-14 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-10 max-w-7xl md:mx-12">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white flex justify-between flex-col rounded-xl hover:shadow-xl hover:-translate-y-4 hover:scale-100 transition-all cursor-pointer shadow-sm border border-gray-200 p-4"
            ><div>
              <Link href={`/course-module/${course.id}?title=${course.title.split(" ").join("")}`}>
                <div className="relative w-full h-48 rounded-md overflow-hidden mb-4">
                  <Image
                    src={course.thumbnail}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </Link>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {course.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {course.description?.slice(0, 172)}...
              </p>
              </div>
              <div>
              <Link href={`/course-module/${course.id}`}>
                <button className="w-full h-12 bg-[#88B29A] hover:bg-[#88B29A] text-white text-sm font-medium rounded-lg shadow">
                  VIEW COURSE
                </button>
              </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center text-center mt-10 text-gray-500">
            <svg
              className="w-12 h-12 text-[#88B29A] mb-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12H9m12 0A9 9 0 113 12a9 9 0 0118 0z"
              />
            </svg>
            <p className="text-lg font-medium text-[#88B29A]">
              No courses found
            </p>
            <p className="text-sm text-gray-400">
              Try searching with a different keyword.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
