"use client";

import { Suspense } from "react";
import IndividualUsers from "./IndividualUser";

export default function LegalAdvicePricing() {
  return (
    <Suspense fallback={<div className="text-center py-10 text-gray-600">Loading...</div>}>
      <IndividualUsers fixedBilling="Legal Advice" />
    </Suspense>
  );
}
