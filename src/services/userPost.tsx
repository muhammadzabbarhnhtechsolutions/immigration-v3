import axiosInstance from "@/api/axiosInstance"
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface ErrorResponse {
    message?: string; // Optional message property
    error?: string; // Optional message property
  
  }
  
  // POSTS 
  export const GeAllPostsUser = async (url: string = `chatform/user-posts/get_all_posts/`) => {
    try {
  
      const response = await axiosInstance.get(url);
      return response;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const statusCode = axiosError?.response?.status;
      const errorMessage = axiosError?.response?.data?.error || axiosError?.response?.data?.message;
      // toast.error(errorMessage || "Something went wrong");
  
  
      if (axiosError?.response) {
        return axiosError.response;
      } else {
        return { status: "error", message: "Something went wrong. Please try again later." };
      }
    }
  };
  


  // DELETE MY COMT 
export const DeletePost = async (id: string) => {


    try {
      const response = await axiosInstance.delete(`chatform/user-posts/delete_my_post/?post_id=${id}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorMessage = axiosError?.response?.data?.error || axiosError?.response?.data?.message;
  
      toast.error(errorMessage);
      console.error("Error during signup:", axiosError);
      if (axiosError?.response) {
        return axiosError.response;
      } else {
        return { status: "error", message: "Something went wrong. Please try again later." };
      }
    }
  };




  // LIKE My comment  
export const LikeComment = async (id: string) => {
    const formData = new FormData();
    formData.append('comment', id);
  
    try {
      const response = await axiosInstance.post('chatform/comment-like/add_like/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorMessage = axiosError?.response?.data?.error || axiosError?.response?.data?.message;
  
      toast.error(errorMessage);
      console.error("Error during signup:", axiosError);
      if (axiosError?.response) {
        return axiosError.response;
      } else {
        return { status: "error", message: "Something went wrong. Please try again later." };
      }
    }
  };
  