import {
  
  Newspaper,
  UserPlus,
  Video,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { GeAllPostsUser } from "@/services/userPost";
import { GeAllPosts } from "@/services/postServices";
import { toast } from "react-toastify";
import Comment from "./Comment";
import {  setNextPage, setPostData, setPreviousPage, UserPost } from "@/app/Redux/features/ForumSlice";
import Link from "next/link";


const ForumLeftSide = (props) => {
  const dispatch = useDispatch();

  const Profile = useSelector((state) => state.example.profile);
  const ProfileImg = Profile?.profile
  const Name = Profile?.name

  const [openModal, setOpenModal] = useState(false);
  const [loader, setLoader] = useState(false);
  // user posts 
  const fetchAllUserPost = async () => {
    setLoader(true);
    try {
      const result = await GeAllPostsUser(); // Fetch the initial posts
      if ("data" in result) {
        const Data = result?.data;
        if (Data?.status) {
          dispatch(setPostData([])); // Store posts in Redux
          dispatch(UserPost(Data.results)); // Store posts in Redux
          dispatch(setNextPage(Data.next)); // Store posts in Redux
          dispatch(setPreviousPage(Data.previous)); // Store posts in Redux
          console.log('user all post', Data)
          setLoader(false);
          // window.scrollTo(0, 0);
        } else {
          toast.error(Data.message || "Error occurred");
        }
      } else {
        toast.error(result.message || "Error occurred");
      }
    } catch (error) {
      setLoader(false);
      toast.error('Something went wrong');
      console.error("Error fetching posts", error);
    }
  };

  // all posts 
  const fetchAllPosts = async () => {
    setLoader(true);
    try {
      const result = await GeAllPosts(); // Fetch the initial posts
      if ("data" in result) {
        const Data = result?.data;
        if (Data?.status) {
          dispatch(UserPost([])); // Store posts in Redux
          dispatch(setPostData(Data.results)); // Store posts in Redux
          dispatch(setNextPage(Data.next)); // Store posts in Redux
          dispatch(setPreviousPage(Data.previous)); // Store posts in Redux
          // window.scrollTo(0, 0);
        } else {
          toast.error(Data.message || "Error occurred");
        }
      } else {
        toast.error(result.message || "Error occurred");
      }
    } catch (error) {
      setLoader(false);
      toast.error('Something went wrong');
      console.error("Error fetching posts", error);
    }
  };




  return (
    <div className="flex flex-col ">
      {/* <SearchBar /> */}
      <div className="mb-2">
        <video width={400} controls>
          <source src="/assets/fightclub.mp4" type="video/mp4" />
          {/* <source src="mov_bbb.ogg" type="video/ogg" /> */}
          Your browser does not support HTML video.
        </video>
      </div>
      <div className="bg-form bg-cover rounded-lg p-4 px-6 flex items-center gap-4 cursor-pointer">
        <div className="w-[30%] bg-white rounded-full p-2  ">
          <Image
            src={ProfileImg ? ProfileImg : "/assets/user.png"}
            alt="user"
            width={100}
            height={100}
            className=""
          />
        </div>
        <div className="flex flex-col gap-2 ">
          <h1 className="text-lg"> {Name ? Name :"User Name"}</h1>
        </div>
      </div>
      <div className="px-4">
        <ul>

          <li className="flex gap-4 items-center cursor-pointer" onClick={() => fetchAllUserPost()}>
            <Newspaper stroke="none" fill="#8DC63F" />
            <span className="border-b py-4 w-full">My Posts</span>
          </li>
          <li className="flex gap-4 items-center cursor-pointer" onClick={() => fetchAllPosts()}>
            <Newspaper stroke="none" fill="#8DC63F" />
            <span className="border-b py-4 w-full">All Newsfeed</span>
          </li>
         <Link href={'/profile'}> <li className="flex gap-4 items-center cursor-pointer" >
            <UserPlus stroke="none" fill="#8DC63F" />
            <span className="border-b py-4 w-full">Profile</span>
          </li></Link>
          {/* <li className="flex gap-4 items-center cursor-pointer">
            <MessageSquare stroke="none" fill="#F7941E" />
            <span className="border-b py-4 w-full">Previous Form</span>
          </li>
          <li className="flex gap-4 items-center cursor-pointer">
            <Images stroke="none" fill="#1C75BC" />
            <span className="border-b py-4 w-full">Images</span>
          </li>
          <li className="flex gap-4 items-center cursor-pointer">
            <Video stroke="none" fill="#9E1F63" />
            <span className="border-b py-4 w-full">Videos</span>
          </li> */}
        </ul>
      </div>
      
    </div>
  );
};

export default ForumLeftSide;
