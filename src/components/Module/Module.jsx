"use client";

import React, { useEffect, useState, useRef } from "react";
import { X, VideoIcon, ChevronDown, Info } from "lucide-react";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import { getCourseModule } from "@/services/courseModuleServices";
import { getCourseModuleVideo } from "@/services/courseVideoService";
import { useParams } from "next/navigation";
import { FaAngleDown } from "react-icons/fa";
import Link from "next/link";

export default function ModulePage() {
  const { id: courseId } = useParams();
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showVideoDropDown, setShowVideoDropDown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [VideoModelLoading, setVideoModelLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const listRef = useRef(null);

  // Fetch modules + videos directly
  useEffect(() => {
    const fetchModules = async () => {
      if (!courseId) return;
      try {
        const res = await getCourseModule(null, courseId);
        if (res?.data) {
          const modulesData = res.data;
          // Fetch videos for each module
          const modulesWithVideos = await Promise.all(
            modulesData.map(async (m) => {
              try {
                const resVideos = await getCourseModuleVideo(null, m.id);
                return { ...m, videos: resVideos?.data || [] };
              } catch (err) {
                console.error("Error fetching videos for module:", m.id, err);
                return { ...m, videos: [] };
              }
            })
          );
          setModules(modulesWithVideos);
        }
      } catch (err) {
        console.error("Error fetching modules:", err);
      }
      setLoading(false);
    };
    fetchModules();
  }, [courseId]);

  const openVideoModal = (video) => {
    setSelectedVideo(video);
    setShowModal(true);
    handleModelLoading();
  };

  const handleModelLoading = () => {
    setVideoModelLoading(true);
    setTimeout(() => {
      setVideoModelLoading(false);
    }, 3000);
  };

  const closeModal = () => {
    setSelectedVideo(null);
    setShowModal(false);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="h-10 w-10 border-4 border-[#88B29A] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-[#88B29A] text-lg font-medium">
          Loading modules...
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 relative mb-[99px]">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold text-[#88B29A] mb-6 px-4 pt-8">
          Course Modules
        </h1>
        {/* <Link href={`/course-topics/resources`}>
          <button className="w-full rounded-full mt-8 text-left px-4 py-2 text-sm text-white bg-[#88B29A] hover:bg-[#88B29A]">
            General Resource
          </button>
        </Link> */}
      </div>

      <div
        ref={listRef}
        className="space-y-4  "
      >
        {modules.map((module) => (
          <div
            key={module.id}
            className="bg-white rounded-2xl border border-gray-200 shadow-lg p-4"
          >
            {/* Module header */}
            <div className="flex justify-between items-center">
              {/* <h2 className="text-lg font-semibold text-gray-800">
                {module.title}
              </h2> */}
{/* 
              <div className="flex items-center gap-4">
                {module.description && (
                  <div className="relative right-[9px] group">
                    <Info className="text-[#99b9a7] cursor-pointer h-6 w-6" />
                    <div className="absolute right-8 -top-4 w-64 p-2 bg-gray-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                      {module.description}
                    </div>
                  </div>
                )}
                <div
                  className={`rounded-full border-[3px] border-[#99b9a7] ${
                    module.percentage > 0 ? "px-1.5 py-1.5" : "px-2.5 py-1.5"
                  }`}
                >
                  <span className="text-gray-700 text-xs font-medium">
                    {module.percentage.toFixed(0)}%
                  </span>
                </div>
              </div> */}
            </div>

            {/* Videos (always visible) */}
            {module.videos.length > 0 ? (
              <ul className="mt-4 space-y-2 ">
                {module.videos.map((video) => (
                  <li
                    key={video.id}
                    className="flex items-center justify-between gap-2 p-2 cursor-pointer hover:bg-gray-100 rounded relative"
                  >
                    <div
                      className="flex items-center gap-2"
                      onClick={() => openVideoModal(video)}
                    >
                      <VideoIcon className="w-4 h-4 text-[#88B29A]" />
                      <span className="text-gray-700">{video.title}</span>
                    </div>

                    <div className="relative">
                      {/* <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowVideoDropDown(
                            video.id === showVideoDropDown ? null : video.id
                          );
                        }}
                        className="inline-flex items-center rounded-md border px-2 py-1.5 bg-white text-sm"
                      >
                        <FaAngleDown className="w-4 h-4 text-[#88B29A]" />
                      </button> */}

                      {/* {showVideoDropDown === video.id && (
                        <div className="absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-white z-50">
                          <div className="py-1">
                            <Link href={`/course-topics/mcqs-lists/${video.id}`}>
                              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                                MCQs
                              </button>
                            </Link>
                            <Link
                              href={`/course-topics/resources?video_id=${video.id}`}
                            >
                              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                                Resources
                              </button>
                            </Link>
                          </div>
                        </div>
                      )} */}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-gray-500">
                No videos available.
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Loading Spinner for Modal */}
      {VideoModelLoading && (
        <div className="fixed inset-0 bg-black/5 flex items-center justify-center z-[100]">
          <div className="h-12 w-12 border-4 border-[#88B29A] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Video Modal */}
      {showModal && selectedVideo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[80vh] overflow-y-auto p-6 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{selectedVideo.title}</h2>
              <div className="flex items-center gap-2 relative">
                {/* <button
                  type="button"
                  onClick={() => setShowVideoDropDown(!showVideoDropDown)}
                  className="inline-flex items-center rounded-md border px-2 py-1.5 bg-white text-sm"
                >
                  <FaAngleDown className="w-4 h-4 text-[#88B29A]" />
                </button>
                {showVideoDropDown && (
                  <div className="absolute right-0 mt-[140px] w-44 rounded-md shadow-lg bg-white z-50">
                    <div className="py-1">
                      <Link href={`/course-topics/mcqs-lists/${selectedVideo.id}`}>
                        <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                          MCQs
                        </button>
                      </Link>
                      <Link
                        href={`/course-topics/resources?video_id=${selectedVideo.id}`}
                      >
                        <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                          Resources
                        </button>
                      </Link>
                    </div>
                  </div>
                )} */}
                <button onClick={closeModal} className="ml-2">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="w-full aspect-video rounded-lg overflow-hidden shadow-lg">
              <Plyr
                source={{
                  type: "video",
                  sources: [{ src: selectedVideo.file, provider: "html5" }],
                  poster: selectedVideo.thumbnail,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
