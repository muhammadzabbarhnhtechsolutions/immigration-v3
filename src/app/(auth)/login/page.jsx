"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { LoginAuthService } from "@/services/authServices";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { setAccessToken } from "@/utils/localStorage";

export default function MainComponent() {
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState  ('');
  const [password, setPassword] = useState ('');
  const [showPassword, setShowPassword] = useState  (false);

  const router = useRouter();
  const handleSignIn = async () => {
    setLoader(true);
    const values = { email, password }; // Gather form data into values
    try {
      const result = await LoginAuthService(values); // Make async API call
      setLoader(false);
      if ("data" in result) {
        const Data = result.data
        if (Data?.status) {
          console.log('data', Data)
          setAccessToken(Data?.token)
          localStorage.setItem('user', JSON.stringify(Data?.payload));
          localStorage.setItem('course_id', Data?.course.id);
          toast.success(Data.message)
          router.push('/'); // Navigate to the sign-in page on success
        }
      }


    } catch (error) {
      toast.error('something went wrong')
      console.error("Sigin error", error);
      setLoader(false);
    }
  };


  const handleInputChange = (e, func) => {
    func(e.target.value);
  };

  return (
    <div className="min-h-screen flex items-center flex-col justify-center bg-gray-50">
      <h1 className="text-3xl  text-center font-semibold text-[#87AA9C] mb-8">Login</h1>
      <div className="bg-[#f2f6f4] p-8 rounded-lg shadow-sm w-full max-w-md">
        <form className="space-y-6">
          <div>
            <label className="block text-sm mb-1">
              Username or email address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              onChange={(e) => handleInputChange(e, setEmail)}
              value={email}
              className="w-full bg-white px-3 py-2 border border-gray-200 rounded"
              required
            />
          </div>

          <div className="relative item-center">

            <label className="block text-sm mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="flex justify-center items-center">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => handleInputChange(e, setPassword)}
                className="w-full bg-white px-3 py-2 border border-gray-200 rounded pr-10"
                required
              />
              <div
                className="absolute right-0 cursor-pointer text-white  bg-blue-600 px-3 py-[11px] hover:text-gray-700"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff className="text-white" size={20} /> : <Eye size={20} />}
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="rememberMe"

              className="h-4 w-4 bg-white text-blue-600 rounded border-gray-300"
            />
            <label className="ml-2 text-sm">Remember me</label>
          </div>

         
      
            <button
              onClick={handleSignIn}
              type="button"
              // disabled={loading}
              className="py-2 px-4 w-full cursor-pointer bg-[#87AA9C] text-white rounded hover:bg-[#769589]"
            >
              {loader ? "Loading..." : "Login"}
            </button>
     

          <div className="text-sm text-blue-600 hover:underline">
            <a href="#">Forgotten your password?</a>
          </div>
        </form>
      </div>
    </div>
  );
}
