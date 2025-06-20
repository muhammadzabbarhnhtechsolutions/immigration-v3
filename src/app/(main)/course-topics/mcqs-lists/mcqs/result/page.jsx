"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { CheckCircle, XCircle } from "lucide-react";

export default function ResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const score = searchParams.get("score");
  const total = searchParams.get("total");

  useEffect(() => {
    if (!score || !total) {
      // redirect to home if query missing
      router.push("/");
    }
  }, [score, total]);

  const percent = Math.round((Number(score) / Number(total)) * 100);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-[#357AFF] mb-6">Your Result</h1>

        <div className="text-6xl font-bold text-[#357AFF] mb-4">{score}/{total}</div>
        <p className="text-gray-600 text-lg mb-4">
          You scored <strong>{percent}%</strong> on the test.
        </p>

        {percent >= 50 ? (
          <div className="flex items-center justify-center gap-2 text-green-600 font-semibold">
            <CheckCircle className="w-5 h-5" /> Congratulations! You passed.
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 text-red-500 font-semibold">
            <XCircle className="w-5 h-5" /> Sorry, you didn’t pass.
          </div>
        )}

        <button
          onClick={() => router.push("/")}
          className="mt-6 bg-[#357AFF] text-white px-6 py-2 rounded hover:bg-blue-600 transition"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
