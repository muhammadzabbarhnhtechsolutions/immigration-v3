"use client";
import {
  setNextPage,
  setPostData,
  setPreviousPage,
  setUpdatePost,
} from "@/app/Redux/features/ForumSlice";
import { AddPosts, GeAllPosts } from "@/services/postServices";
import { Button, Modal } from "flowbite-react";
import { Images, Smile } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { FaImages } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const ForumTopBar = ({ profileData }) => {
  const [openModal, setOpenModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [caption, setCaption] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const Profile = useSelector((state) => state.example.profile);

  const fetchAllPosts = async () => {
    setIsLoading(true);
    try {
      const result = await GeAllPosts();

      if (result && "data" in result) {
        const Data = result.data;

        if (Data?.status) {
          dispatch(setPostData(Data.results));
          dispatch(setNextPage(Data.next));
          dispatch(setPreviousPage(Data.previous));
        } else {
          toast.error(Data.message || "Failed to fetch posts");
        }
      } else {
        toast.error(result?.message || "Invalid response from server");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const AddPost = async () => {
    const trimmedCaption = caption.trim();

    if (!trimmedCaption && !thumbnail) {
      toast.error(
        "Please provide either a caption or a thumbnail before submitting."
      );
      return;
    }

    setLoader(true);
    const values = { caption: trimmedCaption, thumbnail };

    try {
      const result = await AddPosts(values);
      fetchAllPosts();

      if (result && "data" in result) {
        const Data = result.data;

        if (Data?.status === true) {
          dispatch(setUpdatePost(Data.data));
          toast.success("Post Added Successfully");
          setThumbnail(null);
          setCaption("");
          setOpenModal(false);

          // Page reload after post is successfully added
          window.location.reload();
          // fetchAllPosts();
        } else {
          toast.error(Data.message || "Failed to add post");
        }
      } else {
        toast.error(result?.message || "Invalid response from server");
      }
    } catch (error) {
      console.error("Error adding post:", error);
      toast.error("Something went wrong while adding post");
    } finally {
      setLoader(false);
    }
  };

  function onCloseModal() {
    setOpenModal(false);
  }

  const handleFileChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleThumbnailClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="bg-[#88B29A] rounded-lg shadow p-4 mb-4">
      <Modal
        show={openModal}
        size="md"
        onClose={onCloseModal}
        popup
        position="center"
        className="z-[999999999990] bg-black"
        theme={{
          header: {
            close: {
              base: "ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-white !bg-gray-200 !text-gray-900  z-[9999]",
              icon: "h-5 w-5",
            },
          },
        }}
      >
        <div className="fixed inset-0 rounded-xl flex items-center justify-center p-4">
          <div className="relative  w-full max-w-xl max-h-full">
            <div className="relative  bg-[#88B29A] rounded-lg shadow">
              <Modal.Header className="relative border-b p-4 rounded-t-xl bg-[#88B29A] text-white">
                <h3 className="text-xl text-white font-medium text-center w-full absolute left-0">
                  Create post
                </h3>
              </Modal.Header>
              <Modal.Body className="p-4 rounded-xl bg-[#88B29A]">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-white p-1 overflow-hidden">
                      <Image
                        src={profileData?.profile || "/assets/user.png"}
                        alt="User"
                        width={40}
                        height={40}
                        className="object-cover rounded-full"
                      />
                    </div>
                    <span className="font-medium text-white">
                      {profileData?.first_name} {profileData?.last_name}
                    </span>
                  </div>

                  <div className="flex justify-between text-white">
                    <p>
                      What's on your mind, {profileData?.first_name}{" "}
                      {profileData?.last_name}?
                    </p>
                    <p>
                      <Smile strokeWidth={1} />
                    </p>
                  </div>

                  <div className="border border-white  rounded-lg p-2 text-center">
                    <div
                      className={`cursor-pointer ${
                        !thumbnail ? "p-[3.5rem]" : "p-6"
                      } bg-white h-full`}
                      onClick={handleThumbnailClick}
                    >
                      {thumbnail ? (
                        <>
                          {typeof thumbnail === "string" ? (
                            <img
                              src={thumbnail}
                              alt="Preview"
                              className="max-h-60 mx-auto mb-2 rounded-md"
                            />
                          ) : thumbnail.type.startsWith("image/") ? (
                            <img
                              src={URL.createObjectURL(thumbnail)}
                              alt="Preview"
                              className="max-h-60 mx-auto mb-2 rounded-md"
                            />
                          ) : thumbnail.type.startsWith("video/") ? (
                            <video
                              src={URL.createObjectURL(thumbnail)}
                              controls
                              className="max-h-60 mx-auto mb-2 rounded-md"
                            />
                          ) : thumbnail.type === "application/pdf" ? (
                            <embed
                              src={URL.createObjectURL(thumbnail)}
                              type="application/pdf"
                              className="w-full h-60 mx-auto mb-2 rounded-md"
                            />
                          ) : (
                            <>
                              <FaImages className="mx-auto text-[#88B29A] text-4xl mb-2" />
                              <p className="text-[#88B29A] font-medium">
                                Unsupported file type
                              </p>
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          <FaImages className="mx-auto text-[#88B29A] text-4xl mb-2" />
                          <p className="text-[#88B29A] font-medium">
                            Add photos/videos
                          </p>
                          <p className="text-[#88B29A] text-sm">
                            or drag and drop
                          </p>
                        </>
                      )}

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*,video/*,application/pdf"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>

                  <div>
                    <input
                      id="mind"
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      placeholder={`Add to your post`}
                      className="border-0 p-2 w-full rounded-lg outline-none focus:ring-0"
                    />
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t">
                    <Button
                      disabled={loader || (!caption.trim() && !thumbnail)}
                      onClick={AddPost}
                      className="bg-white w-full text-[#88B29A] px-6"
                    >
                      {loader ? "Posting..." : "Post"}
                    </Button>
                  </div>
                </div>
              </Modal.Body>
            </div>
          </div>
        </div>
      </Modal>
      <div
        className="bg-gray-100 rounded-full p-3 flex items-center gap-3 cursor-pointer hover:bg-gray-200"
        onClick={() => setOpenModal(true)}
      >
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <Image
            src={profileData?.profile || "/assets/user.png"}
            alt="User"
            width={40}
            height={40}
            className="object-cover"
          />
        </div>
        <span className="text-gray-500 flex-grow">What's on your mind?</span>
        <button className="p-2 rounded-md hover:bg-gray-300 text-gray-500">
          <Images size={20} />
        </button>
      </div>
    </div>
  );
};

export default ForumTopBar;
