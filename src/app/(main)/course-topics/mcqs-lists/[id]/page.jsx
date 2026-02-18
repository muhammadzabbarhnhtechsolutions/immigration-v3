"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getMcqsLists } from "../../../../../services/getMcqsList";
import { Sparkles } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, XCircle } from "lucide-react";
export default function McqsTestListPage() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [checkAttempt,setCheckAttempt] = useState("")
  const video_id = useParams().id;
    const searchParams = useSearchParams();
  console.log(checkAttempt,"sssss")
    const score = searchParams.get("score");
    const total = searchParams.get("total");
 

    const percent = Math.round((Number(score) / Number(total)) * 100);
    useEffect(() => {
    const fetchTests = async () => {
      try {
        const res = await getMcqsLists(router, video_id);
        setTests(res?.data);
        setCheckAttempt(res?.attempted)
      } catch (err) {
        console.error("Failed to fetch MCQ tests", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  return (
            <div className="max-w-7xl mx-auto pb-20 py-12 px-2">
            <div className="flex items-center justify-center gap-2 mb-6">
        {/* <Sparkles className="text-black w-6 mt-3 h-6" /> */}
 <h4 className="text-2xl font-marko mt-6 mb-2 sm:text-4xl md:text-center  ">
 MCQS        </h4>            </div>

{loading ? (
  <div className="mx-auto px-4 mt-0 py-20 text-center flex flex-col items-center justify-center gap-4 animate-fade-in">
    {/* Spinner */}
    <div className="h-10 w-10 border-4 border-[#88B29A] border-t-transparent rounded-full animate-spin"></div>

    {/* Text */}
    <p className="text-[#88B29A] text-xl font-medium">
      Loading ...
    </p>
  </div>
) : tests?.length === 0 ? (
  <p className="text-gray-500 text-center text-lg">No tests available.</p>
) : (
  <div
    className={`mt-6 gap-6 ${
      tests?.length === 1
        ? "flex justify-center flex-wrap" // single card → center
        : "grid sm:grid-cols-2 lg:grid-cols-3" // multiple cards → grid
    }`}
  >
    {tests.map((test, index) => {
        return (
          <div
            key={index}
            className="group border relative overflow-hidden rounded-2xl bg-white p-1 transition-all duration-500 hover:scale-[1.03] w-[354px] shadow-lg shadow-[#88B29A]/20"
          >
            {/* Animated Background Glow */}
            <div className="absolute -inset-px bg-gradient-to-r from-[#88B29A] to-[#cce1d8] opacity-0 blur transition duration-500 group-hover:opacity-40" />

            <div className="relative flex h-full flex-col justify-between rounded-[calc(1rem-1px)] bg-white p-6">
              {/* Top Badge */}
              <div className="absolute top-0 right-0 flex items-center gap-1.5 rounded-bl-2xl bg-[#88B29A]/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#88B29A]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#88B29A] opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#88B29A]"></span>
                </span>
                Test #{index + 1}
              </div>

              {/* Content */}
              <div className="mt-4">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#88B29A]/10 text-[#88B29A] transition-transform duration-500 group-hover:rotate-12">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>

                <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-800 transition-colors group-hover:text-[#88B29A]">
                  {test.title}
                </h2>

                <p className="line-clamp-4 text-sm leading-relaxed text-gray-500">
                  {test.description ||
                    "Master this topic with our curated selection of high-yield questions."}
                </p>
              </div>

              {/* Footer / Button */}
              <div className="mt-8 flex items-center justify-between">
                <div className="text-[11px] font-medium text-gray-400">
                  {checkAttempt ? "COMPLETED" : "READY TO START"}
                </div>

                <button
                  onClick={() =>
                    router.push(
                      checkAttempt === false
                        ? `/course-topics/mcqs-lists/mcqs/${test.id}`
                        : `/course-topics/mcqs-lists/mcqs/result/${test.id}`
                    )
                  }
                  className="relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-[#88B29A] px-6 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:bg-[#6e967f] active:scale-95 shadow-lg shadow-[#88B29A]/30"
                >
                  <span className="relative">
                    {checkAttempt === false ? "Start Test" : "View Result"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        );
      })}
  </div>
)}

 
    </div>
  );
}
