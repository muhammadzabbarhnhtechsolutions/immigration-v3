import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import axiosInstance from "@/api/axiosInstance";

type ErrorResponse = {
  error?: string;
  message?: string;
};

export const getBuisnessAccount = async (router: AppRouterInstance) => {
  try {
    const response = await axiosInstance.get("/user/business/account_view/");
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

    return null;
  }
};
export const UpdateBuisnessAccount = async (
  router: AppRouterInstance,
  data: {
    id: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
  }
) => {
  try {
    const response = await axiosInstance.patch("/user/business/account_update/", data);
    toast.success("Business account updated successfully");
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    const statusCode = axiosError?.response?.status;
    const errorMessage =
      axiosError?.response?.data?.error || axiosError?.response?.data?.message;

    if (statusCode === 403) {
      router.push("/login");
    } else {
      toast.error(errorMessage || "Something went wrong");
    }

    return null;
  }
};
// 🔸 Delete Business Account
export const DeleteBusinessAccount = async (
  router: AppRouterInstance,
  id: string
) => {
  try {
    const response = await axiosInstance.delete(`/user/business/account_delete/${id}/`);
    toast.success("Business account deleted successfully");
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


export const CreateBuisnessAccount = async (
  router: AppRouterInstance,
  body: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  }
) => {
  try {
    const response = await axiosInstance.post("/user/business/account_create/", body);
    toast.success("Business account created successfully");
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

