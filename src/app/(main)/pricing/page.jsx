import { Suspense } from "react";
import IndividualUsers from "../../../components/Pricing/IndividualUser";

export default function PricingPage() {
  return (
    <Suspense fallback={ <div className="mx-auto px-4 mt-0 py-20 text-center flex flex-col items-center justify-center gap-4 animate-fade-in">
        {/* Spinner */}
        <div className="h-10 w-10 border-4 border-[#3D61AB] border-t-transparent rounded-full animate-spin"></div>

        {/* Text */}
         <div className="mx-auto px-4 mt-0 py-20 text-center flex flex-col items-center justify-center gap-4 animate-fade-in">
        {/* Spinner */}
        <div className="h-10 w-10 border-4 border-[#3D61AB] border-t-transparent rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-[#3D61AB] text-xl font-medium">
          Loading ...
        </p>
      </div>
      </div>}>
      <IndividualUsers />
    </Suspense>
  );
}
