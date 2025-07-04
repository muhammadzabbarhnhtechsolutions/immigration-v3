"use client";

import React, { useEffect, useState } from "react";
import { Home, User, BookOpen, Code2, BarChart3 ,Menu,
  X,} from "lucide-react";
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
  const [openSidebar, setOpenSidebar] = useState(false);

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
  <div className="flex min-h-screen bg-gray-100 relative">
      {/* ─── Backdrop for mobile ─── */}
      {openSidebar && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setOpenSidebar(false)}
        />
      )}

      {/* ─── Sidebar ─── */}
      <aside
        className={`fixed hidden md:flex md:relative inset-y-0 left-0 z-40 transform ${
          openSidebar ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } w-64 md:w-[80px] bg-[#5c967d] p-4 flex md:flex-col gap-6 items-center md:items-center transition-transform duration-300 ease-in-out`}
      >
        {/* Close btn (mobile) */}
        <button
          className="md:hidden mb-4 ml-auto text-white"
          onClick={() => setOpenSidebar(false)}
        >
          <X className="w-6 h-6" />
        </button>

        {[
          { icon: Home, label: "Home" },
          { icon: User, label: "Profile" },
          { icon: BookOpen, label: "Lessons" },
          { icon: Code2, label: "Practice" },
          { icon: BarChart3, label: "Progress" },
        ].map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex flex-col items-center cursor-pointer hover:scale-110 transition"
          >
            <Icon className={iconClasses} />
            <span className={textClasses}>{label}</span>
          </div>
        ))}
      </aside>

      {/* ─── Hamburger (mobile only) ─── */}
      <button
        className="fixed top-4 left-4 z-20 md:hidden p-2 bg-white rounded-full shadow-lg"
        onClick={() => setOpenSidebar(true)}
      >
        <Menu className="w-5 h-5 text-[#5c967d]" />
      </button>

      {/* ─── Main Content ─── */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 mt-12 md:mt-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#88AE98] mb-6">
          Course Modules
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {modules.map((module) => (
            <div
              key={module.id}
              className="relative bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200 hover:shadow-xl transition hover:scale-[1.01] flex flex-col justify-between"
            >
              {/* Progress Circle */}
              <div className="absolute top-4 right-4">
                {/* …circle SVG exactly as before… */}
              </div>

              {/* Content */}
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
                  {module.title}
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {module.description.length > 160
                    ? module.description.slice(0, 360) + "..."
                    : module.description}
                </p>
              </div>

              {/* Button */}
              <Link href={`/course-topics/${module.id}`} className="mt-6">
                <button className="w-full bg-[#7EB69E] text-white px-4 py-3 rounded-xl hover:bg-[#6a9884] transition font-medium text-sm tracking-wide">
                  CONTINUE
                </button>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Module;
