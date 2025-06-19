"use client";
import React, { useState, useRef } from "react";
import { Upload } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { CreateAppointmentDocuments } from "../../../../services/createAppointmentDocuments";

export default function FileUploadBox() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const router = useRouter();
  const { id: appointmentId } = useParams();

  const handleFileChange = (e) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0]);
      setMessage("");
      setProgress(0);
    }
  };

  const handleUpload = async () => {
    if (!file || !title || !description || !appointmentId) {
      setMessage("⚠️ All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("appointment", appointmentId);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("document", file);

    try {
      setUploading(true);
      await CreateAppointmentDocuments(router, formData);
      setMessage("✅ Upload successful!");
      setTitle("");
      setDescription("");
      setFile(null);
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
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-xl p-6 space-y-4">
      <div className="grid gap-4">
        <input
          type="text"
          placeholder="Document Title"
          className="border border-gray-300 rounded px-4 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="border border-gray-300 rounded px-4 py-2"
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
            accept=".jpeg,.png,.gif,.mp4,.pdf,.doc,.docx"
          />
          <p className="text-sm text-gray-400">
            Supported: JPEG, PNG, GIF, MP4, PDF, Word
          </p>
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
