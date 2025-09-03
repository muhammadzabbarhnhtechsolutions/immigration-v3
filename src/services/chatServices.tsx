// services/getChatMessages.ts
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import axiosInstance from "@/api/axiosInstance";

type ErrorResponse = { error?: string; message?: string };

export const getChatMessages = async (
  appointmentId: string,
  router: AppRouterInstance
) => {
  try {
    const res = await axiosInstance.get(
      `/user/sent/message_view/?appointment_id=${appointmentId}`
    );
    return res.data.data; // returns array of messages
  } catch (err) {
    const e = err as AxiosError<ErrorResponse>;
    const msg = e.response?.data.error || e.response?.data.message || "Server error";
    if (e.response?.status === 403) router.push("/login");
    else toast.error(msg);
    return null;
  }
};

export const sendChatMessage = async (
  router: AppRouterInstance,
  appointmentId: string,
  message: string
) => {
  try {
    const res = await axiosInstance.post("/user/sent/message/", {
      appointment: appointmentId,
      message,
    });
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    const statusCode = axiosError?.response?.status;
    const errorMessage =
      axiosError?.response?.data?.error ||
      axiosError?.response?.data?.message ||
      "Failed to send message";

    if (statusCode === 403) {
      router.push("/login");
    } else {
      toast.error(errorMessage);
    }

    return null;
  }
};
