"use client";
import { Textarea } from "flowbite-react";
import React, { useEffect, useState } from "react";
// import StarRatingComponent from '@/usable/stars';
import { GeTasks, TaskUpdate } from "@/services/courseService";
import { toast } from "react-toastify";
import { MdEdit } from "react-icons/md";

export default function DescriptionBox({ videoid }) {
  const [apiResponse, setApiResponse] = useState([]); // Store the API response
  const [answers, setAnswers] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (videoid) {
      fetchApiData(videoid);
    }

    return () => {
      setApiResponse([]);
    };
  }, [videoid]);

  // Fetch API data when the video ID is set
  const fetchApiData = async (videoid) => {
    try {
      const result = await GeTasks(videoid);
      if ("data" in result) {
        const Data = result.data;
        if (Data?.status) {
          setApiResponse(Data.data); // Store API response in state
          console.log("API response:", Data.data);
        } else {
          console.log("else");
          toast.error(Data.message || "Error occurred");
        }
      }
    } catch (error) {
      console.log("catch");

      toast.error("something went wrong");
      console.error("API error", error);
    }
  };

  // Handle input change for each textarea
  const handleInputChange = (taskId, value) => {
    console.log("taskId, value", taskId, value);
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [taskId]: value,
    }));
  };

  // Fetch API data when the task is updated
  const AddUpdateTask = async (taskId) => {
    const updatedAnswer = answers[taskId];

    // Check if the answer exists and is not empty before making the API call
    if (!updatedAnswer || updatedAnswer.trim() === "") {
      toast.error("Please provide an answer before submitting.");
      return;
    }

    try {
      const result = await TaskUpdate({
        id: taskId,
        text: updatedAnswer,
        file: file,
      });
      if ("data" in result) {
        const Data = result.data;
        if (Data?.status) {
          setIsEdit(false);
          fetchApiData(videoid);
          setFile(null);
          console.log("API response:", Data);
          toast.success("Task updated successfully!");
        } else {
          toast.error(Data.message || "Error occurred");
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error("API error", error);
    }
  };

  const handleFileChange = (file) => {
    setFile(file);
  };

  return (
    <div className=" bg-opacity-40 p-4 md:p-8 rounded-xl flex flex-col gap-5 ">
      {apiResponse && apiResponse.length > 0 ? (
        <div className="bg-primary p-4 md:p-8 rounded-xl flex flex-col gap-5  max-h-100 overflow-y-scroll">
          {apiResponse.map((task) => (
            <div key={task.id} className="mb-8">
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={task.admin_profile}
                  alt="Admin Profile"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <span className="text-lg font-extrabold text-[#86ffbb]">
                    {task.admin_name}
                  </span>
                  <span className="text-md font-semibold text-dark">
                    {" "}
                    {task.task_title}
                  </span>
                </div>
              </div>

              <div className="ml-14">
                {task.answers.length > 0 ? (
                  task.answers.map((answer, answerIndex) => (
                    <div
                      key={answerIndex}
                      className="bg-[#FFFFFF9C] p-3 rounded-[11px] mt-5 relative"
                    >
                      {!isEdit ? (
                        <>
                          <p className="text-black">{answer.answer}</p>
                          {/* Conditional download button for answer file */}
                          {answer.answer_file && (
                            <a
                              href={answer.answer_file}
                              target="_blank"
                              rel="noopener noreferrer"
                              className=" text-white bg-[#88B29A] hover:bg-[#88B29A] focus:ring-1 focus:ring-[#88B29A] rounded-3xl font-[700] px-4 py-2 mt-2 inline-block"
                              download
                            >
                              Download Answer File
                            </a>
                          )}
                        </>
                      ) : (
                        <>
                          <textarea
                            className="border-none outline-none bg-transparent focus:outline-none active:outline-none w-full p-2 text-black"
                            rows={4}
                            value={answers[task.id] || ""} // Show existing or updated answer
                            onChange={(e) =>
                              handleInputChange(task.id, e.target.value)
                            }
                          />
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx,.txt"
                            className="mt-2 p-2 border border-[#88B29A] rounded"
                            onChange={(e) =>
                              handleFileChange(
                                e.target.files ? e.target.files[0] : null
                              )
                            }
                          />
                        </>
                      )}
                      <div className="flex items-center justify-end mt-4">
                        <button
                          className="text-white bg-[#88B29A] hover:bg-[#88B29A] focus:ring-1 focus:ring-[#88B29A] rounded-full font-[700] p-1 mx-2 absolute top-[-10px] right-[-18px]"
                          onClick={() => {
                            setAnswers({ [task.id]: answer.answer });
                            setIsEdit(true);
                          }}
                        >
                          <MdEdit />
                        </button>

                        {task.task_file && (
                          <a
                            href={task.task_file}
                            target="_blank"
                            className="text-white bg-[#88B29A] hover:bg-[#88B29A] focus:ring-1 focus:ring-[#88B29A] rounded-3xl font-[700] px-10 mx-2 py-3"
                            download
                          >
                            Download Task File
                          </a>
                        )}

                        <button
                          type="button"
                          className="text-white bg-[#88B29A] hover:bg-[#88B29A] focus:ring-1 focus:ring-[#88B29A] rounded-3xl font-[700] px-10 py-3"
                          onClick={() => AddUpdateTask(task.id)}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-[#FFFFFF9C] p-3 rounded-[11px] mt-5">
                    <textarea
                      className="border-none outline-none bg-transparent focus:outline-none active:outline-none w-full p-2 text-black"
                      placeholder="Type your answer here..."
                      rows={4}
                      value={answers[task.id] || ""}
                      onChange={(e) =>
                        handleInputChange(task.id, e.target.value)
                      }
                    />
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.txt"
                      className="mt-2 p-2 border border-[#88B29A] rounded"
                      onChange={(e) =>
                        handleFileChange(
                          e.target.files ? e.target.files[0] : null
                        )
                      }
                    />
                    <div className="flex items-center justify-end mt-4">
                      {task.task_file && (
                        <a
                          href={task.task_file}
                          target="_blank"
                          className="text-white bg-[#88B29A] hover:bg-[#88B29A] focus:ring-1 focus:ring-[#88B29A] rounded-3xl font-[700] px-10 mx-2 py-3"
                          download
                        >
                          Download Task File
                        </a>
                      )}
                      <button
                        type="button"
                        className="text-white bg-[#88B29A] hover:bg-[#88B29A] focus:ring-1 focus:ring-[#88B29A] rounded-3xl font-[700] px-10 py-3"
                        onClick={() => AddUpdateTask(task.id)}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center mt-10 bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-xl shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 mb-2 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M12 3.75c-4.56 0-8.25 3.69-8.25 8.25s3.69 8.25 8.25 8.25 8.25-3.69 8.25-8.25S16.56 3.75 12 3.75z"
            />
          </svg>
          <p className="text-lg font-semibold">No Task found</p>
          <span className="text-sm text-red-400">
            You don’t have any Task yet.
          </span>
        </div>
      )}
    </div>
  );
}
