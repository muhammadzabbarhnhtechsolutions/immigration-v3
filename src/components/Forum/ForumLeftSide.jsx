import { setNextPage, setPostData, setPreviousPage, UserPost } from "@/app/Redux/features/ForumSlice";
import { GeAllPosts } from "@/services/postServices";
import { GeAllPostsUser } from "@/services/userPost";
import {
  Images,
  MessageSquare,
  Newspaper,
  User2,
  UserPlus,
  Video
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";


const ForumLeftSide = ({profileData}) => {
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

  console.log(profileData,'profileData');
  



  return (
    <div className="flex flex-col ">
      {/* <SearchBar /> */}
        <div className="relative rounded-lg overflow-hidden cursor-pointer ">
      {/* Background with purple overlay */}
      <div className="absolute inset-0 bg-[url('/your-background.jpg')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-[#3D61AB]" />

      {/* Content */}
      <div className="relative z-10 flex items-center gap-4 p-4">
        <div className="w-[64px] h-[64px] bg-white rounded-full p-1 shrink-0">
          <Image
            src={profileData ? profileData.profile : "/assets/user.png"}
            alt="user"
            width={64}
            height={64}
            className="rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col text-white">
          <h1 className="text-lg font-semibold">{profileData ? `${profileData.first_name} ${profileData.last_name}`  : "User Name"}</h1>
          {/* <div className="flex items-center gap-1 text-sm">
            <User2 className="w-4 h-4" />
            <span>{ "0"} followers</span>
          </div> */}
        </div>
      </div>
    </div>


      <div className="px-4">
        <ul>

          <li className="flex gap-4 items-center cursor-pointer" onClick={() => fetchAllUserPost()}>
            <Newspaper strokeWidth={0.75}  />
            <span className="border-b py-4 w-full">My Newsfeed</span>
          </li>
          <li className="flex gap-4 items-center cursor-pointer" onClick={() => fetchAllPosts()}>
            <MessageSquare strokeWidth={0.75} />
            <span className="border-b py-4 w-full">Previous Forum</span>
          </li>
          <Link href={'/profile'}> <li className="flex gap-4 items-center cursor-pointer" >
            <Images strokeWidth={0.75} />
            <span className="border-b py-4 w-full">Images</span>
          </li></Link>
          <Link href={'/profile'}> <li className="flex gap-4 items-center cursor-pointer" >
            <Video strokeWidth={0.75} />
            <span className="border-b py-4 w-full">Videos</span>
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
