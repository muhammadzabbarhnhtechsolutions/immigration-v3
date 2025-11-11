"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { getSubscriptionPayments } from "@/services/subscriptionService";
import { PoundSterling } from "lucide-react";

export default function SubscriptionPayments({ subscriptionId }) {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const userToken = localStorage.getItem("access_token");
    setToken(userToken);
  }, []);

  const fetchPayments = async () => {
    if (!token || !subscriptionId) return;

    try {
      setLoading(true);
      const res = await getSubscriptionPayments(subscriptionId);
      if (res.status) {
        setPayments(res.data);
      } else {
        toast.error("Failed to fetch payments");
      }
    } catch (error) {
      console.error("Error fetching payments:", error);
      toast.error("Error fetching payments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [token, subscriptionId]);

  if (loading) {
    return (
      <div className="mx-auto w-full bg-[#ebf0ed] px-4 mt-0 py-20 text-center flex flex-col items-center justify-center gap-4 animate-fade-in">
        <div className="h-10 w-10 border-4 border-[#88B29A] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[#88B29A] text-lg font-medium">Loading payments...</p>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="mx-auto px-4 mt-0 py-20 text-center">
        <p className="text-gray-600">Please log in to view payments.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 mt-0 py-12 sm:py-16 md:px-22">
      <div className="flex items-center gap-4 mb-8">
        {/* <button
          onClick={() => router.back()}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition"
        >
          ← Back
        </button> */}
        <h1 className="text-3xl font-bold text-[#88B29A]">Subscription Payments</h1>
      </div>

      {payments.length === 0 ? (
        <div className="text-center py-10 text-gray-600">
          <p>No payments found for this subscription.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#88B29A] text-white">
              <tr>
                <th className="px-6 py-3 text-left">Amount</th>
                <th className="px-6 py-3 text-left">Currency</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Invoice Number</th>
                <th className="px-6 py-3 text-left">Transaction ID</th>
                <th className="px-6 py-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 flex"><PoundSterling className="w-4 h-4 mt-0.5"/> {payment.amount}</td>
                  <td className="px-6 py-4"><PoundSterling className="w-4 h-4 mt-0.5"/></td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      payment.status === 1 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                      {payment.status === 1 ? "Success" : "Failed"}
                    </span>
                  </td>
                  <td className="px-6 py-4">{payment.invoice_number}</td>
                  <td className="px-6 py-4">{payment.transaction_id}</td>
                  <td className="px-6 py-4">{new Date(payment.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
