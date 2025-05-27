"use client";
import React, { useEffect, useRef, useState } from "react";
import { Drawer, Tabs } from "flowbite-react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Mousewheel } from "swiper/modules";
import VideoWithSidebar from "./videoWithSidebar";
import VideComp from "./videos";
import { setVideoUrl } from '@/app/Redux/features/CourseSlice';
// import "swiper/css";
// import "swiper/css/pagination";
import { FaInfoCircle } from "react-icons/fa";
import DescriptionBox from "../ui/DescriptionBox2";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { AllVideos } from "@/services/courseService";
import { toast } from "react-toastify";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";  // add Scrollbar module

export default function VideoTabs() {
  const dispatch = useDispatch();
  const router = useRouter();
  const tabsRef = useRef(null);
  const videoRefs = useRef([]);
  const [activeTab, setActiveTab] = useState(1);
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  const [videoId, setVideoId] = useState('');

  const handleSlideChange = (swiper) => {
    videoRefs.current.forEach((video, index) => {
      if (index === swiper.activeIndex) {
        video.play();
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  };

  const addToRefs = (el) => {
    if (el && !videoRefs.current.includes(el)) {
      videoRefs.current.push(el);
    }
  };

  useEffect(() => {
    const GetModulesallVideos = async () => {
      try {
        const result = await AllVideos(router);
        if ("data" in result) {
          const Data = result.data;
          if (Data.status) {
            setData(Data.data);
            console.log("video", Data);
          }
        } else {
          toast.error(result.message || "Error occurred");
        }
      } catch (error) {
        toast.error("something went wrong");
        console.error("Signup error", error);
      }
    };
    GetModulesallVideos();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    videoRefs.current.forEach((video) => {
      video.pause();
      video.currentTime = 0;
    });
    dispatch(setVideoUrl(null));
  };

  useEffect(() => {
    videoRefs.current.forEach((video) => {
      video.pause();
      video.currentTime = 0;
    });
  }, [activeTab]);

  const handleIconClick = (id) => {
    setVideoId(id);
    setIsOpen(true);
  };

  return (
    <Tabs
      aria-label="Tabs with underline"
      variant="underline"
      tabIndex={activeTab}
      ref={tabsRef}
      onActiveTabChange={handleTabChange}
    >
      <Tabs.Item title="All">
        <VideoWithSidebar />
      </Tabs.Item>
      <Tabs.Item title="Next Topic" active>
        <div className="h-[100vh] overflow-hidden">
          <Swiper
            className="mySwiper h-full"
            direction={"vertical"}
            mousewheel={true}
            modules={[Mousewheel]}  // include Scrollbar module
            onSlideChange={handleSlideChange}
          >
            {data?.map((item, index) => (
              <SwiperSlide key={index} className="!h-full">
                <div
                  className='absolute right-5 top-3 z-20 cursor-pointer'
                  style={{ border: "2px solid white", borderRadius: "30px", padding: "5px" }}
                >
                  <FaInfoCircle color="white" size={25} onClick={() => handleIconClick(item?.id)} />
                </div>
                <VideComp item={item} ref={addToRefs} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>


        <Drawer className='bg-[#474747] max-h-[65vh] ' open={isOpen} onClose={handleClose} position="bottom">
          <Drawer.Header title="Tasks" />
          <Drawer.Items>
            <DescriptionBox videoid={videoId} />
          </Drawer.Items>
        </Drawer>

      </Tabs.Item>
    </Tabs>
  );
}
