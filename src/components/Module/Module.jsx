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
    <div className="flex justify-center">
  <h3 className="text-2xl font-marko sm:text-4xl px-4 pt-8 md:text-center">
    Course Videos
  </h3>
</div>

<div ref={listRef} className="space-y-1 mt-4 px-2 rounded-2xl py-8">
  {modules.map((module) => (
    <div key={module.id}>
      {/* Videos Section */}
      {module.videos.length > 0 ? (
        <div
          className={`mt-1 px-4 gap-6 grid ${
            module.videos.length === 1
              ? "grid-cols-1 place-items-center" // ✅ center single video
              : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-start" // ✅ normal grid for multiple
          }`}
        >
          {module.videos.map((video) => (
            <div
              key={video.id}
              onClick={() => openVideoModal(video)}
              className="cursor-pointer border border-gray-300 h-[273px] bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1 w-full sm:w-[340px]"
            >
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 text-center">
                <h3 className="text-lg font-[600] text-gray-800 mt-1 line-clamp-2">
                  {video.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-2 text-sm text-gray-500">No videos available.</p>
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
