"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { CheckCircle, XCircle } from "lucide-react";
import { getMcqsResult } from "../../../../../../../services/mcqsResult";

function ResultContent() {
  const router = useRouter();
  const test_id = useParams().id;

  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      if (!test_id) return;

      const result = await getMcqsResult(router, test_id);
      if (result?.data) {
        setScore(Number(result.data.correct_answers));
        setTotal(Number(result.data.total_questions));
      }
      setLoading(false);
    };

    fetchResult();
  }, [test_id]);

  const percent = Math.round((score / total) * 100);
  const passed = percent >= 50;

  if (loading) {
    return (
      <div className="mx-auto bg-[#ebf0ed] px-4 mt-0 py-20 text-center flex flex-col items-center justify-center gap-4 animate-fade-in">
        {/* Spinner */}
        <div className="h-10 w-10 border-4 border-[#3D61AB] border-t-transparent rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-[#3D61AB] text-xl font-medium">
          Loading Your Result..
        </p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen pt-1 z-50 flex items-center justify-center 
   px-4"
    >
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl p-10 text-center relative overflow-hidden animate-fade-in">
        <h1 className="text-4xl font-extrabold text-[#3D61AB] mb-8">
          Test Result
        </h1>

        <div className="relative w-44 h-44 mx-auto mb-6">
          <svg className="absolute top-0 left-0 w-full h-full transform rotate-[-90deg]">
            <circle
              cx="50%"
              cy="50%"
              r="60"
              stroke="#E5E7EB"
              strokeWidth="12"
              fill="none"
            />
            <circle
              cx="50%"
              cy="50%"
              r="60"
              stroke="#3D61AB" // ✅ Changed from #357AFF to #3D61AB
              strokeWidth="14"
              strokeLinecap="round"
              fill="none"
              strokeDasharray={2 * Math.PI * 60}
              strokeDashoffset={2 * Math.PI * 60 * ((100 - percent) / 100)}
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-[#3D61AB]">
            {percent}%
          </div>
        </div>

        <p className="text-xl text-gray-700 mb-6">
          You scored <strong>{score}</strong> out of <strong>{total}</strong>
        </p>

        {passed ? (
          <div className="flex items-center justify-center gap-2 text-green-600 font-semibold text-lg">
            <CheckCircle className="w-6 h-6" /> Congratulations! You passed.
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 text-red-500 font-semibold text-lg">
            <XCircle className="w-6 h-6" /> Sorry, you didn’t pass.
          </div>
        )}

        <button
          onClick={() => router.push("/")}
          className="mt-0 bg-[#3D61AB] text-white px-6 py-3 rounded-xl text-lg hover:bg-[#7fb193] transition-all duration-300 shadow-md"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={<div className="text-center py-20">Loading Result...</div>}
    >
      <ResultContent />
    </Suspense>
  );
}
