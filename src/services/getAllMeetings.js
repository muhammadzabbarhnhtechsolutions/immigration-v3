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
export const getAllMeetingDetails = async (appointmentId) => {
  try {
    const res = await axiosInstance.get(
      `/user/appointment/all_meetings/?appointment_id=${appointmentId}`
    );
    return res.data?.data || [];
  } catch (error) {
    console.error("getMeetingDetails error:", error);
    return [];
  }
};
