import axiosInstance from "@/api/axiosInstance";
import { AxiosError } from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "react-toastify";
// import axiosInstance from ; // ad/just the path as needed

interface ErrorResponse {
  error?: string;
  message?: string;
}

export const getPackageResources = async (router: AppRouterInstance) => {
  try {
    const response = await axiosInstance.get("user/package/resource/view/");
    return response;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    const statusCode = axiosError?.response?.status;
    const errorMessage = axiosError?.response?.data?.error || axiosError?.response?.data?.message;

    if (statusCode === 403) {
      router.push("/auth/login");
    } else {
      toast.error(errorMessage || "Something went wrong");
    }

    if (axiosError?.response) {
      return axiosError.response;
    } else {
      return {
        status: "error",
        message: "Something went wrong. Please try again later.",
      };
    }
  }
};

// export const buyPakages = async (id: any) => {
//   try {
//     const formData = new FormData();
//     formData.append("package_id", id);

//     const response = await axiosInstance.post(
//       `/user/buy/subscription/create_checkout_session/`,
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );

//     return response;
//   } catch (error) {
//     const axiosError = error as AxiosError<ErrorResponse>;
//     const statusCode = axiosError?.response?.status;
//     const errorMessage =
//       axiosError?.response?.data?.error || axiosError?.response?.data?.message;

//     if (axiosError?.response) {
//       return axiosError.response;
//     } else {
//       return {
//         status: "error",
//         message: "Something went wrong. Please try again later.",
//       };
//     }
//   }
// };



export const buyPakages = async (id: any, token: string) => {
  try {
    const formData = new FormData();
    formData.append("package_id", id);

    const response = await axiosInstance.post(
      `/user/buy/subscription/create_checkout_session/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // ✅ Add this
        },
      }
    );

    return response;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    const statusCode = axiosError?.response?.status;
    const errorMessage =
      axiosError?.response?.data?.error || axiosError?.response?.data?.message;

    if (axiosError?.response) {
      return axiosError.response;
    } else {
      return {
        status: "error",
        message: "Something went wrong. Please try again later.",
      };
    }
  }
};
