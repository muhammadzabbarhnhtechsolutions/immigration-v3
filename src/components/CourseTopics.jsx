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
import { getCourseModuleVideo } from "@/services/courseVideoService";

// ✅ Sidebar icons


// ✅ Main Layout Wrapper
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
  }, [courseId, router]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="h-10 w-10 border-4 border-[#88B29A] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[#88B29A] text-lg font-medium mt-4">Loading lessons...</p>
      </div>
    );

  return (
    <div className="flex flex-row relative font-sans h-screen">
   
      <MainContent
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        videos={videos}
      />
    </div>
  );
};

export default LessonLayout;
