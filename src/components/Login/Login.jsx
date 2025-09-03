"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { setAccessToken } from "@/utils/localStorage";
import Image from "next/image";
import { useSignIn } from "@clerk/nextjs";
import { LoginAuthService } from "@/services/authServices";

export default function MainComponent() {
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  // const { signIn } = useSignIn();
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "/";

const { signIn, isLoaded } = useSignIn();

const handleSocialLogin = async (provider) => {
  if (!isLoaded || !signIn) return;

  try {
    await signIn.authenticateWithRedirect({
      strategy: `oauth_${provider}`,
      redirectUrl: `${window.location.origin}/login`,
    });
  } catch (err) {
    console.error("OAuth error:", err);

    const message =
      err?.errors?.[0]?.message ||
      err?.response?.data?.message ||
      err.message;

    if (message === "Session already exists") {
      toast.info("You're already signed in. Redirecting...");
      window.location.href = "/";
    } else {
      toast.error("Failed to login with " + provider);
    }
  }
};
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
        router.push(nextPath);
      }
    } catch (error) {
      setLoader(false);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] px-4 py-10">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md animate-fade-in">
        <h1 className="text-3xl font-semibold text-center text-[#88B29A] mb-6">Welcome Back</h1>

        <form onSubmit={(e) => { e.preventDefault(); handleSignIn(); }} className="space-y-5">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#88B29A]"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#88B29A]"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
          </div>

          {/* Remember Me & Forgot */}
          <div className="flex items-center justify-between text-sm text-gray-700">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-[#88B29A] border-gray-300 rounded mr-2"
              />
              Remember me
            </label>
            <Link href="#" className="text-blue-600 hover:underline">
              Forgot your password?
            </Link>
          </div>

          {/* Social Login Section */}
        {/* <div className="mt-0">
  {/* Divider */}
  {/* <div className="relative mb-6">
    <div className="absolute inset-0 flex items-center">
      <div className="w-full border-t border-gray-300"></div>
    </div>
    <div className="relative flex justify-center text-sm">
      <span className="bg-white px-3 text-gray-500 font-medium">Or continue with</span>
    </div>
  </div> */}

  {/* Social Buttons */}
  {/* <div className="flex justify-center space-x-6">
    {/* Google */}
    {/* <button
      type="button"
      onClick={() => handleSocialLogin("google")}
      className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-gray-200 shadow-sm hover:shadow-lg hover:border-[#ea4335] transition-all duration-300"
      title="Login with Google"
    >
      <Image
        src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
        alt="Google"
        width={26}
        height={26}
        className="w-7 h-7"
      />
    </button>

    {/* LinkedIn */}
    {/* <button
      type="button"
      onClick={() => handleSocialLogin("linkedin")}
      className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-gray-200 shadow-sm hover:shadow-lg hover:border-[#0077b5] transition-all duration-300"
      title="Login with LinkedIn"
    >
      <Image
        src="https://cdn-icons-png.flaticon.com/512/145/145807.png"
        alt="LinkedIn"
        width={26}
        height={26}
        className="w-6 h-6"
      />
    </button> */}

    {/* Apple */}
    {/* <button
      type="button"
      onClick={() => handleSocialLogin("apple")}
      className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-gray-200 shadow-sm hover:shadow-lg hover:border-black transition-all duration-300"
      title="Login with Apple"
    >
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
        alt="Apple"
        width={22}
        height={24}
        className="w-5 h-6"
      /> */}
    {/* </button>  */}
  {/* </div>  */}
{/* </div>  */}


          {/* Submit Button */}
          <button
            type="submit"
            disabled={loader}
            className="w-full py-2.5 bg-[#88B29A] text-white rounded-lg hover:bg-[#88B29A] transition-all disabled:opacity-50"
          >
            {loader ? "Logging in..." : "Login"}
          </button>

          {/* Sign up Link */}
          <div className="text-center text-sm text-gray-700 mt-2">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
