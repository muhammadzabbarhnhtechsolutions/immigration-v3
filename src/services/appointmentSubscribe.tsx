// services/appointmentDocumentService.ts
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import axiosInstance from "@/api/axiosInstance";

type ErrorResponse = {
  error?: string;
  message?: string;
};

export const appointmentPakageBuy = async (
  router: AppRouterInstance,
  package_id: FormData
) => {
  try {
    const response = await axiosInstance.post(
      `/user/payment/create_appointment_checkout/`,
      package_id
      // ✅ No need to pass headers here at all
    );

    return response.data;
    
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

