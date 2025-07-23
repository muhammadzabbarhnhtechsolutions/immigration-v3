"use client";
import React, { forwardRef } from "react";
import { Player, PlayerReference } from "video-react";
import "video-react/dist/video-react.css"; // import css
// import { CourseVideo } from '@/app/Redux/features/CourseSlice';
import Image from "next/image";
// import Logo2 from "@/assets/logo.png"
import Comming from "@/assets/soon.png";

// Convert TypeScript interface to PropTypes for JavaScript
const VideoPlayer = forwardRef(({ video }, ref) => {
  // console.log('video player', video);

  return (
    <div className="flex justify-center items-center m-auto">
      {video ? (
        video.video_file ? (
          <Player
            fluid={false}
            width={1000}
            height={400}
            playsInline
            poster={video?.video_thumbnail ? `${video.video_thumbnail}` : ""}
            src={video?.video_file ? `${video.video_file}` : ""}
            ref={ref}
          />
        ) : (
          // "Coming Soon" message
          <div className="flex items-center justify-center min-h-[500px] w-full bg-gray-600 rounded-lg">
            <div className="text-white text-[30px] font-semibold">
              <Image src={Comming} width={500} alt="logo" />
            </div>
          </div>
        )
      ) : (
        <div
          role="status"
          className="flex items-center justify-center min-h-[500px] w-full bg-gray-600 rounded-lg animate-pulse dark:bg-gray-700"
        >
          {/* <Image src={Logo2} width={200} alt='logo' /> */}
          <div className="mx-auto bg-[#ebf0ed] px-4 mt-0 py-20 text-center flex flex-col items-center justify-center gap-4 animate-fade-in">
            {/* Spinner */}
            <div className="h-10 w-10 border-4 border-[#3D61AB] border-t-transparent rounded-full animate-spin"></div>

            {/* Text */}
            <p className="text-[#3D61AB] text-lg font-medium">Loading ...</p>
          </div>
        </div>
      )}
    </div>
  );
});

// Set a display name for debugging purposes
VideoPlayer.displayName = "VideoPlayer";

export default VideoPlayer;
