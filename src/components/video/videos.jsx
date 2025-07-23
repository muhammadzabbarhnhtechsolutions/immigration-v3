import React, { forwardRef } from "react";
import VideoPlayer from "@/usable/player";

const Videos = forwardRef(({ item }, ref) => {
 

  return (
    <div className="">
      <div className="w-full bg-[#474747] relative h-4 xs:h-6 sm:h-7 md:h-8 lg:h-14">
        <div className="row">
          <div
            className="col-md-12 flex justify-center items-center text-[#3D61AB] text-[1.3rem] xs:text-[1rem] sm:text-[2.2rem] md:text-[2.5rem] lg:text-[2.5em] italic uppercase"
            style={{ fontFamily: "cursive", fontWeight: "bolder" }}
          >
            {item.video_title}
          </div>
        </div>
      </div>

      <VideoPlayer video={item} ref={ref} />
    </div>
  );
});

// Set display name for debugging
Videos.displayName = "VideoComp";

export default Videos;
