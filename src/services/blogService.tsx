<<<<<<< HEAD
=======
// services/blogService.ts
>>>>>>> feat/v3
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import axiosInstance from "@/api/axiosInstance";

<<<<<<< HEAD
type ErrorResponse = {
  error?: string;
  message?: string;
};

export const getEBooks = async (router: AppRouterInstance) => {
  try {
    const response = await axiosInstance.get("user/e-book/view/");
    return response.data; // assuming { data: [...] }
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

=======
type ErrorResponse = { error?: string; message?: string };

export const getPaginatedEBooks = async (
  router: AppRouterInstance,
  page = 1
) => {
  try {
    const res = await axiosInstance.get(`/user/e-book/view/?page=${page}`);
    return res.data;
  } catch (err) {
    const axiosErr = err as AxiosError<ErrorResponse>;
    const status = axiosErr.response?.status;
    const msg =
      axiosErr.response?.data?.error || axiosErr.response?.data?.message;
    if (status === 403) router.push("/login");
    else toast.error(msg || "Something went wrong");
    return null;
  }
};

export const searchEBooks = async (
  router: AppRouterInstance,
  query: string
) => {
  try {
    const res = await axiosInstance.get(
      `/user/e-book/ebook_search/?title=${encodeURIComponent(query)}`
    );
    return res.data;
  } catch (err) {
    const axiosErr = err as AxiosError<ErrorResponse>;
    const status = axiosErr.response?.status;
    const msg =
      axiosErr.response?.data?.error || axiosErr.response?.data?.message;
    if (status === 403) router.push("/login");
    else toast.error(msg || "Something went wrong");
>>>>>>> feat/v3
    return null;
  }
};
