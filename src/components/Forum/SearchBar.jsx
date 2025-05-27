import { Search } from "lucide-react";
import React from "react";



const SearchBar = (props) => {
  return (
    <div className="w-full mx-auto relative mb-8 flex items-center  border border-gray-500 rounded-md border-opacity-10">
      <input
        placeholder="Search..."
        className=" w-full bg-clip-padding outline-none rounded-md backdrop-filter backdrop-blur-sm bg-opacity-10  bg-[#15181b] p-2"
      />
      <button className="absolute flex items-center gap-2 right-0 top-0 z-20 bg-[#B72EB2D6] p-2 rounded-md">
        <Search size={20} /> Search
      </button>
    </div>
  );
};

export default SearchBar;
