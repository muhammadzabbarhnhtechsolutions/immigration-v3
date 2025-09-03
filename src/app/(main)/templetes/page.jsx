"use client";

import React, { useEffect, useState } from "react";
import { FileText, File, ChevronDown, Check, X } from "lucide-react";
import {
  getVisaCategories,
  getVisaDocuments,
} from "../../../services/VisaDocuments"; // ✅ Make sure both functions are exported here

export default function VisaDocumentViewer() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visaOptions, setVisaOptions] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getVisaCategories();
      if (data && Array.isArray(data)) {
        const mapped = data.map((item) => ({
          label: item.title, // use item.title from the response
          id: item.id,
        }));
        setVisaOptions(mapped);
      }
    };

    fetchCategories();
  }, []);
  const toggleCategory = async (category) => {
    const alreadySelected = selectedCategories.includes(category.label);
    let updatedCategories = [];

    if (alreadySelected) {
      updatedCategories = selectedCategories.filter(
        (c) => c !== category.label
      );
    } else {
      updatedCategories = [...selectedCategories, category.label];
    }

    setSelectedCategories(updatedCategories);

    if (!alreadySelected) {
      setLoading(true);
      const response = await getVisaDocuments(category.id); // returns array
      if (response) {
        const docsWithCategory = response.map((doc) => ({
          id: doc.id,
          name: doc.title,
          url: doc.file,
          category: category.label,
        }));
        setDocuments((prev) => [...prev, ...docsWithCategory]);
      }
      setLoading(false);
    } else {
      setDocuments((prev) =>
        prev.filter((doc) => doc.category !== category.label)
      );
    }
  };

  const removeCategory = (categoryLabel) => {
    setSelectedCategories((prev) => prev.filter((c) => c !== categoryLabel));
    setDocuments((prev) =>
      prev.filter((doc) => doc.category !== categoryLabel)
    );
  };

  return (
    <div className="min-h-screen mt-14 p-6">
      <div className="max-w-6xl mx-auto rounded-2xl md:p-10">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-[#88B29A]">
          Visa Document Viewer
        </h1>

        {/* Dropdown */}
        <div className="relative mb-10">
          <label className="block text-gray-700 font-semibold mb-3 text-lg">
            Select Visa Type
          </label>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full border-2 border-gray-300 rounded-xl p-3 bg-white flex flex-wrap gap-2 items-center shadow-md hover:border-[#88B29A] transition duration-200"
          >
            {selectedCategories.length > 0 ? (
              selectedCategories.map((cat) => (
                <span
                  key={cat}
                  className="flex items-center gap-2 py-2.5 bg-[#e6f4ec] text-[#2e6d57] px-3 rounded-full text-sm font-medium"
                >
                  {cat}
                  <X
                    className="h-4 w-4 cursor-pointer hover:text-red-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeCategory(cat);
                    }}
                  />
                </span>
              ))
            ) : (
              <span className="text-gray-500">Choose visa type</span>
            )}
            <ChevronDown className="ml-auto h-5 w-5 text-gray-500" />
          </button>

          {dropdownOpen && (
            <div className="absolute mt-2 z-10 w-full bg-white border border-gray-300 rounded-xl shadow-lg p-4 animate-fade-in max-h-64 overflow-y-auto">
              {visaOptions.map((option) => (
                <label
                  key={option.id}
                  className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-100 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(option.label)}
                      onChange={() => toggleCategory(option)}
                      className="accent-green-600 checked:text-[#88B29A] focus:ring-0"
                    />
                    <span className="text-gray-700">{option.label}</span>
                  </div>
                  {selectedCategories.includes(option.label) && (
                    <Check className="h-4 w-4 text-green-600" />
                  )}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Documents */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-700">Documents</h2>

          {loading ? (
            <p className="text-[#88B29A] font-medium text-center">
              Loading documents...
            </p>
          ) : documents.length > 0 ? (
           <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {documents.map((doc, idx) => (
    <li
      key={doc.id || idx}
      onClick={() => {
        const link = document.createElement("a");
        link.href = doc.url;
        link.download = doc.name || "document";
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }}
      className="cursor-pointer hover:-translate-y-3 bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-5 flex items-center gap-4 shadow-md hover:shadow-xl hover:scale-[1.03] transition-all duration-300"
    >
      {/* Icon with circular background */}
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-inner ${
          doc.type === 'pdf' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
        }`}
      >
        {doc.type === "pdf" ? (
          <FileText className="w-9 h-9" />
        ) : (
          <File className="w-9 h-9" />
        )}
      </div>

      {/* Document text */}
      <div className="flex-1">
        <p className="font-semibold text-gray-800 text-sm sm:text-base truncate">
          {doc.name}
        </p>
        <p className="text-xs text-gray-500">{doc.category}</p>
      </div>
    </li>
  ))}
</ul>

          ) : (
            <p className="text-gray-500 text-center mt-6">
              No documents to show. Select a visa type above.
            </p>
          )}
        </div>
      </div>

      {/* Animation */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.2s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
