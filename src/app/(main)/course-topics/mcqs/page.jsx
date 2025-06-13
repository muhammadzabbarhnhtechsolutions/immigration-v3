import React from 'react';
import {
  VideoIcon,
  Home,
  User,
  BookOpen,
  Code2,
  BarChart3,
} from 'lucide-react';

const Page = () => {
  const iconClasses = 'w-5 h-5 text-white mb-1';
  const textClasses = 'text-xs text-white';

  return (
    <div className="flex mt-6 min-h-screen">
      {/* Sidebar */}
      <div className="w-[80px] bg-[#5c967d] p-4 flex flex-col gap-6 pt-14 items-center">
        <div className="flex flex-col items-center cursor-pointer">
          <Home className={iconClasses} />
          <span className={textClasses}>Home</span>
        </div>
        <div className="flex flex-col items-center cursor-pointer">
          <User className={iconClasses} />
          <span className={textClasses}>Profile</span>
        </div>
        <div className="flex flex-col items-center cursor-pointer">
          <BookOpen className={iconClasses} />
          <span className={textClasses}>Lessons</span>
        </div>
        <div className="flex flex-col items-center cursor-pointer">
          <Code2 className={iconClasses} />
          <span className={textClasses}>Practice</span>
        </div>
        <div className="flex flex-col items-center cursor-pointer">
          <BarChart3 className={iconClasses} />
          <span className={textClasses}>Progress</span>
        </div>
      </div>

      {/* Main Content */}
     <div className="flex-1 ml-[30px] mt-14 p-6 bg-white space-y-8">
        <h1 className="text-2xl font-bold text-[#88ae98]">M.C.Qs</h1>

        {/* Question 1 */}
        <div className="border rounded-lg p-6">
          <p className="font-medium mb-4">
            If you write a local shared folder and it doesn't work, what might be the reason?
          </p>
          {["Network share was not enabled", "Currently working on the internet", "Internet is not on", "A firewall was not running"].map((option, index) => (
            <label key={index} className="flex items-center gap-2 mb-4 cursor-pointer">
              <input type="radio" name="q1" className="w-4 h-4 accent-[#7EB69E]" />
              <span className="text-gray-700">{option}</span>
            </label>
          ))}
        </div>

        {/* Question 2 */}
        <div className="border rounded-lg p-6">
          <p className="font-medium mb-4">
            Which of the following could cause a shared folder not to work?
          </p>
          {["Network share was not enabled", "Currently working on the internet"].map((option, index) => (
            <label key={index} className="flex items-center gap-2 mb-4 cursor-pointer">
              <input type="radio" name="q2" className="w-4 h-4 accent-[#7EB69E]" />
              <span className="text-gray-700">{option}</span>
            </label>
          ))}
        </div>

        {/* Question 3 */}
        <div className="border rounded-lg p-6">
          <p className="font-medium mb-4">
            What could be a possible cause of failure in accessing a local shared folder?
          </p>
          {["Currently working on the internet", "Internet is not on"].map((option, index) => (
            <label key={index} className="flex items-center gap-2 mb-4 cursor-pointer">
              <input type="radio" name="q3" className="w-4 h-4 accent-[#7EB69E]" />
              <span className="text-gray-700">{option}</span>
            </label>
          ))}
        </div>

        {/* Question 4 */}
        <div className="border rounded-lg p-6">
          <p className="font-medium mb-4">
            What protocol is commonly used for file sharing on local networks?
          </p>
          {["FTP", "SMTP", "SMB", "HTTP"].map((option, index) => (
            <label key={index} className="flex items-center gap-2 mb-4 cursor-pointer">
              <input type="radio" name="q4" className="w-4 h-4 accent-[#7EB69E]" />
              <span className="text-gray-700">{option}</span>
            </label>
          ))}
        </div>

        {/* Question 5 */}
        <div className="border leading-relaxed rounded-lg p-6">
          <p className="font-medium mb-4">
            Which setting needs to be enabled for a device to be discoverable on a network?
          </p>
          {["Public folder sharing", "Network discovery", "Firewall exception", "Remote desktop"].map((option, index) => (
            <label key={index} className="flex items-center  gap-2 mb-4 cursor-pointer">
              <input type="radio" name="q5" className="w-4 h-4 accent-[#7EB69E]" />
              <span className="text-gray-700">{option}</span>
            </label>
          ))}
        </div>

        {/* Question 6 */}
        <div className="border rounded-lg p-6">
          <p className="font-medium mb-4">
            What tool is commonly used to test network connectivity between two computers?
          </p>
          {["Ping", "Traceroute", "IPConfig", "ARP"].map((option, index) => (
            <label key={index} className="flex items-center gap-2 mb-4 cursor-pointer">
              <input type="radio" name="q6" className="w-4 h-4 accent-[#7EB69E]" />
              <span className="text-gray-700">{option}</span>
            </label>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-100 transition">
            Previous
          </button>
          <button className="px-4 py-2 bg-[#7EB69E] text-white rounded hover:bg-[#689f89] transition">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
