"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  VideoIcon,
  Home,
  User,
  BookOpen,
  Code2,
  BarChart3,
} from "lucide-react";
import { getMcqWithOptions } from "@/services/getAllMcqsWithOptions";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { SubmitMcqsAnswer } from "@/services/submitMcqsAnswers";

export default function Page() {
  const [mcqs, setMcqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState({});

  const paramsId = useParams().id;
  const router = useRouter();

  const handleSubmit = async () => {
  const selectedOptionIds = Object.values(selectedOptions);

  if (selectedOptionIds.length !== mcqs.length) {
    alert("⚠️ Please answer all questions before submitting.");
    return;
  }

  const payload = {
    test_id: paramsId,
    selected_options: selectedOptionIds,
  };

  try {
    const res = await SubmitMcqsAnswer(router,payload);
    alert("✅ Submission successful!");
    console.log(res.data);
    // if(res.status === 200){
    //   router.push("/course-topics/mcqs-lists/mcqs/result?score=");
    // }
  } catch (err) {
    console.error("❌ Submission failed:", err);
    alert("Failed to submit answers.");
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
    <div className="flex mt-6 min-h-screen">
      {/* Sidebar */}
      <div className="w-[80px] bg-[#5c967d] p-4 flex flex-col gap-6 pt-14 items-center">
        {[
          [<Home />, "Home"],
          [<User />, "Profile"],
          [<BookOpen />, "Lessons"],
          [<Code2 />, "Practice"],
          [<BarChart3 />, "Progress"],
        ].map(([Icon, label], i) => (
          <div key={i} className="flex flex-col items-center cursor-pointer">
            <div className="w-5 h-5 text-white mb-1">{Icon}</div>
            <span className="text-xs text-white">{label}</span>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-[30px] mt-14 p-6 bg-white space-y-8">
        <h1 className="text-2xl font-bold text-[#88ae98]">M.C.Qs</h1>

        {loading ? (
          <p>Loading MCQs...</p>
        ) : (
          mcqs.map((q, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition duration-300 space-y-4"
            >
              <p className="text-base font-semibold text-[#5c967d]">
                Q{index + 1}. {q.question_text}
              </p>

              {q.options.map((option, optIndex) => {
                const letter = String.fromCharCode(65 + optIndex); // A, B, C, D
                return (
                  <label
                    key={option.id}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                   <input
  type="radio"
  name={`q${index}`}
  value={option.id}
  className="accent-[#7EB69E] w-4 h-4"
  onChange={() =>
    setSelectedOptions((prev) => ({ ...prev, [q.id]: option.id }))
  }
/>

                    <span className="flex items-center gap-2 text-gray-700">
                      <span className="bg-[#7EB69E] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
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

        {/* Navigation Buttons */}
        <div className="flex justify-center mt-8">
       
          <button
  onClick={handleSubmit}
  className="px-14 py-3 bg-[#7EB69E] text-white rounded hover:bg-[#689f89] transition"
>
  Submit
</button>

        </div>
      </div>
    </div>
  );
}
