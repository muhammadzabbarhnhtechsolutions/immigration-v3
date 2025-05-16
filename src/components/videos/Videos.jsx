import React from "react";

const Videos = () => {
  return (
    <div className="relative w-screen h-screen flex items-center justify-center bg-black">
      <div className="absolute flex items-center justify-center top-16">
        <video
          preload="none"
          loop
          autoPlay={true}
          muted
          className="w-auto h-full max-w-none object-cover"
        >
          <source src="/assets/video/newbgRainYaseenSirDone.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default Videos;
