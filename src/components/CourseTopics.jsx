"use client";

import React, { useEffect, useState } from "react";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
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
import { getCourseModuleVideo } from "../services/courseVideoService";

const SidebarIcons = ({ toggleSidebar }) => {
  const iconClasses = "w-5 h-5 text-white mb-1";
  const textClasses = "text-xs text-white";

  return (
    <div className="w-full md:w-[80px] bg-[#3D61AB] px-4 py-2.5 flex flex-row md:flex-col gap-4 md:gap-6 items-center md:items-center justify-around md:justify-start md:pt-16 md:py-10 fixed md:static  top-[99px] md:top-auto  z-40">
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

const Sidebar = ({ selectedIndex, setSelectedIndex, isOpen, toggleSidebar, videos }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVideos = videos.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={`fixed md:flex flex-col left-0 h-screen bg-[#3D61AB] w-64 p-4 pt-6 z-40 shadow-lg transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Close Button */}
      <div className="flex md:mt-6 justify-end">
        <button
          className="text-white font-semibold flex justify-end mt-3 mb-2"
          onClick={toggleSidebar}
        >
          <X className="mr-1 w-5 h-5" />
        </button>
      </div>

      <h2 className="text-base font-bold mb-4 text-white">Course Topics</h2>

      {/* 🔍 Search Input */}
      <div className="mb-4 relative">
             <span className="absolute inset-y-0 right-0 pr-2 pl-3 flex items-center pointer-events-none">
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
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search topics..."
          className="w-full px-3 py-2 rounded-lg text-sm text-gray-700 placeholder-gray-400 border border-white focus:outline-none focus:ring-2 focus:border-[#6d9f89] focus:ring-[#6d9f89]"
        />
        
      </div>

      {/* Filtered List */}
      <ul className="space-y-2 overflow-y-auto">
        {filteredVideos.length ? (
          filteredVideos.map((item, idx) => {
            const originalIndex = videos.indexOf(item); // Required to preserve original index
            return (
              <li
                key={item.id || idx}
                onClick={() => {
                  setSelectedIndex(originalIndex);
                  toggleSidebar();
                }}
                className={`flex items-center px-4 py-3 rounded-lg cursor-pointer transition duration-200 ${
                  selectedIndex === originalIndex
                    ? "bg-[#6d9f89] text-white shadow-md"
                    : "text-white hover:bg-[#7aa692]"
                }`}
              >
                <VideoIcon className="mr-3 text-white w-4 h-4" />
                <span>
                  {originalIndex + 1}. {item.title}
                </span>
              </li>
            );
          })
        ) : (
          <p className="text-white text-sm items-center text-center px-4">No topics found.</p>
        )}
      </ul>
    </div>
  );
};


const MainContent = ({ selectedIndex, setSelectedIndex, videos }) => {
  const video = videos[selectedIndex];
  const [showDropDown, setShowDropDown] = useState(false);

  if (!video) return null;

  const handleDropdownToggle = () => setShowDropDown(!showDropDown);

  const handleNext = () => {
    if (selectedIndex < videos.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  return (
<div className="flex-1 ml-0 md:ml-[10px] md:p-6 mt-[99px] md:mt-[54px]">
      <div className="mb-6 relative">
        <div className="flex justify-between bg-[#3D61AB] items-center py-2.5 px-2">
          <div className="flex items-center gap-4 text-white">
            <button
              onClick={() => setSelectedIndex(Math.max(selectedIndex - 1, 0))}
              className="px-1.5 ml-2 py-1.5 mb-1 bg-gray-50 text-gray-700 rounded-xl hover:bg-gray-300 transition"
            >
              <MoveLeftIcon className="w-6 h-6 text-[#82b396]" />
            </button>
            <p className="text-white -mt-1">{video.title}</p>
          </div>
          <div className="relative inline-block text-left">
            <button
              type="button"
              onClick={handleDropdownToggle}
              className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-2 py-1.5 -mt-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <FaAngleDown className="w-4 h-4 text-[#82b396]" />
            </button>
            {showDropDown && (
              <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                <div className="py-1">
                  <Link href={`/course-topics/mcqs-lists/${video.id}`}>
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
        <div className="w-full aspect-video rounded-lg overflow-hidden mt-4 shadow-lg">
          <Plyr
            source={{
              type: 'video',
              sources: [
                {
                  src: video.file,
                  provider: 'html5'
                }
              ],
              poster: video.thumbnail
            }}
          />
        </div>
      </div>


      <div className="flex justify-center md:justify-end gap-4 mb-6">
        <button
          className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100 transition"
          disabled={selectedIndex === 0}
          onClick={() => setSelectedIndex(selectedIndex - 1)}
        >
          PREVIOUS
        </button>
        <button
          className="px-6 py-2 bg-[#3D61AB] text-white rounded hover:bg-[#6d9f89] transition"
          onClick={handleNext}
          disabled={selectedIndex === videos.length - 1}
        >
          NEXT
        </button>
      </div>
    </div>
  );
};

const LessonLayout = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const courseId = useParams().id;

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      const data = await getCourseModuleVideo(router, courseId);
      if (data?.data) setVideos(data.data);
      setLoading(false);
    };
    fetchVideos();
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  if (loading) {
    return (
      <div className="mx-auto bg-[#ebf0ed] px-4 mt-0 py-20 text-center flex flex-col items-center justify-center gap-4 animate-fade-in">
        <div className="h-10 w-10 border-4 border-[#3D61AB] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[#3D61AB] text-lg font-medium">Loading lessons...</p>
      </div>
    );
  }

  return (
    // return (
  <div className="flex flex-row md:flex-row relative font-sans min-h-screen">
    <SidebarIcons toggleSidebar={toggleSidebar} />
    {/* Mobile toggle button */}
    <div className="md:hidden fixed top-4 left-4 z-50">
      <button
        onClick={toggleSidebar}
        className="bg-[#3D61AB] text-white p-2 rounded shadow-md"
      >
        <BookOpen className="w-5 h-5" />
      </button>
    </div>
  
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
