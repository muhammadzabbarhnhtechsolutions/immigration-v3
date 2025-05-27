import Image from "next/image";
import React, { useState } from "react";



const Comment = ({
  comment,
  comment_by,
  user_profile_url,
  comment_at_date,
  comment_at_time,
}) => {


  const [openModal, setOpenModal] = useState(false);
  const [loader, setLoader] = useState(false);

  function onCloseModal() {
    setOpenModal(false);
  }
  return (
    <>


      <div className="flex gap-1 py-2">
        <div className="">
          <Image className="rounded-full" src={user_profile_url} alt={comment_by} width={60} height={60} />
        </div>
        <div className="bg-[#5aaa7c] basis-96 p-3 rounded-md">
          <span className="text-[#27AAE1]">{comment_by} </span>: {comment}
          <div className="opacity-70 text-[13px]">
            <span>{comment_at_date} at {comment_at_time}</span>
          </div>
        </div>
      </div>

      {/* <div className="flex items-center gap-2 w-[100%]">
        <button onClick={() => setOpenModal(true)} className=" px-3 py-2 rounded-xl w-full">
          Comments
        </button>
      </div> */}



      
    </>
  );
};

export default Comment;
