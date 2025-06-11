import { Suspense } from "react";
import IndividualUsers from "../../../components/Pricing/IndividualUser";

export default function PricingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <IndividualUsers />
    </Suspense>
  );
}
