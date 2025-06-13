
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import axiosInstance from "@/api/axiosInstance";

type ErrorResponse = {
  error?: string;
  message?: string;
};

export const getRefrenceMaterial = async (
  router: AppRouterInstance,
  courseId: string
) => {
  try {
    const response = await axiosInstance.get(
      `/user/reference/material/view/`
    );
    return response.data; // expecting { status, message, data: [...] }
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    const statusCode = axiosError?.response?.status;
    const errorMessage =
      axiosError?.response?.data?.error ||
      axiosError?.response?.data?.message;

    if (statusCode === 403) {
      router.push("/login");
    } else {
      toast.error(errorMessage || "Something went wrong");
    }

    return null;
  }
};
