// services/courseModuleServices.ts
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import axiosInstance from "../api/axiosInstance";

type ErrorResponse = {
  error?: string;
  message?: string;
};

export const getAppointments = async (router: AppRouterInstance) => {
  try {
    const res = await axiosInstance.get(`/user/appointment/view/`);
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError<any>;
    if (axiosError.response?.status === 403) {
      router.push("/login");
    } else {
      toast.error(
        axiosError.response?.data?.message || "Failed to fetch appointments"
      );
    }
    return null;
  }
};
