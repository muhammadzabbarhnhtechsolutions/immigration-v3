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
    title: "Send Meeting Links",
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

  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const hanldeGetChatsMessages = ()=>{
     if (showChat && appointmentId) {
      getChatMessages(appointmentId, router).then((res) => {
        if (res) {
          setMessages(
            res.map((msg) => ({
              text: msg.message,
              type: msg.admin ? "admin" : "user",
            })).reverse()
          );
        }
      });
    }
  }
  useEffect(() => {
   hanldeGetChatsMessages()
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
      <h2 className="text-3xl mt-6 font-bold text-[#71a587] mb-10">
        Appointment
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="relative z-10 h-[306px] bg-white rounded-2xl shadow-xl w-full max-w-xs mx-auto"
          >
            <div className="bg-[#5AAA7C] h-36 rounded-t-xl flex justify-center items-center relative">
              <div className="bg-white w-28 h-28 rounded-full flex items-center justify-center shadow-lg border-4 border-white absolute -bottom-12">
                {card.icon}
              </div>

              {card.dropdown && (
                <div className="absolute top-4 right-4 group">
                  <MoreVertical
                    className="text-white cursor-pointer"
                    size={20}
                  />
                  <div className="absolute right-0 mt-0 hidden group-hover:block bg-white rounded-lg shadow-lg text-sm text-gray-700 z-10 w-44">
                    {card.title === "Send Meeting Links" ? (
                      <>
                        <Link
                          href={`/all-appointments/meetings/s?type=1&appointment_id=${id}`}
                          className="block cursor-pointer w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                        >
                          <Image src={img5} alt="Zoom" className="w-6 h-6" />
                          Zoom Meeting
                        </Link>
                        <Link
                          href={`/all-appointments/meetings/s?type=2&appointment_id=${id}`}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                        >
                          <Image src={img4} alt="Google" className="w-6 h-6" />
                          Google Meeting
                        </Link>
                      </>
                    ) : (
                      <Link href={`/documents/${id}`}>
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                          <Eye size={16} /> View
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-16 pb-6 px-6 text-center">
              {card.title === "Upload Document" ? (
                <button
                  onClick={() => setShowUpload(true)}
                  className="mt-6 inline-block px-6 py-2.5 rounded-full bg-[#5aaa7c] text-white font-semibold shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl active:scale-95"
                >
                  {card.title}
                </button>
              ) : (
                <button
                  onClick={() => setShowChat(true)}
                  className="mt-6 inline-block px-6 py-2.5 rounded-full bg-[#5aaa7c] text-white font-semibold shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl active:scale-95"
                >
                  {card.title}
                </button>
              )}
            </div>
            {/* ...... */}
            {showChat && (
              <div className="fixed bottom-8 top-52 right-6 z-[100] w-full max-w-[358px] rounded-2xl shadow-2xl bg-gray-200 animate-slide-up border border-gray-300 overflow-hidden transition-all duration-500 ease-in-out">
                {/* Chat Header */}
                <div className="bg-gradient-to-r from-[#5AAA7C] to-[#46996a] text-white px-5 py-4 flex justify-between items-center">
                  <h3 className="font-semibold flex gap-2 text-xl tracking-wide">
                    <MessageCircleCode className="mt-0" /> Admin Bot
                  </h3>
       <button
  onClick={hanldeGetChatsMessages}
  className="w-6 h-6 ml-24 flex justify-center items-center rounded-full bg-green-100 text-green-600 shadow-sm hover:shadow-md hover:scale-110 active:scale-95 transition duration-300"
  title="Refresh Messages"
>
  <RotateCw size={15} />
</button>


                  <button
                    onClick={() => setShowChat(false)}
                    className="text-white hover:text-gray-200 text-lg font-bold transition-transform transform hover:scale-125"
                  >
                    <X />
                  </button>
                </div>
                {/* ... */}
                {/* Chat Body */}
                <div className="p-4 h-72 overflow-y-auto bg-white space-y-3 ">
                  {messages?.map((m, i) => (
                    <div
                      key={i}
                      className={m.type === "user" ? "text-right" : "text-left"}
                    >
                      <p
                        className={`inline-block py-2 px-4 rounded-2xl ${
                          m.type === "user"
                            ? "bg-[#5AAA7C] text-white"
                            : "bg-[#f7f7f7] text-gray-800"
                        }`}
                      >
                        {m.text}
                      </p>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>

                {/* Chat Input */}
                <div className="border-t flex items-center bg-white px-3 py-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleEnter}
                    className="w-full px-4 py-2 rounded-l-full text-sm border border-gray-300 focus:ring-2 focus:ring-[#5AAA7C] focus:outline-none transition"
                  />
                  <button
                    onClick={handleSend}
                    className="bg-[#5AAA7C] hover:bg-[#46996a] text-white px-4 py-2 rounded-r-full font-medium transition-all duration-300 hover:scale-105 shadow-md"
                  >
                    <SendHorizonal />
                  </button>
                </div>
              </div>
            )}

            <div className="absolute bottom-[-12px] -z-50 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white rotate-45"></div>
          </div>
        ))}
      </div>

      {showUpload && (
        <div className="fixed pt-[52px]  overflow-scroll inset-0 bg-black bg-opacity-5 flex items-center justify-center z-[100]">
          <div className="bg-white p-6 rounded-xl w-full max-w-xl relative transform transition-all duration-500 ease-out animate-slide-down">
            <button
              onClick={() => setShowUpload(false)}
              className="absolute top-2 right-3 text-green-500 font-medium hover:text-red-500 text-2xl"
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
    <div className="max-w-2xl mt-auto mx-auto bg-white rounded-xl shadow-xl p-6 space-y-4">
      <div className="grid gap-4">
        <input
          type="text"
          placeholder="Document Title"
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#57b17c] focus:border-[#57b17c]"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#57b17c] focus:border-[#57b17c]"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div
        className={`border-2 border-dashed rounded-xl p-10 text-center transition ${
          dragOver ? "border-[#57b17c] bg-green-50" : "border-gray-300"
        }`}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
      >
        <div className="flex flex-col items-center space-y-3">
          <Upload className="text-[#57b17c] w-10 h-10" />
          <p className="text-lg font-semibold text-gray-700">
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
          <p className="text-sm text-gray-400">Supported: PDF, Word</p>
        </div>
      </div>

      {file && (
        <div className="mt-2 flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-100 border rounded flex items-center justify-center">
            📄
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-800 truncate">
              {file.name}
            </p>
            <p className="text-xs text-gray-500">
              {(file.size / 1024).toFixed(2)} KB
            </p>
          </div>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="mt-4 w-full bg-[#57b17c] hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition"
      >
        {uploading ? "Uploading..." : "Upload Document"}
      </button>

      {uploading && (
        <div className="mt-4 w-full bg-gray-200 rounded h-3 overflow-hidden">
          <div
            className="bg-[#57b17c] h-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {message && (
        <p className="mt-4 text-center text-sm font-medium text-gray-700">
          {message}
        </p>
      )}
    </div>
  );
}
