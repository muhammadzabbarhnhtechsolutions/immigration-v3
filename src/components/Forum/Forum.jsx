"use client";
import React, { useEffect, useState } from "react";
import ForumLeftSide from "./ForumLeftSide";
import ForumTopBar from "./ForumTopBar";
import ForumList from "./ForumList";
// import RecentComment from "./RecentComment";
// import SearchBar from "./SearchBar";
import { GeAllPosts } from "@/services/postServices";
import { toast } from "react-toastify";
// import { Root } from "@/utils/posttypes";
import {  setUpdatePost } from "@/app/Redux/features/ForumSlice";
import { useDispatch } from "react-redux";
import Fightlogo from "../../assets/logo1.png"
import Image from "next/image";



const Forum = (props) => {
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const handleActive = () => {
    setActive(!active);
  };

  useEffect(() => {
    // AllPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const AllPosts = async () => {
    console.log('mai chal raha ho')
    try {
      const result = await GeAllPosts();
      if ("data" in result) {
        const Data = result?.data
        if (Data?.status) {
          dispatch(setUpdatePost(Data.results)); // Reset the video URL or any other cleanup action
        }
      }
      else {
        toast.error(result.message || "Error occurred");
      }

    }
    catch (error) {
      toast.error('something went wrong')
      console.error("Signup error", error);
      // setLoader(false);
    }
  };


  return (
    <div className="pt-[90px] pb-[90px] h-[calc(100vh+20vh)] font-lato hero_animation_forum z-50 ">
      {/* <div className="block lg:hidden w-[90%] mx-auto">
        <SearchBar />
      </div> */}
      {/* {active && (
        <div className="absolute right-0 top-44 flex justify-end w-full float-right z-50 transition-all ease-in-out duration-300 ">
          <Notification />
        </div>
      )} */}
      {/* <div className="bg-white h-44 w-full p-5 flex items-center justify-center">
        <Image src={Fightlogo} alt="" width={200} height={100} />
      </div> */}

      <div className="w-[90%] max-w-screen-2xl flex flex-col mx-auto mt-1">
        <div className="flex gap-6">
          <div className="hidden lg:block w-[25%] sticky  h-[calc(100vh-7rem)] overflow-y-auto">
            <ForumLeftSide />
          </div>

          <div className="w-full lg:w-[75%]">
            <div className="sticky  z-10 ">
              <ForumTopBar handleActive={handleActive} refreshPosts={AllPosts} />
            </div>

            <div className="flex   gap-4 mt-4">
              <div className="w-full lg:w-[70%] overflow-y-auto  h-[calc(100vh-12rem)]">
                <ForumList />
              </div>

              <div className="hidden lg:block w-[30%] sticky top-28 h-[calc(100vh-7rem)] overflow-y-auto">
                <div className="mb-4">
                  <h1 className="text-2xl text-center font-extrabold underline mb-2">House Rules:</h1>
                  <ol className="font-bold" style={{ listStyleType: 'number', paddingLeft: '1rem' }}>
                    <li>Do not give advice you would not take.</li>
                    <li>Always give advice with the
                      Understanding that Members want to
                      STAY married (The only exception is if
                      there is CLEAR ABUSE: Verbal,
                      Physical, nancial, emotional,
                      mental).</li>
                    <li>Speak respectfully to all members
                      -no name calling or rude comments
                      EVER. Or else BANNED w/ no
                      refunds.</li>
                  </ol>
                </div>
                {/* <div>
                  <h1 className="text-xl font-bold">Recent Comments</h1>
                  {[1, 2, 3, 4].map((_, idx) => (
                    <div key={idx}>
                      <RecentComment />
                    </div>
                  ))}
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forum;
