import axiosInstance from "@/api/axiosInstance"
import { AxiosError } from "axios";
import { toast } from "react-toastify";


interface ErrorResponse {
  message?: string; // Optional message property
  error?: string; // Optional message property

}

export const getProfile = async () => {

  try {
    const response = await axiosInstance.get('user/user_profile/profile/');
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


export const ProfileUpdate = async (data: { name: string; profile: string | File | null }) => {
  const formData = new FormData();
  formData.append('name', data?.name);
 if (data?.profile instanceof File) {
  formData.append('profile', data?.profile); // Append profile if it's a File
}
  try {
    const response = await axiosInstance.put('user/user_profile/profile/', formData, {
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

export const ChangePassword = async (data: { oldpassword: string; newpassword: string }) => {
  const formData = new FormData();

  // Convert numbers to strings before appending
  formData.append('oldpassword', data.oldpassword.toString());
  formData.append('newpassword', data.newpassword.toString());


  try {
    const response = await axiosInstance.post('user/user_profile/changePassword/', formData, {
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


