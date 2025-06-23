// services/courseModuleServices.ts
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import axiosInstance from "@/api/axiosInstance";

type ErrorResponse = {
  error?: string;
  message?: string;
};

export const getAllResources = async (
  router: AppRouterInstance,
) => {
  try {
    const response = await axiosInstance.get(
      `/user/resources/view/`
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

export const filterByResources = async (ids: string[], router: AppRouterInstance) => {
  if (!ids.length) return null;

  const query = ids.map((id) => `resource_ids=${id}`).join("&");

  try {
    const res = await axiosInstance.get(`/user/resources/filter_by_resources/?${query}`);
    return res.data;
  } catch (error: any) {
    if (error.response?.status === 403) {
      router.push("/login");
    } else {
      toast.error(error.response?.data?.message || "Failed to fetch filtered resources");
    }
    return null;
  }
};