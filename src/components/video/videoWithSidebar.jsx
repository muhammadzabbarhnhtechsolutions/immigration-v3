import React, { useEffect, useState } from 'react';
import { Sidebar } from './sidebar';
import VideoPlayer from '@/usable/player';
import { toast } from 'react-toastify';
import { GetModuleOfCourses } from '@/services/courseService';
import { useDispatch, useSelector } from 'react-redux';
import { setCoursesdata } from '@/app/Redux/features/CourseSlice';
import { useRouter } from 'next/navigation';
import { Drawer } from 'flowbite-react';
import { FaInfoCircle } from "react-icons/fa";
import DescriptionBox from '../ui/DescriptionBox';

export default function VideoWithSidebar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const video = useSelector((state) => state.course.current_video);
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

  const [videoId, setVideoId] = useState(''); // Store the selected video ID
  
  useEffect(() => {
    const GetModules = async () => {
      try {
        const result = await GetModuleOfCourses(router);
        if ("data" in result) { // Check if 'data' exists in the response
          const Data = result.data;
          if (Data.status) {
            dispatch(setCoursesdata(Data));
            console.log("courses", Data);
          }
        } else {
          console.log('else===', result);
          toast.error(result.message || "Error occurred");
        }
      } catch (error) {
        toast.error("something went wrong");
        console.error("Signup error", error);
      }
    };
    GetModules();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleIconClick = async (id) => {
    if (id === undefined) return; // Prevent calling API if id is undefined
    console.log('id===', id);
    setVideoId(id);  // Set the selected video ID
    setIsOpen(true); // Open the drawer
  };
  
  return (
    <>
      <div className="flex flex-row w-full gap-x-4 mb-5">
        {/* Sidebar - Full width on smaller screens, 1/3 width on large screens */}
        <div className="w-auto lg:w-1/3">
          <Sidebar />
        </div>
        {/* Video - Full width on smaller screens, 2/3 width on large screens */}
        <div className="w-[90%] lg:w-2/3">
          {/* Video Player */}
          <div className='absolute right-24 z-20 mt-3 cursor-pointer'
            style={{ border: "2px solid white", borderRadius: "30px", padding: "5px" }}>
            <FaInfoCircle color="#86ffbb" size={25} onClick={() => handleIconClick(video?.id)} />
          </div>
          <div className='w-full bg-[#474747] relative h-4 xs:h-6 sm:h-7 md:h-8 lg:h-16'>
            <div className='row'>
              <div className='col-md-12 flex justify-center items-center text-[#88ae98] text-[1.3rem] xs:text-[1rem] sm:text-[2.2rem] md:text-[2.5rem] lg:text-[3em] uppercase' style={{fontFamily:"cursive",fontWeight:"bolder"}}>
                {video?.video_title}
              </div>
            </div>
            &nbsp;
          </div>
          <VideoPlayer video={video} />
        </div>

        <Drawer className='bg-[#acffd0] max-h-80' open={isOpen} onClose={handleClose} position="bottom">
          <Drawer.Header title="Tasks" />
          <Drawer.Items>
            <DescriptionBox videoid={videoId} />
          </Drawer.Items>
        </Drawer>
      </div>
    </>
  );
}
