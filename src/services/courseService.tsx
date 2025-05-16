import axiosInstance from "@/api/axiosInstance"
import { AxiosError } from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "react-toastify";



interface ErrorResponse {
  message?: string; // Optional message property
  error?: string; // Optional message property

}


export const GetModuleOfCourses = async (router: AppRouterInstance) => {
  try {
    const courseId = localStorage.getItem("a9ecbb8b-c7ab-476b-a1d5-4066e8212d87");
    const response = await axiosInstance.get(`user/course/get_modules_of_course/?course_id=${"a9ecbb8b-c7ab-476b-a1d5-4066e8212d87"}`);
    return response;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    const statusCode = axiosError?.response?.status;
    const errorMessage = axiosError?.response?.data?.error || axiosError?.response?.data?.message;
    // Handle 403 Unauthorized
    if (statusCode === 403) {
      // toast.error("Unauthorized access. Please log in.");
      router.push('/auth/login'); // Redirect to login page
    } else {
      
      toast.error(errorMessage || "Something went wrong");
    }

    if (axiosError?.response) {
      return axiosError.response;
    } else {
      return { status: "error", message: "Something went wrong. Please try again later." };
    }
  }
};



export const GeTasks = async (videoid:any) => {
  try {
    
    const response = await axiosInstance.get(`user/course-task/get_tasks_with_answers/?video_id=${videoid}`);
    return response;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    const statusCode = axiosError?.response?.status;
    const errorMessage = axiosError?.response?.data?.error || axiosError?.response?.data?.message;
      // toast.error(errorMessage || "Something went wrong");
    

    if (axiosError?.response) {
      return axiosError.response;
    } else {
      return { status: "error", message: "Something went wrong. Please try again later." };
    }
  }
};


// add update task 
export const TaskUpdate = async (data: {  id: number; text: string ; file: File | null }) => {
  const formData = new FormData();
formData.append('task',String(data.id));
formData.append('answer', data?.text);
// Append the file only if it's not null
if (data?.file) {
  formData.append('answer_file', data.file);
}
try {
  const response = await axiosInstance.post('user/course-task/add_answer_in_task/', formData, {
      headers: {
          'Content-Type': 'multipart/form-data',
      },
  });
  return response;
} catch (error) {
  const axiosError = error as AxiosError<ErrorResponse>;
  const errorMessage = axiosError?.response?.data?.error || axiosError?.response?.data?.message;

  toast.error(errorMessage);
  console.error("Error during signup:", axiosError);
  if (axiosError?.response) {
    return axiosError.response;
  } else {
    return { status: "error", message: "Something went wrong. Please try again later." };
  }
}
};

export const AllVideos = async (router: AppRouterInstance) => {
  try {
    const courseId = localStorage.getItem("course_id");
    const response = await axiosInstance.get(`user/course/get_all_videos/?course_id=${"a9ecbb8b-c7ab-476b-a1d5-4066e8212d87"}`);
    return response;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    const statusCode = axiosError?.response?.status;
    const errorMessage = axiosError?.response?.data?.error || axiosError?.response?.data?.message;

    // Handle 403 Unauthorized
    if (statusCode === 403) {
      // toast.error("Unauthorized access. Please log in.");
      router.push('/auth/login'); // Redirect to login page
    } else {
      toast.error(errorMessage || "Something went wrong");
    }

    if (axiosError?.response) {
      return axiosError.response;
    } else {
      return { status: "error", message: "Something went wrong. Please try again later." };
    }
  }
};







