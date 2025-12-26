"use client";

import React, { useEffect, useState } from "react";
import { X, VideoIcon, ChevronDown, ChevronUp } from "lucide-react";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import { getCourseModule } from "@/services/courseModuleServices";
import { getCourseModuleVideo } from "@/services/courseVideoService";
import { useParams } from "next/navigation";
import { FaAngleDoubleDown } from "react-icons/fa";
// import { getCourseModule, getCourseModuleVideo } from "@/services/courseVideoService";

export default function Module() {
  const params = useParams();
  const courseId = params.id;

  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedModuleId, setExpandedModuleId] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Fetch modules
  useEffect(() => {
    const fetchModules = async () => {
      if (!courseId) return;
      const res = await getCourseModule(null, courseId);
      if (res?.data) {
        // initialize modules with empty videos array
        setModules(res.data.map(m => ({ ...m, videos: [] })));
      }
      setLoading(false);
    };
    fetchModules();
  }, [courseId]);

  const toggleModule = async (moduleId) => {
    if (expandedModuleId === moduleId) {
      // collapse
      setExpandedModuleId(null);
      return;
    }

    setExpandedModuleId(moduleId);

    // fetch videos only if not already fetched
    const moduleIndex = modules.findIndex(m => m.id === moduleId);
    if (modules[moduleIndex].videos.length === 0) {
      const resVideos = await getCourseModuleVideo(null, moduleId);
      if (resVideos?.data) {
        const newModules = [...modules];
        newModules[moduleIndex].videos = resVideos.data;
        setModules(newModules);
      }
    }
  };

  const openVideoModal = (video) => {
    setSelectedVideo(video);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedVideo(null);
    setShowModal(false);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="h-10 w-10 border-4 border-[#88B29A] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-[#88B29A] text-lg font-medium">Loading modules...</p>
      </div>
    );
  }

  return (
    <div className="p-4 mb-16 ">
      <h1 className="text-2xl font-bold text-[#88B29A] mb-6 p-4">Course Modules</h1>

      <div className="space-y-4">
        {modules.map((module) => (
          <div key={module.id} className="bg-white rounded-2xl border border-gray-200 shadow-lg p-4">
            {/* Module name */}
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleModule(module.id)}
            >
              <h2 className="text-lg font-semibold text-gray-800">{module.title}</h2>
              <span>{expandedModuleId === module.id ? <ChevronUp /> : <ChevronDown/>}</span>
            </div>

            {/* Videos */}
            {expandedModuleId === module.id && module.videos.length > 0 && (
              <ul className="mt-4 space-y-2">
                {module.videos.map((video) => (
                  <li
                    key={video.id}
                    className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100 rounded"
                    onClick={() => openVideoModal(video)}
                  >
                    <VideoIcon className="w-4 h-4 text-[#88B29A]" />
                    <span className="text-gray-700">{video.title}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {showModal && selectedVideo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[80vh] overflow-y-auto p-6 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{selectedVideo.title}</h2>
              <button onClick={closeModal}>
                <X className="w-6 h-6" />
              </button>
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
