"use client";

import React, { useEffect, useState } from "react";
import {
  VideoIcon,
  Home,
  User,
  BookOpen,
  Code2,
  BarChart3,
  X,
  MoveLeftIcon,
} from "lucide-react";
import { FaAngleDown } from "react-icons/fa";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { getCourseModuleVideo } from "../services/courseVideoService"; // adjust path as needed

// ================== Sidebar Icons ===================
const SidebarIcons = ({ toggleSidebar }) => {
  const iconClasses = "w-5 h-5 text-white mb-1";
  const textClasses = "text-xs text-white";

  return (
    <div className="w-[80px] bg-[#5c967d] p-4 flex flex-col gap-6 pt-14 items-center">
      <div className="flex flex-col items-center cursor-pointer">
        <Home className={iconClasses} />
        <span className={textClasses}>Home</span>
      </div>
      <div className="flex flex-col items-center cursor-pointer">
        <User className={iconClasses} />
        <span className={textClasses}>Profile</span>
      </div>
      <div
        onClick={toggleSidebar}
        className="flex flex-col items-center cursor-pointer"
      >
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
  );
};

// ================== Sidebar ===================
const Sidebar = ({
  selectedIndex,
  setSelectedIndex,
  isOpen,
  toggleSidebar,
  videos,
}) => {
  return (
    <div
      className={`fixed left-0 h-screen bg-[#588d76] w-64 p-4 pt-6 z-40 shadow-lg transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex justify-end">
        <button
          className="text-white font-semibold flex justify-end mt-3 mb-2"
          onClick={toggleSidebar}
        >
          <X className="mr-1 w-4 h-4" />
        </button>
      </div>
      <h2 className="text-base font-bold mb-6 text-white">
        Welcome to PIAIC Program
      </h2>
      <ul className="space-y-2">
        {videos.map((item, idx) => (
          <li
            key={item.id || idx}
            onClick={() => {
              setSelectedIndex(idx);
              toggleSidebar();
            }}
            className={`flex items-center px-4 py-3 rounded-lg cursor-pointer transition duration-200 ${
              selectedIndex === idx
                ? "bg-[#428568] text-white shadow-md"
                : "text-white hover:bg-[#5c967d]"
            }`}
          >
            <VideoIcon className="mr-3 text-white w-4 h-4" />
            <span>
              {idx + 1}. {item.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// ================== MainContent ===================
const MainContent = ({ selectedIndex, setSelectedIndex, videos }) => {
  const video = videos[selectedIndex];
  const [showDropDown, setShowDropDown] = useState(false);

  if (!video) return null;

  const handleDropdownToggle = () => {
    setShowDropDown(!showDropDown);
  };

  const handleNext = () => {
    if (selectedIndex < videos.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  return (
    <div className="flex-1 ml-[10px] p-6 mt-[54px]">
      <div className="mb-6 relative">
        {/* Top bar */}
        <div className="flex justify-between bg-[#162726] items-center py-2.5 px-2">
          <div className="flex items-center gap-4 text-white">
            <button
              onClick={() => setSelectedIndex(Math.max(selectedIndex - 1, 0))}
              className="px-1.5 ml-2 py-1.5 mb-1 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition"
            >
              <MoveLeftIcon className="w-6 h-6 text-[#162726]" />
            </button>
            <p className="text-white -mt-1">{video.title}</p>
          </div>

          {/* Dropdown */}
          <div className="relative inline-block text-left">
            <button
              type="button"
              onClick={handleDropdownToggle}
              className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-2 py-1.5 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <FaAngleDown className="w-4 h-4 text-[#162726]" />
            </button>

            {showDropDown && (
              <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                <div className="py-1">
                  <Link href="/course-topics/mcqs">
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      MCQs
                    </button>
                  </Link>
                  <Link href="/course-topics/resources">
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Resources
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Video Player */}
        {/* <div className="w-full aspect-video -mt-1 rounded overflow-hidden shadow-md bg-black">
  <video
    key={video.file}
    controls
    className="w-full h-full"
    poster={video.thumbnail}
  >
    <source src={video.file} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div> */}
        <video
          key={video.file}
          controls
          className="w-full h-full"
          poster={video.thumbnail}
        >
          <source src={video.file} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-end gap-4 mb-6">
        <button
          className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100 transition"
          disabled={selectedIndex === 0}
          onClick={() => setSelectedIndex(selectedIndex - 1)}
        >
          PREVIOUS
        </button>
        <button
          className="px-6 py-2 bg-[#588d76] text-white rounded hover:bg-green-700 transition"
          onClick={handleNext}
          disabled={selectedIndex === videos.length - 1}
        >
          NEXT
        </button>
      </div>
    </div>
  );
};

// ================== Lesson Layout ===================
const LessonLayout = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const courseId = useParams().id; // Assuming courseId is passed in the URL
  console.log("sdasdas", courseId);
  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      const data = await getCourseModuleVideo(router, courseId);
      if (data?.data) {
        setVideos(data.data);
      }
      setLoading(false);
    };
    fetchVideos();
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  if (loading) return <p className="p-10 text-gray-600">Loading lessons...</p>;

  return (
    <div className="flex relative font-sans">
      <SidebarIcons toggleSidebar={toggleSidebar} />
      <Sidebar
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        videos={videos}
      />
      <MainContent
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        videos={videos}
      />
    </div>
  );
};

export default LessonLayout;
