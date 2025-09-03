import { AxiosError } from "axios";
import { toast } from "react-toastify";
import axiosInstance from "@/api/axiosInstance";
type ErrorResponse = {
  error?: string;
  message?: string;
};
export const getVideoTrailor = async () => {
  try {
    const response = await axiosInstance.get("user/video/trailor/view/");
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    const errorMessage =
      axiosError?.response?.data?.error ||
      axiosError?.response?.data?.message ||
      "Something went wrong";

    toast.error(errorMessage);
    return null;
  }
};
