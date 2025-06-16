"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignupAuthService } from "../../../services/authServices";
import Link from "next/link";

export default function MainComponent() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    agreeToTerms: false,
    profile: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
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
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB]  px-4 py-10">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md animate-fade-in">
        <h1 className="text-3xl font-semibold text-center text-[#5bb180] mb-6">Create an Account</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            {["firstName", "lastName"].map((field, idx) => (
              <div className="w-1/2" key={idx}>
                <label className="block text-sm font-medium text-gray-600 mb-1 capitalize">
                  {field === "firstName" ? "First Name" : "Last Name"}
                </label>
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5bb180] bg-gray-50"
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
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
                value={formData.password}
                onChange={handleInputChange}
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

          <div className="flex items-start text-sm text-gray-700">
<div className="flex items-start text-sm text-gray-700">
  <input
    type="checkbox"
    name="agreeToTerms"
    checked={formData.agreeToTerms}
    onChange={handleInputChange}
    className="mt-1 mr-2 h-4 w-4 text-[#5bb180] border-gray-300 rounded"
  />
  <p className="text-[13.3px]">
    I agree to the{" "}
    <button
      type="button"
      onClick={() => setShowPolicy(true)}
      className="text-blue-600 underline hover:text-blue-800 transition"
    >
      Privacy Policy
    </button>
  </p>
  {showPolicy && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/5 bg-opacity-50">
    <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 relative animate-fade-in">
      <h2 className="text-xl font-semibold text-[#5bb180] mb-4">Privacy Policy</h2>
      <div className="text-gray-700 text-sm max-h-[300px] overflow-y-auto space-y-3">
        <p>
          We value your privacy. Your personal information will only be used to create your account,
          support your experience, and comply with legal obligations.
        </p>
        <p>
          We do not share your data with third parties without your consent. For full details, please
          read this policy carefully.
        </p>
        <p>
          By continuing, you acknowledge and agree to our terms outlined here.
        </p>
        {/* Add more detailed paragraphs here as needed */}
      </div>
      <button
        onClick={() => setShowPolicy(false)}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg"
      >
        ×
      </button>
    </div>
  </div>
)}

</div>

          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-[#58a57a] text-white rounded-lg hover:bg-[#5bad7f]  transition-all disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <div className="text-center text-sm text-gray-700 mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
