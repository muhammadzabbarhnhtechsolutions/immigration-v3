"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { CreateAppointmentDocuments } from "../../../../services/createAppointmentDocuments";
import { useEffect } from "react";
import {
  MoreVertical,
  Eye,
  MessageCircleCode,
  X,
  SendHorizonal,
  RotateCw,
  Upload,
} from "lucide-react";

// Icons
import img1 from "../../../../assets/img1.png";
import img2 from "../../../../assets/img2.png";
import img3 from "../../../../assets/img3.png";
import img4 from "../../../../assets/meeting.png";
import img5 from "../../../../assets/meeting1.png";
import {
  getChatMessages,
  sendChatMessage,
} from "../../../../services/chatServices";

const cards = [
  {
    title: "Meetings",
    icon: <Image src={img1} alt="Meeting" className="w-14 h-14" />,
    dropdown: true,
  },
  {
    title: "Chat",
    icon: <Image src={img2} alt="Chat" className="w-14 h-14" />,
  },
  {
    title: "Upload Document",
    icon: <Image src={img3} alt="Share" className="w-14 h-14" />,
    dropdown: true,
  },
];

export default function AppointmentActions() {
  const searchParams = useSearchParams();
  const id = searchParams.get("appointment_id");
  const [showUpload, setShowUpload] = useState(false);
  const router = useRouter();
  const appointmentId = searchParams.get("appointment_id") || "";
const [unreadCount, setUnreadCount] = useState(3); // You can update this dynamically later
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const chatEndRef = useRef(null);
  const [activeDropdown, setActiveDropdown] = useState(null); // Add at top of component

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const hanldeGetChatsMessages = () => {
    if (showChat && appointmentId) {
      getChatMessages(appointmentId, router).then((res) => {
        if (res) {
          setMessages(
            res
              .map((msg) => ({
                text: msg.message,
                type: msg.admin ? "admin" : "user",
              }))
              .reverse()
          );
        }
      });
    }
  };
  useEffect(() => {
    hanldeGetChatsMessages();
  }, [showChat, appointmentId]);

  const handleSend = async () => {
    if (!inputMessage.trim() || !appointmentId) return;

    const newMsg = inputMessage.trim();

    // Optimistically show it in UI
    setMessages((prev) => [...prev, { type: "user", text: newMsg }]);
    setInputMessage("");

    const res = await sendChatMessage(router, appointmentId, newMsg);

    if (res) {
      // Optionally fetch updated chat again or just confirm it's sent
      setMessages((prev) => [...prev]);
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl sm:text-3xl mt-6 font-bold text-[#3D61AB] mb-10 text-center sm:text-left">
        Appointment
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="relative z-10 bg-white rounded-2xl shadow-xl w-full min-h-[300px] lg:h-[306px] flex flex-col items-center"
          >
            <div className="bg-[#3D61AB] h-36 rounded-t-xl w-full flex justify-center items-center relative">
              {card.title === "Chat" && unreadCount > 0 && (
  <div className="absolute top-2 right-2 bg-white text-[#3D61AB] text-xs font-bold px-2.5 py-1.5 rounded-full shadow-md animate-pulse">
    {unreadCount}
  </div>
)}
              <div className="bg-white w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center shadow-lg border-4 border-white absolute -bottom-12">
                {card.icon}
              </div>
              {card.dropdown && (
                <div className="absolute top-4 right-4">
                  <MoreVertical
                    onClick={() =>
                      setActiveDropdown(activeDropdown === index ? null : index)
                    }
                    className="text-white cursor-pointer"
                    size={20}
                  />

                  {activeDropdown === index && (
                    <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg text-sm text-gray-700 z-10 w-44">
                      {card.title === "Meetings" ? (
                        <>
                          <Link
                            href={`/all-appointments/meetings/s?type=1&appointment_id=${id}`}
                            className="block w-full px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                          >
                            <Image
                              src={img5}
                              alt="Zoom"
                              width={20}
                              height={20}
                              className="object-contain"
                            />
                            Zoom Meeting
                          </Link>

                          <Link
                            href={`/all-appointments/meetings/s?type=2&appointment_id=${id}`}
                            className="block w-full px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                          >
                            <Image
                              src={img4}
                              alt="Google"
                              width={20}
                              height={20}
                              className="object-contain"
                            />
                            Google Meeting
                          </Link>
                        </>
                      ) : (
                        <Link href={`/documents/${id}`}>
                          <button className="w-full text-left px-2 py-2 hover:bg-[#f0fdf4] flex items-center gap-3 transition-all duration-200 rounded-md">
                            <span className="bg-[#3D61AB] text-white p-1 rounded-full">
                              <Eye
                                size={16}
                                className="transition-transform group-hover:scale-110"
                              />
                            </span>
                            <span className="font-medium text-sm text-[#444]">
                              View Document
                            </span>
                          </button>
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="pt-16 pb-6 px-4 sm:px-6 text-center w-full">
              {card.title === "Upload Document" ? (
                <button
                  onClick={() => setShowUpload(true)}
                  className="mt-6 px-6 py-2.5 rounded-full bg-[#3D61AB] text-white font-semibold shadow-md hover:scale-105 transition"
                >
                  {card.title}
                </button>
              ) : card.title === "Meetings" ? (
                <Link
                  href={`/all-appointments/meetings/s?appointment_id=${id}`}
                >
                  <button className="mt-6 px-6 py-2.5 rounded-full bg-[#3D61AB] text-white font-semibold shadow-md hover:scale-105 transition">
                    {card.title}
                  </button>
                </Link>
              ) : (
                <button
                  onClick={() => setShowChat(true)}
                  className="mt-6 px-6 py-2.5 rounded-full bg-[#3D61AB] text-white font-semibold shadow-md hover:scale-105 transition"
                >
                  {card.title}
                </button>
              )}
            </div>

            {/* Responsive Chat Box */}
            {showChat && (
              <div className="fixed my-2  inset-x-0 bottom-0 md:inset-auto md:bottom-8 md:right-6 md:top-52  z-[100] w-full max-w-sm mx-auto md:mx-0 md:max-w-[358px] rounded-2xl shadow-2xl bg-gray-200 animate-slide-up border border-gray-300 overflow-hidden">
                <div className="bg-gradient-to-r from-[#3D61AB] to-[#46996a] text-white px-5 py-4 flex justify-between items-center">
                  <h3 className="font-semibold flex gap-2 text-lg sm:text-xl">
                    <MessageCircleCode /> Chats
                  </h3>
                  <div className="flex gap-4">
                    <button
                      onClick={hanldeGetChatsMessages}
                      className="w-6 h-6 flex  justify-center items-center rounded-full bg-green-100 text-green-600 shadow-sm hover:scale-110 transition"
                      title="Refresh Messages"
                    >
                      <RotateCw size={15} className="" />
                    </button>
                    <button
                      onClick={() => setShowChat(false)}
                      className="text-white hover:text-gray-200 font-bold hover:scale-125 transition"
                    >
                      <X />
                    </button>
                  </div>
                </div>

                <div className="p-4 h-64 md:h-72  overflow-y-auto bg-white space-y-3">
                  {messages?.map((m, i) => (
                    <div
                      key={i}
                      className={m.type === "user" ? "text-right" : "text-left"}
                    >
                      <p
                        className={`inline-block py-2 px-4 rounded-2xl ${
                          m.type === "user"
                            ? "bg-[#3D61AB] text-white"
                            : "bg-[#f7f7f7] text-gray-800"
                        }`}
                      >
                        {m.text}
                      </p>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>

                <div className="border-t flex items-center bg-white px-3 py-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleEnter}
                    className="w-full px-4 py-2 rounded-l-full text-sm border border-gray-300 focus:ring-2 focus:ring-[#3D61AB] outline-none transition"
                  />
                  <button
                    onClick={handleSend}
                    className="bg-[#3D61AB] hover:bg-[#46996a] text-white px-4 py-2 rounded-r-full font-medium hover:scale-105 transition"
                  >
                    <SendHorizonal />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Upload Modal - remains unchanged, already responsive */}
      {showUpload && (
        <div className="fixed pt-[52px] inset-0 bg-black bg-opacity-5 flex items-center justify-center z-[100] overflow-auto">
          <div className="bg-white p-4 sm:p-6 rounded-xl w-full max-w-xl relative animate-slide-down">
            <button
              onClick={() => setShowUpload(false)}
              className="absolute top-2 right-3 text-green-500 hover:text-red-500 text-2xl"
            >
              &times;
            </button>
            <FileUploadBox setShowUpload={setShowUpload} />
          </div>
        </div>
      )}
    </div>
  );
}

function FileUploadBox({ setShowUpload }) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const router = useRouter();
  const documentId = useSearchParams();
  const id = documentId.get("appointment_id");

  const handleFileChange = (e) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0]);
      setMessage("");
      setProgress(0);
    }
  };

  const handleUpload = async () => {
    if (!file || !title || !description || !id) {
      setMessage("⚠️ All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("appointment", id);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("document", file);

    try {
      setUploading(true);
      const res = await CreateAppointmentDocuments(router, formData);
      setMessage("Upload successful!");
      toast.success("Document uploaded successfully!");
      setTitle("");
      setDescription("");
      setFile(null);
      setShowUpload(false);
    } catch (error) {
      console.error("Upload failed:", error);
      setMessage("❌ Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
      setMessage("");
      setProgress(0);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-4 sm:mt-6 md:mt-10 bg-white rounded-xl shadow-xl px-4 py-6 sm:px-6 md:px-8 space-y-4 sm:space-y-6">
      {/* Title & Description Inputs */}
      <div className="grid gap-4">
        <input
          type="text"
          placeholder="Document Title"
          className="w-full border border-gray-300 rounded px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-[#3D61AB] focus:border-[#3D61AB] text-sm sm:text-base"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="w-full border border-gray-300 rounded px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-[#3D61AB] focus:border-[#3D61AB] text-sm sm:text-base"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Drop Zone */}
      <div
        className={`border-2 border-dashed rounded-xl p-4 sm:p-6 md:p-10 text-center transition ${
          dragOver ? "border-[#3D61AB] bg-green-50" : "border-gray-300"
        }`}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
      >
        <div className="flex flex-col items-center space-y-3">
          <Upload className="text-[#3D61AB] w-8 h-8 sm:w-10 sm:h-10" />
          <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-700 text-center">
            Drag & drop files or{" "}
            <span
              className="text-[#4aa36f] underline cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              Browse
            </span>
          </p>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf,.doc,.docx"
          />
          <p className="text-xs sm:text-sm text-gray-400">
            Supported: PDF, Word
          </p>
        </div>
      </div>

      {/* File Info Preview */}
      {file && (
        <div className="flex items-center gap-3 mt-2">
          <div className="w-10 h-10 bg-gray-100 border rounded flex items-center justify-center text-xl">
            📄
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm sm:text-base font-medium text-gray-800 truncate">
              {file.name}
            </p>
            <p className="text-xs text-gray-500">
              {(file.size / 1024).toFixed(2)} KB
            </p>
          </div>
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="w-full mt-4 bg-[#3D61AB] hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 text-sm sm:text-base"
      >
        {uploading ? "Uploading..." : "Upload Document"}
      </button>

      {/* Upload Progress */}
      {uploading && (
        <div className="w-full bg-gray-200 rounded h-3 overflow-hidden mt-4">
          <div
            className="bg-[#3D61AB] h-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Message Feedback */}
      {message && (
        <p className="text-center mt-4 text-sm font-medium text-gray-700">
          {message}
        </p>
      )}
    </div>
  );
}
