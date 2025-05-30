import axiosInstance from "@/api/axiosInstance"
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface ErrorResponse {
    message?: string; // Optional message property
    error?:string
  }

  export const getPackage = async (router: AppRouterInstance) => {
    const courseId = localStorage.getItem("course_id");
  
    try {
      const response = await axiosInstance.get(`user/course_package/GetPakages/?course_id=${courseId}`);
      return response;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const statusCode = axiosError?.response?.status;
      const errorMessage = axiosError?.response?.data?.error || axiosError?.response?.data?.message;
  
      // If status code is 403, redirect to login
      if (statusCode === 403) {
        // toast.error("Unauthorized access. Please log in.");
        router.push('/auth/login'); // Redirect to login page
      } else {
        // Handle other errors
        toast.error(errorMessage || "Something went wrong");
      }
  
      if (axiosError?.response) {
        return axiosError.response;
      } else {
        return { status: "error", message: "Something went wrong. Please try again later." };
      }
    }
  };




  

export const SubscribePackage = async (id: number) => {
    const formData = new FormData();
    formData.append('package_id', id.toString());
    try {
        const response = await axiosInstance.post('/user/user_subscription/subscribe/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errorMessage = axiosError?.response?.data?.message || "Something went wrong";
        toast.error(errorMessage);
        console.error("Error during signup:", axiosError);
        if (axiosError?.response) {
          return axiosError.response;
        } else {
          return { status: "error", message: "Something went wrong. Please try again later." };
        }
      }
};





