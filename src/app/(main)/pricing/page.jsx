import { Suspense } from "react";
import IndividualUsers from "../../../components/Pricing/IndividualUser";

export default function PricingPage() {
  return (
    <Suspense fallback={ <div className="mx-auto bg-[#ebf0ed] px-4 mt-8 py-20 text-center flex flex-col items-center justify-center gap-4 animate-fade-in">
        {/* Spinner */}
        <div className="h-10 w-10 border-4 border-[#5bb180] border-t-transparent rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-[#5bb180] text-lg font-medium">
          Loading...
        </p>
      </div>}>
      <IndividualUsers />
    </Suspense>
  );
}
