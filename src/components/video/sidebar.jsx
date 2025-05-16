'use client';
import React, { useEffect, useState } from "react";
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle, Drawer } from "flowbite-react";
import ProgressBar from "@/usable/progressBar";
import { FaPlay } from "react-icons/fa6";
import { FaBars } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setVideoUrl } from '@/app/Redux/features/CourseSlice';
import ProgressBar2 from "@/usable/progressBarblue";

const CourseSidebar = ({ coursedata }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setVideoUrl(coursedata?.data[0]?.course_videos[0]));
  }, [coursedata]);

  return (
    <div className="border p-5 xl:p-9 rounded-xl border-[#88ae98]">
      <span className="justify-end lg:flex hidden">
        <FaBars color="#88ae98" size={25} />
      </span>
      <p className="font-ubuntu text-secondary text-[36px] font-[700] mb-5">
        IMIGRATION NAVIGATOR
      </p>
      <ProgressBar2 percent={coursedata?.course_progress || 0} />

      <hr className="border-secondary mb-7" />
      <p className="font-ubuntu text-secondary text-[20px] font-[700] mb-1">
        Course Modules
      </p>

      <Accordion className="border border-[#88ae98] p-4 px-5 rounded-xl w-full">
        {coursedata?.data?.map((module) => {
          const isLocked = !module.unlock;
          return (
            <AccordionPanel key={module.id}>
              <AccordionTitle
                className={`mt-5 border border-white ${isLocked ? "bg-gray-300 cursor-not-allowed" : "bg-[#acffd0] border border-white"} text-white ${isLocked ? "text-gray-500" : "hover:bg-[#86ffbb] hover:text-white"} rounded-lg border-none`}
              >
                <div className="inline-block text-start w-[120%] lg:w-[150%] xl:w-[200%]">
                  <ProgressBar percent={module?.module_progress || 0} />
                  <span className="block text-lg font-semibold mt-3 text-black hover:text-white">
                    {module?.module_title}
                  </span>
                  <span className="block text-sm font-normal mt-1 text-black hover:text-white">
                    {module?.course_videos?.length} videos
                  </span>
                  <span className="block text-sm font-normal mt-1 text-black">
                    {module?.unlock_days_count == 0 ? " " : module?.unlock_days_count + " " + "days to unlock"}
                  </span>
                </div>
              </AccordionTitle>

              <AccordionContent className={`border-white border bg-[#c7ffdf] ${isLocked ? "pointer-events-none opacity-50" : ""}`}>
                {isLocked ? (
                  <div className="p-4 text-center text-gray-500">This module is locked.</div>
                ) : (
                  <div className="flex-col flex gap-6 h-64 overflow-y-scroll no-scrollbar">
                    {module?.course_videos?.map((video) => (
                      <div key={video?.id} className="flex justify-between items-center ">
                        <div
                          className="bg-white rounded-full border-2 p-3 border-[#86ffbb] flex items-center justify-center cursor-pointer"
                          onClick={() => {
                            dispatch(setVideoUrl(video));
                          }}
                        >
                          <span>
                            <FaPlay size={20} color="#86ffbb" />
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <p
                            onClick={() => {
                              dispatch(setVideoUrl(video));
                            }}
                            className="font-ubuntu font-semibold text-[13px] cursor-pointer"
                            title={video?.video_title}
                          >
                            {video?.video_title.length > 20 ? video?.video_title.slice(0, 20) + "..." : video?.video_title}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </AccordionContent>
            </AccordionPanel>
          );
        })}
      </Accordion>
    </div>
  );
};

export default CourseSidebar;

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  const coursedata = useSelector((state) => state.course.courses);
  console.log('coursedata', coursedata);

  return (
    <>
      <div className="block lg:hidden">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="text-white bg-primary hover:dark focus:outline-none focus:ring-1 focus:ring-secondary font-medium rounded-lg border-none text-sm px-5 py-2.5 me-2 mb-2"
        >
          <FaBars color="#ac2ca8" size={25} />
        </button>
        <Drawer open={isOpen} onClose={handleClose}>
          <Drawer.Header title="Course" />
          <Drawer.Items>
            <CourseSidebar coursedata={coursedata} />
          </Drawer.Items>
        </Drawer>
      </div>
      <div className="hidden lg:block">
        <CourseSidebar coursedata={coursedata} />
      </div>
    </>
  );
}
