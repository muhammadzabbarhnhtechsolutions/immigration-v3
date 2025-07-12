import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import axiosInstance from "@/api/axiosInstance";

type ErrorResponse = {
  error?: string;
  message?: string;
};
// types.ts
export interface BusinessAccountPayload {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  profile?: File | string | null;
}


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

    if (statusCode === 403 || statusCode === 401 || errorMessage === "Invalid token") {
      router.push("/login");
    } else {
      toast.error(errorMessage || "Something went wrong");
    }

    return null;
  }
};
// Helper to build FormData
export const buildFormData = (
  body: { [key: string]: any }
): FormData => {
  const formData = new FormData();

  for (const key in body) {
    const value = body[key];

    // ✅ only append if value is File or Blob
    if (value instanceof File || value instanceof Blob) {
      formData.append(key, value);
    } else if (typeof value === "string" || typeof value === "number") {
      formData.append(key, String(value));
    }
  }

  return formData;
};




export const CreateBuisnessAccount = async (
  router: AppRouterInstance,
  body: BusinessAccountPayload
): Promise<any> => {
  try {
    const formData = buildFormData(body); // ✅ no cast needed

    const response = await axiosInstance.post(
      "/user/business/account_create/",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    if (response.status === 201 || response.status === 200) {
      toast.success("Business account created successfully");
    }

    return response;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Create failed");
    throw error;
  }
};



export const UpdateBuisnessAccount = async (
  router: AppRouterInstance,
  body: BusinessAccountPayload,
  isFormData: boolean
): Promise<any> => {
  try {
    const dataToSend = isFormData ? buildFormData(body) : body;

    const response = await axiosInstance.patch(
      "/user/business/account_update/",
      dataToSend,
      {
        headers: {
          "Content-Type": isFormData
            ? "multipart/form-data"
            : "application/json",
        },
      }
    );

    if (response.status === 200) {
      toast.success("Business account updated successfully");
    }

    return response;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Update failed");
    throw error;
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


// export const CreateBuisnessAccount = async (
//   router: AppRouterInstance,
//   body: {
//     first_name: string;
//     last_name: string;
//     email: string;
//     password: string;
//   }
// ) => {
//   try {
//     const response = await axiosInstance.post("/user/business/account_create/", body);
//     toast.success("Business account created successfully");
//     return response.data;
//   } catch (error) {
//     const axiosError = error as AxiosError<ErrorResponse>;
//     const statusCode = axiosError?.response?.status;
//     const errorMessage =
//       axiosError?.response?.data?.error ||
//       axiosError?.response?.data?.message;

//     if (statusCode === 403) {
//       router.push("/login");
//     } else {
//       toast.error(errorMessage || "Something went wrong");
//     }

//     return null;
//   }
// };

