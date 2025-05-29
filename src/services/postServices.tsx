import axiosInstance from "@/api/axiosInstance"
import { AxiosError } from "axios";
import { toast } from "react-toastify";



interface ErrorResponse {
  message?: string; // Optional message property
  error?: string; // Optional message property

}

// POSTS 
export const GeAllPosts = async (url: string = `chatform/user-posts/get_all_posts/`) => {
  try {

    const response = await axiosInstance.get(url);
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


export const AddPosts = async (data: { caption: string; thumbnail: null }) => {
  const formData = new FormData();
  formData.append('caption', data?.caption);
  if (data?.thumbnail) {

    formData.append('image', data?.thumbnail);
  }
  try {
    const response = await axiosInstance.post('chatform/user-posts/create_post/', formData, {
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

// COMMENTS 


// All Comments  
export const GeAllComments = async (id?: string, url?: string) => {
  // If no URL is provided, construct the URL with the id
  const requestUrl = url || `chatform/post-comment/get_comments/?page=1&post=${id}`;
  try {

    const response = await axiosInstance.get(requestUrl);
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

// specific replay  comment 

export const SpecificReply = async (id: string) => {
  console.log('id', id)
  try {

    const response = await axiosInstance.get(`chatform/post-comment/get_replies/?comment=${id}`);
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
}



export const AddComments = async (data: { comnt: string; postid: string }) => {
  const formData = new FormData();
  formData.append('comment', data?.comnt);
  formData.append('post', data?.postid);

  try {
    const response = await axiosInstance.post('chatform/post-comment/create_comment/', formData, {
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



// LIKE MY POST 
export const LikePost = async (id: string) => {
  const formData = new FormData();
  formData.append('post', id);

  try {
    const response = await axiosInstance.post('chatform/post-like/add_like/', formData, {
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


// DELETE MY COMT 
export const DeleteMyComment = async (id: string) => {


  try {
    const response = await axiosInstance.delete(`chatform/post-comment/delete_comment/?comment_id=${id}`, {
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

// SPECIFIC REPLY COMT 
export const ReplySpecificComment = async (data: { comnt: string; replyid: string }) => {
  const formData = new FormData();
  formData.append('reply', data?.comnt);
  formData.append('comment', data?.replyid);
  try {
    const response = await axiosInstance.post('chatform/post-comment/add_reply/', formData, {
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


// POSTS 
export const GeAllPost = async (url: string = `chatform/user-posts/get_all_posts/`) => {
  try {

    const response = await axiosInstance.get(url);
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
}