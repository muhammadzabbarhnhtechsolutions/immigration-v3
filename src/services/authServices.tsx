import axiosInstance from "@/api/axiosInstance"
import { AxiosError } from "axios";
import { toast } from "react-toastify";


interface ErrorResponse {
  message?: string; // Optional message property
  error?: string; // Optional message property

}
interface SignupPayload {
  first_name: string;
  last_name:  string;
  email:      string;
  password:   string;
  profile:   any;
}


export const SignupAuthService = async (data:SignupPayload) => {
  const formData = new FormData();
  formData.append("first_name", data.first_name);
  formData.append("last_name",  data.last_name);
  formData.append("email",      data.email);
  formData.append("password",   data.password);
  formData.append("password",   data.profile);

  try {
    const response = await axiosInstance.post(
      "user/user_auth/signup/",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (err) {
    const axiosError = err as AxiosError<ErrorResponse>;
    const errorMessage =
      axiosError.response?.data?.error ||
      axiosError.response?.data?.message ||
      "Something went wrong. Please try again later.";

    toast.error(errorMessage);
    console.error("Error during signup:", axiosError);
    // Return the full response if available, otherwise a generic object
    return axiosError.response ?? { status: "error", message: errorMessage };
  }
};
export const LoginAuthService = async (data: { email: string; password: string }) => {
  const formData = new FormData();
  formData.append('email', data?.email);
  formData.append('password', data?.password);
  try {
    const response = await axiosInstance.post('user/user_auth/login/', formData, {
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
