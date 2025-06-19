import axiosInstance from "../api/axiosInstance";

export const getMeetingDetails = async (appointmentId, type) => {
  try {
    const res = await axiosInstance.post(
      `/user/appointment/meeting_view/?appointment_id=${appointmentId}`,
      { type } // body data
    );
    return res.data?.data || [];
  } catch (error) {
    console.error("getMeetingDetails error:", error);
    return [];
  }
};
