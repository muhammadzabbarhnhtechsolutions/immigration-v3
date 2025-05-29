"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignupAuthService } from "../../../services/authServices";

export default function MainComponent() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    // username: "",
    email: "",
    password: "",
    agreeToTerms: false,
    profile: null, // Image file
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files[0]
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.agreeToTerms) {
      setError("You must agree to the privacy policy");
      setLoading(false);
      return;
    }

    try {
      const payload = new FormData();
      payload.append("first_name", formData.firstName);
      payload.append("last_name", formData.lastName);
      payload.append("email", formData.email);
      payload.append("password", formData.password);
      if (formData.profile) {
        payload.append("profile", formData.profile);
      }

      const res = await SignupAuthService(payload);
      if (res.data.status) {
        router.push("/login");
      }
    } catch (err) {
      console.error(err);
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-[#f2f6f4] p-8 rounded-lg shadow-sm w-full max-w-md">
        <h1 className="text-2xl text-center text-[#87AA9C] mb-8">Register</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm mb-1">First Name</label>
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

          {/* <div>
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
          </div> */}

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
                className="absolute right-0 cursor-pointer text-white bg-blue-600 px-3 py-[11px] hover:text-gray-700"
                onClick={() => setShowPassword(prev => !prev)}
              >
                {showPassword ? (
                  <EyeOff className="text-white" size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Profile Image</label>
            <input
              type="file"
              name="profile"
              accept="image/*"
              onChange={handleInputChange}
              className="w-full px-3 bg-white py-2 border border-gray-200 rounded"
            />
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
              other purposes described in our{" "}
              <a href="#" className="text-blue-600">
                privacy policy
              </a>
              .
            </label>
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-24 py-2 px-4 bg-[#87AA9C] text-white rounded hover:bg-[#769589] disabled:opacity-50"
          >
            {loading ? "..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
