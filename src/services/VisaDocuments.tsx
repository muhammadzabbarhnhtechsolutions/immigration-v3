// services/VisaDocuments.ts
import { AxiosError } from "axios";
import axiosInstance from "@/api/axiosInstance";
import { toast } from "react-toastify";

type ErrorResponse = {
  error?: string;
  message?: string;
};

export const getVisaCategories = async () => {
  try {
    const response = await axiosInstance.get("/user/visa/category_view/");
    return response.data.data; // ✅ only return the data array
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    const errorMessage =
      axiosError?.response?.data?.error ||
      axiosError?.response?.data?.message ||
      "Failed to load categories";

    toast.error(errorMessage);
    return [];
  }
};



// services/VisaDocuments.ts
export const getVisaDocuments = async (visa_id: string) => {
  try {
    const response = await axiosInstance.get(
      `/user/visa/filter_by_visa_categories/?visa_id=${visa_id}`
    );
    return response.data.data; // ✅ return only the array
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    const errorMessage =
      axiosError?.response?.data?.error ||
      axiosError?.response?.data?.message ||
      "Failed to load visa documents";

    toast.error(errorMessage);
    return null;
  }
};
