import  axiosInstance  from "@/api/axiosInstance"
import { AxiosError } from "axios";
import { toast } from "react-toastify";


interface ErrorResponse {
    message?: string; // Optional message property
    error?: string; // Optional message property

  }
export const SignupAuthService = async (data: { name: string; email: string; parentemail:string; password: string; coupan:string }) => {
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('parent_email', data.parentemail);
    formData.append('name', data.name);
    formData.append('password', data.password);
    formData.append('coupon', data.coupan);

    
    try {
        const response = await axiosInstance.post('user/user_auth/signup/', formData, {
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
export const LoginAuthService = async (data: {  email: string; password: string }) => {
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
