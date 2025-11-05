"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { CheckCircle, XCircle, Eye, Download } from "lucide-react";
import { getMcqsResult, getMcqsDetailedResult } from "../../../../../../../services/mcqsResult";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function ResultContent() {
  const router = useRouter();
  const test_id = useParams().id;

  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(true);
  const [detailedResult, setDetailedResult] = useState(null);
  const [showDetailed, setShowDetailed] = useState(false);
  const [downloading, setDownloading] = useState(false);

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

  const handleViewDetailed = async () => {
    if (detailedResult) {
      setShowDetailed(true);
      return;
    }
    const result = await getMcqsDetailedResult(router, test_id);
    if (result?.data) {
      setDetailedResult(result.data);
      setShowDetailed(true);
    }
  };

  const handleDownloadPDF = async () => {
    if (!detailedResult) return;
    setDownloading(true);
    const element = document.getElementById("detailed-result");
    if (element) {
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const pageWidth = 210;
      const pageHeight = 295;
      const margin = 20;
      const imgWidth = pageWidth - 2 * margin;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = margin;

      pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight + margin;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${detailedResult.test_title}_result.pdf`);
    }
    setDownloading(false);
  };

  const percent = Math.round((score / total) * 100);
  const passed = percent >= 50;

  if (loading) {
    return (
      <div className="mx-auto px-4 mt-0 py-20 text-center flex flex-col items-center justify-center gap-4 animate-fade-in">
        {/* Spinner */}
        <div className="h-10 w-10 border-4 border-[#88B29A] border-t-transparent rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-[#88B29A] text-xl font-medium">
          Loading Your Result..
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-1 z-50 flex flex-col items-center justify-center px-4">
      {showDetailed && detailedResult ? (
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl p-10 text-center relative overflow-hidden animate-fade-in">
          <div id="detailed-result">
            <h1 className="text-4xl font-extrabold text-[#88B29A] mb-8">
              Detailed Test Result
            </h1>
            <div className="text-left mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{detailedResult.test_title}</h2>
              <p className="text-lg text-gray-600">Course: {detailedResult.course_name}</p>
              <p className="text-lg text-gray-600">Module: {detailedResult.module_name}</p>
              <p className="text-lg text-gray-600">Video: {detailedResult.video_title}</p>
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Questions and Answers</h3>
              {detailedResult.questions.map((question, index) => (
                <div key={question.question_id} className="mb-6 p-4 border rounded-lg">
                  <p className="font-medium text-gray-800 mb-2">{index + 1}. {question.question_text}</p>
                  <div className="space-y-1">
                    {question.selected_option.map((option) => (
                      <div key={option.id} className={`p-2 rounded ${option.is_selected ? 'bg-blue-100' : ''} ${option.is_correct ? 'bg-green-100' : ''}`}>
                        <span className="text-gray-700">{option.text}</span>
                        {option.is_selected && <span className="ml-2 text-blue-600">(Your Answer)</span>}
                        {option.is_correct && <span className="ml-2 text-green-600">(Correct)</span>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-left mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Summary</h3>
              <p className="text-lg">Total Questions: {detailedResult.summary.total_questions}</p>
              <p className="text-lg">Correct Answers: {detailedResult.summary.correct_answers}</p>
              <p className="text-lg">Score: {detailedResult.summary.score}%</p>
            </div>
          </div>
          <div className="flex gap-4 justify-center mt-8">
            <button
              onClick={() => setShowDetailed(false)}
              className="bg-gray-500 text-white px-6 py-3 rounded-xl text-lg hover:bg-gray-600 transition-all duration-300 shadow-md"
            >
              Back to Summary
            </button>
            <button
              onClick={handleDownloadPDF}
              disabled={downloading}
              className="bg-[#88B29A] text-white px-6 py-3 rounded-xl text-lg hover:bg-[#99c5ac] transition-all duration-300 shadow-md flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              {downloading ? "Downloading..." : "Download PDF"}
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl p-10 text-center relative overflow-hidden animate-fade-in">
          <h1 className="text-4xl font-extrabold text-[#88B29A] mb-8">
            Test Result
          </h1>
          <div className="relative w-44 h-44 mx-auto mb-1">
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
                stroke="#88B29A"
                strokeWidth="10"
                strokeLinecap="round"
                fill="none"
                strokeDasharray={2 * Math.PI * 60}
                strokeDashoffset={2 * Math.PI * 60 * ((100 - percent) / 100)}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-[#88B29A]">
              {percent}%
            </div>
          </div>

          <p className="text-xl text-gray-700 mb-3">
            You scored <strong>{score}</strong> out of <strong>{total}</strong>
          </p>

          {passed ? (
            <div className="flex items-center justify-center gap-2 text-[#2d53a0] font-semibold text-lg">
              <CheckCircle className="w-6 h-6" /> Congratulations! You passed.
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 text-red-500 font-semibold text-lg">
              <XCircle className="w-6 h-6" /> Sorry, you didn’t pass.
            </div>
          )}

          <div className="flex gap-4 justify-center mt-8">
            <button
              onClick={handleViewDetailed}
              className="bg-[#88B29A] text-white px-6 py-3 rounded-xl text-lg hover:bg-[#78ad8f] transition-all duration-300 shadow-md flex items-center gap-2"
            >
              <Eye className="w-5 h-5" />
              View Detailed Result
            </button>
            <button
              onClick={() => router.push("/")}
              className="bg-gray-500 text-white px-6 py-3 rounded-xl text-lg hover:bg-gray-600 transition-all duration-300 shadow-md"
            >
              Go to Home
            </button>
          </div>
        </div>
      )}
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
