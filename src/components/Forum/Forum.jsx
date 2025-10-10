"use client";
import { setUpdatePost } from "@/app/Redux/features/ForumSlice";
import { GeAllPosts, GetProfile } from "@/services/postServices";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ForumLeftSide from "./ForumLeftSide";
import ForumList from "./ForumList";
import ForumTopBar from "./ForumTopBar";
import { useRouter } from "next/navigation";

const Forum = () => {
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const [profile, setProfile] = useState()
  const handleActive = () => {
    setActive(!active);
  };
 const router = useRouter();
  // useEffect(() => {
  // const user = localStorage.getItem("user"); 
  // if(!user){
  //   router.push("/login");
  
  // }
  
  // }, [])
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
  console.error("Forum error:", error);

  // Extract the backend error safely
  const backendError = error?.response?.data?.error || error?.error;
  const status = error?.response?.status;

  // ✅ If backend says "Need Login" or token invalid
  if (backendError === "Need Login" || status === 401 || status === 403) {
    toast.info("Please login to continue");
    
    // Clear localStorage just in case
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    
    // ✅ Use window.location for hard redirect (always works)
    if (typeof window !== "undefined") {
      window.location.href = "/login";
      return;
    }
  }

  toast.error("Something went wrong");
}

  };

  // const getProfileData = async () => {
  //   try {
  //     const result = await GetProfile()
  //     if (result.data) {
  //       setProfile(result.data.data);
  //     }
  //   } catch (_) {
  //     toast.error('something went wrong')
  //   }
  // }
  const getProfileData = async () => {
  try {
    const result = await GetProfile();
    if (result.data) {
      setProfile(result.data.data);
    }
  } catch (error) {
    console.error("Profile error:", error);
    const backendError = error?.response?.data?.error;
    const status = error?.response?.status;

    if (backendError === "Need Login" || status === 401 || status === 403) {
      toast.info("Please login to continue");
      localStorage.clear();
      window.location.href = "/login";
      return;
    }

    toast.error("Something went wrong");
  }
};


  useEffect(() => {
    getProfileData()
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }, [])

  return (
    <div className="pt-[90px] pb-[90px] h-[calc(100vh+10vh)] font-lato hero_animation_forum z-50 ">
      <div className="w-[90%] max-w-screen-2xl flex flex-col mx-auto mt-1">
        <div className="flex gap-6">
          <div className="hidden lg:block w-[25%] sticky h-[calc(100vh+10vh)] overflow-y-auto">
            <ForumLeftSide profileData={profile} />
          </div>


          <div className="w-full lg:w-[75%]">
            <div className="sticky z-10 ">
              <ForumTopBar profileData={profile} handleActive={handleActive} refreshPosts={AllPosts} />
            </div>

            <div className="flex   gap-4 mt-4">
              <div className="w-full lg:w-full overflow-y-auto  h-[120vh]">
                <ForumList  refreshPosts={AllPosts} />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forum;
