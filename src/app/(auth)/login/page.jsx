// app/(auth)/login/page.tsx
import React, { Suspense } from "react";
import MainComponent from "../../../components/Login/Login"; // adjust path if needed

export default function LoginPage() {
  return (
    <Suspense fallback={ <div className="mx-auto  px-4 mt-0 py-20 text-center flex flex-col items-center justify-center gap-4 animate-fade-in">
        {/* Spinner */}
        <div className="h-10 w-10 border-4 border-[#88B29A] border-t-transparent rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-[#88B29A] text-xl font-medium">
          Loading ..
        </p>
      </div>}>
      <MainComponent />
    </Suspense>
  );
}
