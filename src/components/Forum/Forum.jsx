"use client";
import { setUpdatePost } from "@/app/Redux/features/ForumSlice";
import { GeAllPosts, GetProfile } from "@/services/postServices";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ForumLeftSide from "./ForumLeftSide";
import ForumList from "./ForumList";
import ForumTopBar from "./ForumTopBar";
import {RecentComments} from './RecentComments'

const Forum = () => {
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const [profile, setProfile] = useState()
  const handleActive = () => {
    setActive(!active);
  };

  const AllPosts = async () => {
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
    }
  };

  const getProfileData = async () => {
    try {
      const result = await GetProfile()
      if (result.data) {
        setProfile(result.data.data);
      }
    } catch (_) {
      toast.error('something went wrong')
    }
  }

  useEffect(() => {
    getProfileData()
  }, [])

  return (
    <div className="pt-[90px] pb-[90px] h-[calc(100vh+20vh)] font-lato hero_animation_forum z-50 ">
      <div className="w-[90%] max-w-screen-2xl flex flex-col mx-auto mt-1">
        <div className="flex gap-6">
          <div className="hidden lg:block w-[25%] sticky  h-[calc(100vh-7rem)] overflow-y-auto">
            <ForumLeftSide profileData={profile} />
          </div>

          <div className="w-full lg:w-[75%]">
            <div className="sticky  z-10 ">
              <ForumTopBar profileData={profile} handleActive={handleActive} refreshPosts={AllPosts} />
            </div>

            <div className="flex   gap-4 mt-4">
              <div className="w-full lg:w-[70%] overflow-y-auto  h-[100vh]">
                <ForumList />
              </div>

              <div className="hidden lg:block w-[30%] sticky top-28 h-[calc(100vh-7rem)] overflow-y-auto">
                <div className="mb-4">
                  <RecentComments profileData={profile} />
                  {/* <h1 className="text-2xl text-center font-extrabold underline mb-2">House Rules:</h1>
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
                  </ol> */}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forum;
