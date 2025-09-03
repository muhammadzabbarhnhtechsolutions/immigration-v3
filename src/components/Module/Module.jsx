"use client";

import React, { useEffect, useState } from "react";
import {
  Home,
  User,
  BookOpen,
  Code2,
  BarChart3,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { getCourseModule } from "../../services/courseModuleServices";

const Module = () => {
  const router = useRouter();
  const courseId = useParams().id;

  const [modules, setModules] = useState([]);
  const [filteredModules, setFilteredModules] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchModules = async () => {
      if (!courseId) return;
      const res = await getCourseModule(router, courseId);
      if (res?.data) {
        setModules(res.data);
        setFilteredModules(res.data);
      }
      setLoading(false);
    };
    fetchModules();
  }, []);

  // 🔍 search handler
  const handleSearch = (e) => {
    const q = e.target.value.toLowerCase();
    setSearchQuery(q);
    setFilteredModules(
      modules.filter((m) => m.title.toLowerCase().includes(q))
    );
  };

  const iconClasses = "w-5 h-5 text-white mb-1";
  const textClasses = "text-xs text-white";

  if (loading) {
    return (
      <div className="mx-auto px-4 mt-0 py-20 text-center flex flex-col items-center justify-center gap-4">
        <div className="h-10 w-10 border-4 border-[#88B29A] border-t-transparent rounded-full animate-spin" />
        <p className="text-[#88B29A] text-lg font-medium">Loading modules...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      {/* ── Backdrop (mobile) ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`fixed md:relative inset-y-0 left-0 z-40 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } w-60 md:w-[80px] bg-[#88B29A] p-4 flex flex-col gap-6 pt-24 items-center transition-transform duration-300 ease-in-out`}
      >
        {/* Close btn (mobile) */}
        <button
          className="md:hidden absolute top-4 right-4 text-white"
          onClick={() => setSidebarOpen(false)}
        >
          <X className="w-6 h-6" />
        </button>

        {[Home, User, BookOpen, Code2, BarChart3].map((Icon, i) => (
          <div
            key={i}
            className="flex flex-col items-center cursor-pointer hover:scale-110 transition"
          >
            <Icon className={iconClasses} />
            <span className={textClasses}>
              {["Home", "Profile", "Lessons", "Practice", "Progress"][i]}
            </span>
          </div>
        ))}
      </aside>

      {/* ── Hamburger (mobile) ── */}
      <button
        className="fixed top-4 left-4 p-2 bg-white rounded-full shadow-md md:hidden z-20"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu className="w-5 h-5 text-[#88B29A]" />
      </button>

      {/* ── Main ── */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 mt-12 md:mt-10">
        {/* Heading + search */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#88B29A]">
            Course Modules
          </h1>

          {/* Search bar */}
          <div className="relative w-full sm:w-96">
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
              placeholder="Search modules..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl shadow-sm focus:ring-1 focus:border-[#88B29A] focus:ring-[#88B29A]  focus:outline-none transition"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {filteredModules.length ? (
            filteredModules.map((m) => (
              <div
                key={m.id}
                className="relative bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200 hover:shadow-xl transition hover:scale-[1.01] flex flex-col justify-between"
              >
                {/* Circle */}
                <div className="absolute top-4 right-4">
                  <div className="relative w-12 h-12">
                    <svg
                      className="w-full h-full transform -rotate-90"
                      viewBox="0 0 40 40"
                    >
                      <circle
                        cx="20"
                        cy="20"
                        r="16"
                        stroke="#e5e7eb"
                        strokeWidth="4"
                        fill="none"
                      />
                      <circle
                        cx="20"
                        cy="20"
                        r="16"
                        stroke="#88B29A"
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray={2 * Math.PI * 16}
                        strokeDashoffset={
                          2 * Math.PI * 16 * (1 - m.percentage / 100)
                        }
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-[#88B29A]">
                      {Math.round(m.percentage)}%
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
                    {m.title}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {m.description.length > 160
                      ? m.description.slice(0, 360) + "..."
                      : m.description}
                  </p>
                </div>

                {/* Button */}
                <Link href={`/course-topics/${m.id}`} className="mt-6">
                  <button className="w-full bg-[#88B29A] text-white px-4 py-3 rounded-xl hover:bg-[#88B29A] transition text-sm font-medium">
                    CONTINUE
                  </button>
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center text-center mt-10 text-gray-500">
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
                No modules found
              </p>
              <p className="text-sm text-gray-400">
                Try searching with a different keyword.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Module;
