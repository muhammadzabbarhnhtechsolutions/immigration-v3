"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { LoginAuthService } from "@/services/authServices";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { setAccessToken } from "@/utils/localStorage";

export default function MainComponent() {
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();
const nextPath = searchParams.get("next") || "/"; // Default to "/" if no next

  const handleSignIn = async () => {
    setLoader(true);
    try {
      const result = await LoginAuthService({ email, password });
      setLoader(false);
      if (result?.data?.status === true) {
        const Data = result.data.data;
        setAccessToken(Data?.token);
        localStorage.setItem("user", JSON.stringify(Data));
        localStorage.setItem("course_id", Data?.course?.id || "");
        toast.success(Data?.message || "Login successful");
        // router.push(Data.is_active ? "/" : "/pricing");
              router.push(nextPath);

      }
    } catch (error) {
      setLoader(false);
      toast.error("Something went wrong");
    }
  };

//   const handleSignIn = async () => {
//   setLoader(true);
//   try {
//     const result = await LoginAuthService({ email, password });
//     setLoader(false);
//     if (result?.data?.status === true) {
//       const Data = result.data.data;
//       setAccessToken(Data?.token);
//       localStorage.setItem("user", JSON.stringify(Data));
//       localStorage.setItem("course_id", Data?.course?.id || "");
//       toast.success(Data?.message || "Login successful");

//       // ✅ Redirect back to original path
//       router.push(nextPath);
//     }
//   } catch (error) {
//     setLoader(false);
//     toast.error("Something went wrong");
//   }
// };


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] px-4 py-10">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md animate-fade-in">
        <h1 className="text-3xl font-semibold text-center text-[#5bb180] mb-6">Welcome Back</h1>

        <form onSubmit={(e) => { e.preventDefault(); handleSignIn(); }} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5bb180] bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5bb180] bg-gray-50"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
          </div>

          <div className="flex items-center text-sm text-gray-700">
            <input
              type="checkbox"
              name="rememberMe"
              className="h-4 w-4 text-[#5bb180] border-gray-300 rounded mr-2"
            />
            <label>Remember me</label>
          <div className="text-right text-sm ml-16" >
            <Link href="#" className="text-blue-600 hover:underline">
              Forgotten your password?
            </Link>
          </div>
          </div>


          <button
            type="submit"
            disabled={loader}
            className="w-full py-2.5 bg-[#58a57a] text-white rounded-lg hover:bg-[#5bad7f] transition-all disabled:opacity-50"
          >
            {loader ? "Logging in..." : "Login"}
          </button>

          <div className="text-center text-sm text-gray-700 mt-2">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </div>

          {/* <div className="text-center text-xs text-gray-500 mt-4 leading-5 px-2">
            By logging in, you agree to our{" "}
            <Link href="#" className="text-blue-600 underline">
              privacy policy
            </Link>{" "}
            and acknowledge the secure use of your data to enhance your experience with Immigration Navigator.
          </div> */}
        </form>
      </div>
    </div>
  );
}
