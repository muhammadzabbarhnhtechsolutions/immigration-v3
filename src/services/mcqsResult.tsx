// services/courseModuleServices.ts
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import axiosInstance from "@/api/axiosInstance";

type ErrorResponse = {
  error?: string;
  message?: string;
};

export const getMcqsResult = async (
  router: AppRouterInstance,
  test_id: string
) => {
  try {
    const response = await axiosInstance.get(
      `/user/mcq_test_result/?test_id=${test_id}`
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

export const getMcqsDetailedResult = async (
  router: AppRouterInstance,
  test_id: string
) => {
  try {
    const response = await axiosInstance.get(
      `/user/mcqs_result_with_correct_options/?test_id=${test_id}`
    );
    return response.data; // expecting { status, message, data: { test_id, test_title, ... } }
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
