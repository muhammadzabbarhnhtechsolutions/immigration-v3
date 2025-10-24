"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { PlayCircle } from "lucide-react";
import { FaPlayCircle } from "react-icons/fa";
import { getVideoTrailor } from "@/services/VideoTrailor"; // adjust import
import { useRouter } from "next/navigation";

export default function VideoTrailor() {
  const [playingIndex, setPlayingIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch videos
  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const res = await getVideoTrailor(router);
        if (res?.data) setVideos(res.data);
      } catch (err) {
        console.error("Error fetching videos:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, [router]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 animate-fade-in">
        <div className="h-10 w-10 border-4 border-[#88B29A] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[#88B29A] text-lg font-medium">Loading Video Trailers...</p>
      </div>
    );
  }

  return (
    <section className="px-4 sm:px-8 lg:px-14 py-14 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
<div
  style={{ lineHeight: "43px" }}
  className="mx-auto max-w-4xl px-6 md:px-0 -mt-14 text-center md:text-left"
>
  <h1 className="text-3xl sm:text-4xl md:text-[40px] font-bold mb-5 md:mb-6 leading-[58px] text-[#88B29A]">
    Stay Ahead with Expert Insights
  </h1>

  <p className="text-gray-600 text-base md:text-lg leading-relaxed text-justify">
    Stay ahead with our podcast, where we share the latest updates, insights,
    and developments in UK immigration law. Hosted by a UK-qualified solicitor,
    each episode breaks down complex changes, highlights key trends, and
    explores the issues that matter most to individuals and businesses
    navigating the immigration system.
  </p>
</div>



          <div className="relative w-full max-w-lg mx-auto">
            {isPlaying ? (
              <div className="relative w-full h-[220px] sm:h-[280px] md:h-[330px] rounded-xl overflow-hidden shadow-lg">
                <iframe
                  className="w-full h-full rounded-xl shadow-lg"
                  src="https://www.youtube.com/embed/9C2fSBHryiQ?autoplay=1&controls=1"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <div className="relative group">
                <Image
                  src="https://immigrationnavigator.co.uk/wp-content/uploads/2023/06/creative-copywriters-working-on-articles.jpg"
                  alt="Podcast Thumbnail"
                  width={800}
                  height={450}
                  className="w-full rounded-xl shadow-lg transition-transform duration-500 group-hover:scale-105"
                />
                <button
                  onClick={() => setIsPlaying(true)}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full text-white"
                >
                  <FaPlayCircle className="text-5xl sm:text-6xl drop-shadow-xl" />
                </button>
              </div>
            )}
          </div>
        </section>



        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.map((video, index) => (
            <div
              key={index}
              className="group bg-white cursor-pointer rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-1"
            >
              {/* Video Thumbnail / Player */}
              <div className="relative w-full h-48 sm:h-56 md:h-64 bg-black">
                {playingIndex === index ? (
                  <video
                    src={decodeURIComponent(video.file)}
                    controls
                    autoPlay
                    className="w-full h-full object-cover"
                    onEnded={() => setPlayingIndex(null)}
                  />
                ) : (
                  <>
                    {video.thumbnail ? (
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        className="object-cover object-top rounded-t-lg"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center text-white">
                        No Thumbnail
                      </div>
                    )}

                    <button
                      onClick={() => setPlayingIndex(index)}
                      className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/40 transition"
                      aria-label="Play trailer"
                    >
                      <PlayCircle className="w-14 h-14 sm:w-16 sm:h-16 text-white" />
                    </button>
                  </>
                )}
              </div>

              {/* Title & Description */}
              <div className="px-3 py-3 sm:py-4">
                <h3 className="font-semibold mb-1 text-black line-clamp-2 text-sm sm:text-base leading-tight">
                  {video.title}
                </h3>
                <p
                  className="line-clamp-3 text-xs sm:text-sm text-gray-700"
                  dangerouslySetInnerHTML={{
                    __html: video?.description || "No description available.",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
