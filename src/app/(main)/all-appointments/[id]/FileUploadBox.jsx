"use client";
import React, { useState, useRef } from "react";
import { Upload } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { CreateAppointmentDocuments } from "../../../../services/createAppointmentDocuments";
import { toast } from "react-toastify";

export default function FileUploadBox({ setShowUpload }) {
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

    // ✅ Upload succeeded — reset + close modal
    setMessage("Upload successful!");
    toast.success("Document uploaded successfully!");
    setTitle("");
    setDescription("");
    setFile(null);
    setShowUpload(true); // ✅ modal closes here

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
    <div className="max-w-2xl mx-auto z-[100] bg-white rounded-xl shadow-xl p-6 space-y-4">
      <div className="grid gap-4">
        <input
          type="text"
          placeholder="Document Title"
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3D61AB] focus:border-[#3D61AB]"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3D61AB] focus:border-[#3D61AB]"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div
        className={`border-2 border-dashed rounded-xl p-10 text-center transition ${
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
          <Upload className="text-[#3D61AB] w-10 h-10" />
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
        className="mt-4 w-full bg-[#3D61AB] hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition"
      >
        {uploading ? "Uploading..." : "Upload Document"}
      </button>

      {uploading && (
        <div className="mt-4 w-full bg-gray-200 rounded h-3 overflow-hidden">
          <div
 className="mt-6 inline-block px-6 py-2.5 rounded-full bg-[#3D61AB] text-white font-semibold shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl active:scale-95"            style={{ width: `${progress}%` }}
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
