import { Bell, Images, Map, Pencil, Video } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Notification from "./Notification";
import { AddPosts } from "@/services/postServices";
import { toast } from "react-toastify";
import { Button, Label, Modal, Textarea } from "flowbite-react";
import { FaImages } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setUpdatePost } from "@/app/Redux/features/ForumSlice";




const ForumTopBar = ({ handleActive, refreshPosts }) => {
  const [openModal, setOpenModal] = useState(false);
  const [loader, setLoader] = useState(false);
  // const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const fileInputRef = useRef(null); // Ref for input element
  const dispatch = useDispatch();
  
  const Profile = useSelector((state) => state.example.profile);
console.log('Profile=======',Profile)
const ProfileImg = Profile?.profile
  // const handleFileUpload = (e: any) => {
  //   const file = e.target.files[0];
  //   setFile(file)
  // };
  const AddPost = async () => {
    // Trim the caption to avoid empty spaces
    const trimmedCaption = caption.trim();

    // Check if caption or thumbnail is empty
    if (!trimmedCaption && !thumbnail) {
        toast.error('Please provide either a caption or a thumbnail before submitting.');
        return; // Exit the function early
    } 
    setLoader(true);
    const values = { caption: trimmedCaption, thumbnail }; // Gather form data into values
    try {
        const result = await AddPosts(values); // Make async API call
        setLoader(false);
        if ("data" in result) {
            const Data = result.data;
            if (Data?.status) {
              // await refreshPosts();
              dispatch(setUpdatePost(Data?.data)); // Reset the video URL or any other cleanup action
                setOpenModal(false);
                setThumbnail(null);
                setCaption(''); // Clear the input field
                toast.success("Post Added Successfully");
            }
        }
    } catch (error) {
        toast.error('Something went wrong');
        console.error("Error adding post", error);
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
    // Trigger file input when clicking the div
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };


  return (
    <div className="flex items-center gap-4 ">
      <div className="bg-[#262D34] w-[90%] rounded-xl p-3 flex md:flex-row flex-col gap-2 items-center">
        <div className="flex items-center gap-2 w-full">
          <Image src={ ProfileImg  ? ProfileImg :"/assets/user.png"} alt="user" width={50} height={50} />
          <textarea
            className="rounded-md bg-[#2C353D] p-2 w-[100%] outline-none"
            title="up to 1000 words"
            placeholder="Lets share whats going on your mind..."
            rows={2}
            maxLength={1000}
            onClick={() => setOpenModal(true)}
            // value={caption}
            // disabled
            // onChange={(e) => setCaption(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-2 cursor-pointer">
            <Pencil color="#6D6E71" />
            <Images color="#6D6E71"  />
            {/* <input type="file" hidden ref={Inputref} onChange={handleFileUpload} /> */}
            <Video color="#6D6E71" />
            <Map color="#6D6E71" />
          </div>
          <button
            onClick={() => setOpenModal(true)}
            className={`bg-[#5aaa7c] p-2 rounded-lg ${loader ? 'opacity-50 cursor-not-allowed' : ''}`}
            // onClick={() => AddPost()}
            disabled={loader}
          >
            {loader ? 'Loading...' : 'Add'}
          </button>
        </div>
      </div>
      {/* <button onClick={handleActive} className="px-3 border-l">
        
      </button> */}
      <Popover>
        <PopoverTrigger>
          {/* <Bell stroke="none" fill="white" /> */}
        </PopoverTrigger>
        <PopoverContent className="relative ont-inter text-white border border-[#5aaa7c27] bg-gradient-to-b from-transparent to-[#5aaa7c1c]  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10">
          {" "}
          {/* <div className="absolute left-2 z-50">
            <Image
              src={"/assets/Lines.png"}
              alt="lines"
              width={1000}
              height={1268}
            />
          </div> */}
          <h1 className="text-2xl font-bold mb-8">Notifications</h1>
          <Notification />
        </PopoverContent>
      </Popover>


      {/* ADD POST  */}
      <Modal className=" z-[70]" show={openModal} size="lg" onClose={onCloseModal} popup>
        <Modal.Header className="bg-[#2c353d] flex justify-center items-center" > 
            <h3 className=" text-xl font-medium text-white">Create Post</h3>
            </Modal.Header>
        <Modal.Body className="text-white bg-[#2c353d]">
          <div className="space-y-6">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="mind" value="Whats on your mind" className="text-white" />
              </div>
              <Textarea
                id="mind"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Whats on your mind ?"
                rows={4}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Add Photo" className="text-white"/>
              </div>
              <div className="row">
                  <div className="col-md-12">
                    <div
                      style={{
                        border: "2px dotted  #5aaa7c",
                        width: "100%",
                        padding: "30px",
                        backgroundColor: "#efb3ed",
                        display: "flex",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                      onClick={handleThumbnailClick} // Trigger the file input on div click
                    >
                      {thumbnail ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={
                            typeof thumbnail === "string"
                              ? thumbnail
                              : URL.createObjectURL(thumbnail)
                          }
                          width={"200"}
                          height={"200"}
                          alt="Thumbnail Preview"
                        />
                      ) : (
                        <div className="text-center">
                          <FaImages size={100} color="#e907e1" />
                          <p>Click to Add Photo</p>
                        </div>

                      )}
                    </div>
                    <input
                      ref={fileInputRef} // Attach the ref to the input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }} // Hide the file input
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
            </div>

            <div className="w-full flex justify-center">
        <Button 
        disabled={loader} // Enable button only when caption and file are filled up
            onClick={() => AddPost()}
        className="bg-gradient-to-r from-[#B72EB2D6] to-[#DF6ABADB] rounded-lg w-full"
         >  {loader ? 'Loading...' : 'Publish'}
         </Button> {/* Full-width button */}
      </div>

          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ForumTopBar;
