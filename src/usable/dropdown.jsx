import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

export default function Dropdown({ children }) {
    // State to track visibility of DescriptionBox
    const [isVisible, setIsVisible] = useState(false);

    // Function to toggle visibility
    const toggleDescriptionBox = () => {
        setIsVisible(!isVisible);
    };

    return (
        <>
            <div className="flex justify-between items-center gap-2 cursor-pointer" onClick={toggleDescriptionBox} style={{ marginTop: "22px" }}>
                <p className="text-[1.3rem] md:text-[29px] text-dark font-bold font-popins">Description</p>
                <hr className="bg-dark w-full" style={{ height: "2px", color: "#000000" }} />
                <div
                    className="bg-[rgba(255,255,255,0.4)] rounded-full border-2 border-[#263238] flex items-center justify-center"
                >
                    <span><IoMdArrowDropdown size={20} color="#160845" /></span>
                </div>
            </div>

            {/* Conditionally render DescriptionBox based on isVisible */}
            {isVisible && children}
        </>
    );
}
