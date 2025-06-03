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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleSignIn = async () => {
    setLoader(true);
    try {
      const result = await LoginAuthService({ email, password });
      setLoader(false);
      if (result?.data?.status === true) {
        const Data = result.data.data;
        setAccessToken(Data?.token);
        console.log(Data,'DataDataData');
        
        localStorage.setItem("user", JSON.stringify(Data));
        localStorage.setItem("course_id", Data?.course?.id || "");
        toast.success(Data?.message || "Login successful");
        if(!Data.is_active){
          router.push("/pricing");
        }else{
          router.push("/");
        }
      } else {
    
      }
    } catch (error) {
      setLoader(false);
      toast.error("Something went wrong");
      console.error("Login error:", error);
    }
  };

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  return (
    <div className="min-h-screen flex items-center flex-col justify-center bg-gray-50">
      <h1 className="text-3xl text-center font-semibold text-[#87AA9C] mb-8">Login</h1>
      <div className="bg-[#f2f6f4] p-8 rounded-lg shadow-sm w-full max-w-md">
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleSignIn(); }}>
          <div>
            <label className="block text-sm mb-1">
              Username or email address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => handleInputChange(e, setEmail)}
              className="w-full bg-white px-3 py-2 border border-gray-200 rounded"
              required
            />
          </div>

          <div className="relative">
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
                className="absolute right-0 cursor-pointer text-white bg-blue-600 px-3 py-[11px] hover:text-gray-700"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff className="text-white" size={20} /> : <Eye size={20} />}
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <input type="checkbox" name="rememberMe" className="h-4 w-4 bg-white text-blue-600 rounded border-gray-300" />
            <label className="ml-2 text-sm">Remember me</label>
          </div>

<div className="mt-4 text-right text-sm text-blue-600 hover:underline">
  <Link href="#">Forgotten your password?</Link>
</div>
        
<button
  type="submit"
  disabled={loader}
  className="py-2 px-4 w-full bg-[#87AA9C] text-white rounded hover:bg-[#769589]"
>
  {loader ? "Loading..." : "Login"}
</button>




        </form>
      </div>
    </div>
  );
}
