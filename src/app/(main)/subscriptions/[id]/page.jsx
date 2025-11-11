import { Suspense } from "react";
import SubscriptionPayments from "../../../../components/Subscriptions/SubscriptionPayments";

export default async function SubscriptionPaymentsPage({ params }) {
  const { id } = await params;
  return (
    <Suspense fallback={
      <div className="mx-auto px-4 mt-0 py-20 text-center flex flex-col items-center justify-center gap-4 animate-fade-in">
        <div className="h-10 w-10 border-4 border-[#88B29A] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[#88B29A] text-xl font-medium">Loading ...</p>
      </div>
    }>
      <SubscriptionPayments subscriptionId={id} />
    </Suspense>
  );
}
