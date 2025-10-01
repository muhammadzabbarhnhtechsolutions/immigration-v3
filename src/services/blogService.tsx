// services/blogService.ts
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import axiosInstance from "@/api/axiosInstance";

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
    return null;
  }
};
