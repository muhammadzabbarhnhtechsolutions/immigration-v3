// services/getMeetingDetails.js
import axiosInstance from "../api/axiosInstance";

export const getMeetingDocuments = async (appointmentId) => {
  try {
     const res = await axiosInstance.get(`/user/appointment/document_view/?appointment_id=${appointmentId}`);
     
    if (!res.ok) throw new Error("Failed to fetch meetings");

    const data = await res.json();
    return data?.meetings || [];
  } catch (error) {
    console.error("getMeetingDetails error:", error);
    return [];
  }
};
