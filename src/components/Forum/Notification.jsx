import Image from "next/image";
import React from "react";



const Notification = (props) => {
  return (
    <div className="flex flex-col gap-2">
      {[1, 2, 3, 4].map(() => (
        <div className="before:absolute before:top-0 before:left-1/2 before:transform before:-translate-x-1/2 before:w-1/2 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-[#5aaa7c] before:to-transparent before:rounded-xl rounded-xl flex gap-2 items-center bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 py-4 px-2">
          <div>
            <Image src={"/assets/user.png"} alt="user" width={30} height={30} />
          </div>
          <div className="flex flex-col gap-2 opacity-70">
            <h1 className=" font-bold bg-gradient-to-r from-blue-300 via-blue-700 to-blue-700 bg-clip-text text-transparent">
              Diana Amber
            </h1>
            <h1 className="text-xs">New Feature - Apr 30, 2024</h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notification;
