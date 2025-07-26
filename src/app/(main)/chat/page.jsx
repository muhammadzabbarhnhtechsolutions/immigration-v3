"use client"
import React, { useState, useRef, useEffect } from "react";
import { X, Plus } from "lucide-react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: "bot", text: "This is a response from the chatbot." },
  ]);
  const [input, setInput] = useState("");
  const chatboxRef = useRef(null);

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages((prev) => [...prev, { type: "user", text: input }]);
      setTimeout(() => {
        setMessages((prev) => [...prev, { type: "bot", text: "This is a response from the chatbot." }]);
      }, 500);
      setInput("");
    }
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setOpen(!open)}
          className="bg-[#3D61AB] hover:bg-[#3D61AB] text-white py-3 px-5 rounded-full shadow-xl flex items-center gap-2 transition-all duration-300 hover:scale-105"
        >
          <Plus className="w-5 h-5" /> Chat with Admin Bot
        </button>
      </div>

      {open && (
        <div className="fixed bottom-24 right-4 w-[380px] max-w-[90%] rounded-xl overflow-hidden shadow-2xl animate-fade-in z-50">
          <div className="bg-white flex flex-col h-[500px] border border-gray-200 rounded-lg">
            <div className="bg-[#3D61AB] text-white px-4 py-3 flex justify-between items-center">
              <span className="font-semibold text-lg">Chat</span>
              <button onClick={() => setOpen(false)} className="hover:text-gray-200">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div ref={chatboxRef} className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#f9fdfa]">
              {messages.map((msg, idx) => (
                <div key={idx} className={msg.type === "user" ? "text-right" : "text-left"}>
                  <p className={`${msg.type === "user" ? "bg-[#3D61AB] text-white" : "bg-gray-200 text-gray-800"} px-4 py-2 rounded-2xl inline-block`}>{msg.text}</p>
                </div>
              ))}
            </div>
            <div className="border-t p-3 flex gap-2 bg-white">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3D61AB]"
              />
              <button
                onClick={handleSend}
                className="bg-[#3D61AB] hover:bg-[#3D61AB] text-white px-5 py-2 rounded-full shadow-md transition hover:scale-105"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
