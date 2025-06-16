// app/(auth)/login/page.tsx
import React, { Suspense } from "react";
import MainComponent from "../../../components/Login/Login"; // adjust path if needed

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading login...</div>}>
      <MainComponent />
    </Suspense>
  );
}
