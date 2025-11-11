"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { getAllSubscriptions, cancelSubscription } from "@/services/subscriptionService";

export default function SubscriptionList() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ open: false, subscriptionId: null });
  const router = useRouter();

  useEffect(() => {
    const userToken = localStorage.getItem("access_token");
    setToken(userToken);
  }, []);

  const fetchSubscriptions = async () => {
    if (!token) return;

    try {
      setLoading(true);
      const res = await getAllSubscriptions();
      if (res.status) setSubscriptions(res.data);
      else toast.error("Failed to fetch subscriptions");
    } catch (error) {
      console.error(error);
      toast.error("Error fetching subscriptions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, [token]);

  const handleCancel = async (subscriptionId) => {
    try {
      const res = await cancelSubscription(subscriptionId);
      if (res.status) {
        toast.success("Subscription cancelled successfully");
        fetchSubscriptions();
      } else toast.error("Failed to cancel subscription");
    } catch (error) {
      console.error(error);
      toast.error("Error canceling subscription");
    } finally {
      setConfirmModal({ open: false, subscriptionId: null });
    }
  };

  const handleViewPayments = (subscriptionId) => {
    router.push(`/subscriptions/${subscriptionId}`);
  };

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 mt-0 py-12 sm:py-16 md:px-22">
      <h1 className="text-3xl font-bold text-center text-[#88B29A] mb-8">My Subscriptions</h1>

      {loading ? (
        <div className="text-center py-10">
          <div className="h-10 w-10 border-4 border-[#88B29A] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-[#88B29A] mt-4 text-lg font-medium">Loading subscriptions...</p>
        </div>
      ) : subscriptions.length === 0 ? (
        <p className="text-center text-gray-600 py-10">No subscriptions found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subscriptions.map((sub) => (
            <div
              key={sub.id}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition cursor-pointer"
              onClick={() => handleViewPayments(sub.id)}
            >
              <h3 className="text-xl font-semibold text-[#88B29A] mb-2">{sub.package_name}</h3>
              <p className="text-gray-600 mb-2">Price: £{sub.package_price}</p>
              <p className="text-gray-600 mb-2">
                Expires: {new Date(sub.expiration_date).toLocaleDateString()}
              </p>
              <p
                className={`mb-4 font-medium ${
                  sub.status === "Active" ? "text-[#6a9a7d]" : "text-red-600"
                }`}
              >
                Status: {sub.status}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setConfirmModal({ open: true, subscriptionId: sub.id });
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition disabled:opacity-50"
                  disabled={sub.status !== "Active"}
                >
                  Cancel
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewPayments(sub.id);
                  }}
                  className="bg-[#88B29A] text-white px-4 py-2 rounded-md hover:bg-[#6a9a7d] transition"
                >
                  View Payments
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmModal.open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Confirm Cancellation</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to cancel this subscription? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmModal({ open: false, subscriptionId: null })}
                className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition"
              >
                No, Keep
              </button>
              <button
                onClick={() => handleCancel(confirmModal.subscriptionId)}
                className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
