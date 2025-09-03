"use client";

import { useEffect, useState } from "react";
import {
  Home,
  User,
  BookOpen,
  Code2,
  BarChart3,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { getMcqWithOptions } from "@/services/getAllMcqsWithOptions";
import { SubmitMcqsAnswer } from "@/services/submitMcqsAnswers";
import { toast } from "react-toastify";

export default function Page() {
  const [mcqs, setMcqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState({});
  const paramsId = useParams().id;
  const router = useRouter();

  const handleSubmit = async () => {
  const selectedOptionIds = Object.values(selectedOptions);

  if (selectedOptionIds.length !== mcqs.length) {
    toast.success("⚠️ Please answer all questions before submitting.");
    return;
  }

  const payload = {
    test_id: paramsId,
    selected_options: selectedOptionIds,
  };

  try {
    const res = await SubmitMcqsAnswer(router, payload);

    if (res?.status === true) {
      toast.success("MCQs Successfully Submitted!");
      router.push(`/course-topics/mcqs-lists/mcqs/result/${paramsId}`);
      return;
    }

    if (res?.message === "You have already attempted this test.") {
      toast.info("You have already attempted this test.");
      router.push(`/course-topics/mcqs-lists/mcqs/result/${paramsId}`);
      return;
    }

    toast.error(res?.message || "Unknown error occurred.");
    
  } catch (err) {
    console.error("❌ Submission failed:", err);
    toast.error("Failed to submit MCQs. Please try again.");
  }
};


  useEffect(() => {
    const fetchMcqs = async () => {
      try {
        const res = await getMcqWithOptions(router, paramsId);
        setMcqs(res.data);
      } catch (err) {
        console.error("Failed to fetch MCQs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMcqs();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-[80px] bg-[#88B29A] p-4 pt-16 flex flex-col items-center gap-8">
        {[Home, User, BookOpen, Code2, BarChart3].map((Icon, i) => (
          <div key={i} className="flex flex-col items-center text-white hover:scale-110 transition">
            <Icon className="w-5 h-5 mb-1" />
            <span className="text-xs">
              {["Home", "Profile", "Lessons", "Practice", "Progress"][i]}
            </span>
          </div>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-[#88B29A] mb-8">Multiple Choice Questions</h1>

        <div className="w-full max-w-3xl space-y-8">
          {loading ? (
 <div className="mx-auto  px-4 mt-0 py-20 text-center flex flex-col items-center justify-center gap-4 animate-fade-in">
        {/* Spinner */}
        <div className="h-10 w-10 border-4 border-[#88B29A] border-t-transparent rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-[#88B29A] text-xl font-medium">
          Loading Mcqs..
        </p>
      </div>          ) : (
            mcqs.map((q, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow hover:shadow-lg transition duration-300 space-y-4"
              >
                <p className="font-semibold text-[#88B29A] text-lg">
                  Q{index + 1}. {q.question_text}
                </p>

                {q.options.map((option, optIndex) => {
                  const letter = String.fromCharCode(65 + optIndex); // A, B, C, D
                  return (
                    <label key={option.id} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name={`q${index}`}
                        value={option.id}
                        className="accent-[#88B29A] w-4 h-4"
                        onChange={() =>
                          setSelectedOptions((prev) => ({ ...prev, [q.id]: option.id }))
                        }
                      />
                      <span className="flex items-center gap-2 text-gray-800">
                        <span className="bg-[#88B29A] text-white text-xs w-6 h-6 flex items-center justify-center rounded-full">
                          {letter}
                        </span>
                        {option.option_text}
                      </span>
                    </label>
                  );
                })}
              </div>
            ))
          )}

          {!loading && (
            <div className="flex justify-center">
              <button
                onClick={handleSubmit}
                className="px-10 py-3 bg-[#88B29A] text-white rounded-xl text-lg font-medium hover:bg-[#88B29A] transition"
              >
                Submit
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
