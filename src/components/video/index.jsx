"use client";
import React from "react";
import VideoTabs from "./tabs";

export default function Video() {
  return (
    <div className="relative px-5 md:px-20 py-5 md:py-10 overflow-hidden">
      <div className="relative z-10">
        <VideoTabs />
      </div>
    </div>
  );
}
