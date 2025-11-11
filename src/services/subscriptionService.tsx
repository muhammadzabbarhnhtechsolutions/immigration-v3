import axiosInstance from "@/api/axiosInstance";

export const getAllSubscriptions = async () => {
  try {
    const response = await axiosInstance.get("/user/list/all_subscriptions/");
    return response.data;
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    throw error;
  }
};

export const cancelSubscription = async (subscriptionId: string) => {
  try {
    const response = await axiosInstance.post("/user/list/cancel_subscription/", {
      subscription_id: subscriptionId,
    });
    return response.data;
  } catch (error) {
    console.error("Error canceling subscription:", error);
    throw error;
  }
};

export const getSubscriptionPayments = async (subscriptionId: string) => {
  try {
    const response = await axiosInstance.get(`/user/list/subscription_payments/?subscription_id=${subscriptionId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching subscription payments:", error);
    throw error;
  }
};
