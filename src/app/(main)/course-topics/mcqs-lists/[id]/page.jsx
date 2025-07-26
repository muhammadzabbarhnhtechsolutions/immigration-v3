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
            <div className="max-w-6xl mx-auto py-20 px-4">
            <div className="flex items-center gap-2 mb-6">
        <Sparkles className="text-[#5c967d] w-6 h-6" />
        <h1 className="text-3xl font-bold text-[#5c967d]">Available MCQ Tests</h1>
            </div>

            {loading ? (
 <div className="mx-autopx-4 mt-0 py-20 text-center flex flex-col items-center justify-center gap-4 animate-fade-in">
        {/* Spinner */}
        <div className="h-10 w-10 border-4 border-[#3D61AB] border-t-transparent rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-[#3D61AB] text-xl font-medium">
          Loading ...
        </p>
      </div>            ) : tests?.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">No tests available.</p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tests?.map((test, index) => (
               <div
                key={index}
                className="bg-white cursor-pointer border border-[#cce1d8] rounded-xl shadow-md hover:shadow-xl hover:scale-105 duration-500 transition p-6 relative group"
                >
              <div className="absolute top-0 right-0 bg-[#5c967d] text-white text-xs px-3 py-1 rounded-bl-xl rounded-tr-xl">
                Test #{index + 1}
              </div>
              <h2 className="text-xl font-semibold text-[#3c7c63] mb-2 group-hover:text-[#5c967d] transition">
                {test.title || `Test ${index + 1}`}
              </h2>
              <p className="text-sm text-gray-600 mb-6 min-h-[48px]">
                {test.description || "No description available."}
              </p>
              <div className="flex justify-center">
                <button
                  onClick={() => router.push(checkAttempt === false ? `/course-topics/mcqs-lists/mcqs/${test.id}` : `/course-topics/mcqs-lists/mcqs/result/${test.id}`)}
                  className="px-5 py-2 bg-[#5c967d] text-white rounded-full hover:bg-[#3c7c63] transition font-medium"
                >
                 {checkAttempt == false ?  "Start Test": "Result"}
                </button>
              </div>
            </div>
          ))}
        </div>
    
  )}
 
    </div>
  );
}
