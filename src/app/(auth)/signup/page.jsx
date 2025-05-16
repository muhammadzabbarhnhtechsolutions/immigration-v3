"use client"

import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
export default function MainComponent() {
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      agreeToTerms: false,
    });
      const [showPassword, setShowPassword] = useState(false);
    
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    // const { signUpWithCredentials } = useAuth();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
  
      if (!formData.agreeToTerms) {
        setError("You must agree to the privacy policy");
        setLoading(false);
        return;
      }
  
     
    };
  
    const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    };
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-[#f2f6f4] p-8 rounded-lg shadow-sm w-full max-w-md">
          <h1 className="text-2xl text-center text-[#87AA9C] mb-8">Register</h1>
  
          <form  className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm mb-1">First Name</label>
            {/* /'dfs */}
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-3 bg-white py-2 border border-gray-200 rounded"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-3 bg-white py-2 border border-gray-200 rounded"
                  required
                />
              </div>
            </div>
  
            <div>
              <label className="block text-sm mb-1">
                Username <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded"
                required
              />
            </div>
  
            <div>
              <label className="block text-sm mb-1">
                Email address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 bg-white py-2 border border-gray-200 rounded"
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
  value={formData.password}
  onChange={handleInputChange}
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
  
            <div className="flex items-start mt-4">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="mt-1 h-4 w-4 text-blue-600 rounded border-gray-300"
              />
              <label className="ml-2 text-sm">
                Your personal data will be used to support your experience across
                Immigration Navigator, to manage access to your account and for
                other purposed described in our{" "}
                <a href="#" className="text-blue-600">
                  privacy policy
                </a>
                .
              </label>
            </div>
  
            {error && <div className="text-red-500 text-sm">{error}</div>}
  <Link href="/login">
            <button
              type="submit"
              disabled={loading}
              className="w-24 py-2 cursor-pointer px-4 bg-[#87AA9C] text-white rounded hover:bg-[#769589]"
            >
              Register
            </button>
            </Link>
          </form>
        </div>
      </div>
    );
  }
  
  
  
  