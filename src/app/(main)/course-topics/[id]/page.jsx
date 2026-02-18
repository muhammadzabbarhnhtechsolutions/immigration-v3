"use client";

import React, { useState, useEffect } from "react";
import {
  VideoIcon,
  Home,
  BookOpen,
  X,
  MoveLeftIcon,
  Eye,
  Compass,
  Folder,
  Info,
} from "lucide-react";
import { FaAngleDown } from "react-icons/fa";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { getCourseModuleVideo, getModuleDescription } from "@/services/courseVideoService";
import { FaDiscourse } from "react-icons/fa6";

export default function Page() {
  const router = useRouter();
  const { id } = useParams();

  const [videos, setVideos] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [moduleDescription, setModuleDescription] = useState("");
  const [loading, setLoading] = useState(true);

  const [showTooltip, setShowTooltip] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const iconClasses = "w-5 h-5 text-white mb-1";
  const textClasses = "text-xs text-white";

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      const data = await getCourseModuleVideo(router, id);
      if (data?.data) setVideos(data.data);
      setLoading(false);
    };

    fetchVideos();
  }, [id]);

  useEffect(() => {
    const fetchDescription = async () => {
      const data = await getModuleDescription(router, id);
      if (data?.data?.description) {
        setModuleDescription(data.data.description);
      }
    };

    if (id) fetchDescription();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <div className="h-10 w-10 border-4 border-[#88B29A] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-[#88B29A] text-lg font-medium">
          Loading lessons...
        </p>
      </div>
    );
  }

  const video = videos[selectedIndex];
  const filteredVideos = videos.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-row relative z-10 font-sans mt-12">

      {/* LEFT MINI ICON BAR */}
      <div className="w-full md:w-[80px] bg-[#88B29A] px-4 py-2.5 flex flex-row 
      md:flex-col gap-4 md:gap-6 items-center justify-around md:justify-start 
      md:pt-16 md:py-10 fixed md:static top-[99px] md:-mt-12 z-40">

  
        <div className="flex flex-col items-center cursor-pointer">
          <Home className={iconClasses} />
          <span className={textClasses}>Home</span>
        </div>

        {/* Resource (video_id pass) */}
        <Link href={`/course-topics/resources?video_id=${video?.id}`}>
          <div className="flex flex-col items-center cursor-pointer">
            <Folder className={iconClasses} />
            <span className={textClasses}>Resources</span>
          </div>
        </Link>

        {/* General */}
        <Link href={`/course-topics/resources`}>
          <div className="flex flex-col items-center cursor-pointer">
            <FaDiscourse className={iconClasses} />
            <span className={textClasses}>General</span>
          </div>
        </Link>

        {/* Lessons */}
        <div
          onClick={toggleSidebar}
          className="flex flex-col items-center cursor-pointer"
        >
          <BookOpen className={iconClasses} />
          <span className={textClasses}>Lessons</span>
        </div>
      </div>

      {/* SIDEBAR TOPICS */}
      <div
        className={`fixed md:flex flex-col md:-mt-[208px] left-0 h-screen bg-[#88B29A] 
        w-72 p-4 z-40 shadow-lg transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end">
          <button
            className="text-white font-semibold flex justify-end mt-3 mb-2"
            onClick={toggleSidebar}
          >
            <X className="mr-1 w-5 h-5" />
          </button>
        </div>

        <h2 className="text-base font-bold mb-4 -mt-4 text-white">Course Topics</h2>

        {/* Search */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search topics..."
          className="w-full px-3 py-2 rounded-lg text-sm text-gray-700 placeholder-gray-400 border border-white focus:outline-none"
        />

        {/* List */}
        <ul className="space-y-2 overflow-y-auto mt-4">
          {filteredVideos?.map((item, idx) => {
            const originalIndex = videos?.indexOf(item);
            return (
              <li
                key={item.id}
                onClick={() => {
                  setSelectedIndex(originalIndex);
                  toggleSidebar();
                }}
                className={`flex items-center px-4 py-3 rounded-lg cursor-pointer transition ${
                  selectedIndex === originalIndex
                    ? "bg-[#6d9e82] text-white"
                    : "text-white hover:bg-[#76a68a]"
                }`}
              >
                <VideoIcon className="mr-3 text-white w-4 h-4" />
                <span>{originalIndex + 1}. {item?.title}</span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* MAIN VIDEO AREA */}
      <div className="flex-1 ml-0 md:ml-[10px] md:p-6 mt-[99px] md:mt-[54px]">

        {/* Header */}
      <div className="flex justify-between bg-[#88B29A] items-center py-2.5 px-3">

  {/* LEFT SIDE — Back Button + Title */}
  <div className="flex items-center gap-4 text-white">

    {/* Back Button */}
    <button
      onClick={() => setSelectedIndex(Math.max(selectedIndex - 1, 0))}
      className="px-1.5 ml-1 py-1.5 bg-gray-50 text-gray-700 rounded-xl"
    >
      <MoveLeftIcon className="w-6 h-6 text-[#88B29A]" />
    </button>

    {/* Video Title */}
    <p className="text-white font-medium">{video?.title}</p>
  </div>

  {/* RIGHT SIDE — Info Icon + Dropdown */}
  <div className="flex items-center gap-4">

    {/* INFO ICON WITH TOOLTIP */}
    <div className="relative group">
      <Info className="w-5 h-5 text-white cursor-pointer" />

      {/* Tooltip */}
      <div className="absolute right-0 mt-2 w-64 bg-white text-gray-800 text-sm 
      shadow-xl border border-gray-200 rounded-xl p-4 opacity-0 group-hover:opacity-100 
      transition-all duration-200 z-50 pointer-events-none">

        <h4 className="font-semibold text-[#88B29A] mb-1">Module Description</h4>
        <p className="text-gray-700 text-xs leading-relaxed">
          {moduleDescription}
        </p>

        {/* Tooltip Arrow */}
        <div className="absolute right-4 -top-1 w-3 h-3 bg-white 
        border-l border-t border-gray-200 rotate-45"></div>
      </div>
    </div>

    {/* DROPDOWN BUTTON */}
    <div className="relative">
      <button
        type="button"
        onClick={() => setShowDropDown(!showDropDown)}
        className="inline-flex rounded-md border px-2 py-1.5 bg-white text-sm"
      >
        <FaAngleDown className="w-4 h-4 text-[#88B29A]" />
      </button>

      {showDropDown && (
        <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white z-50">
          <div className="py-1">
            <Link href={`/course-topics/mcqs-lists/${video?.id}`}>
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                MCQs
              </button>
            </Link>

            <Link href={`/course-topics/resources`}>
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                General Resource
              </button>
            </Link>

            <Link href={`/course-topics/resources?video_id=${video?.id}`}>
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                Resources
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>

  </div>
</div>


        {/* Player */}
        <div className="w-full aspect-video rounded-lg overflow-hidden mt-4 shadow-lg">
          <Plyr
            source={{
              type: "video",
              sources: [{ src: video.file, provider: "html5" }],
              poster: video.thumbnail,
            }}
          />
        </div>

        {/* Navigation */}
        <div className="flex justify-center md:justify-end gap-4 mb-6 mt-6">
          <button
            className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
            disabled={selectedIndex === 0}
            onClick={() => setSelectedIndex(selectedIndex - 1)}
          >
            PREVIOUS
          </button>
          <button
            className="px-6 py-2 bg-[#88B29A] text-white rounded hover:bg-[#6d9e82]"
            disabled={selectedIndex === videos.length - 1}
            onClick={() => setSelectedIndex(selectedIndex + 1)}
          >
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
}
