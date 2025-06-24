"use client";
import React, { useState } from "react";
import { FileText, File, ChevronDown, Check, X } from "lucide-react";

export default function VisaDocumentViewer() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const visaOptions = ["Tourist Visa", "Business Visa", "Student Visa"];

  const allDocuments = [
    { name: "Passport Copy", type: "pdf", category: "Tourist Visa" },
    { name: "Invitation Letter", type: "docx", category: "Business Visa" },
    { name: "Bank Statement", type: "pdf", category: "Student Visa" },
    { name: "Admission Letter", type: "docx", category: "Student Visa" },
    { name: "Company Letterhead", type: "pdf", category: "Business Visa" },
  ];

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const removeCategory = (category) => {
    setSelectedCategories((prev) => prev.filter((item) => item !== category));
  };

  const filteredDocuments = allDocuments.filter((doc) =>
    selectedCategories.includes(doc.category)
  );

  return (
    <div className="min-h-screen mt-14 p-6 ">
      <div className="max-w-5xl mx-auto rounded-2xl  p-10 ">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-[#88ae98]">
          Visa Document Viewer
        </h1>

        {/* Dropdown */}
        <div className="relative mb-10">
          <label className="block text-gray-700 font-semibold mb-3 text-lg">
            Select Visa Type
          </label>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full border-2 border-gray-300 rounded-xl p-3 bg-white flex flex-wrap gap-2 items-center shadow-md hover:border-[#88ae98] transition duration-200"
          >
            {selectedCategories.length > 0 ? (
              <>
                {selectedCategories.map((cat) => (
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
                ))}
              </>
            ) : (
              <span className="text-gray-500">Choose visa type</span>
            )}
            <ChevronDown className="ml-auto h-5 w-5 text-gray-500" />
          </button>

          {dropdownOpen && (
            <div className="absolute mt-2 z-10 w-full bg-white border border-gray-300 rounded-xl shadow-lg p-4 animate-fade-in">
              {visaOptions.map((option) => (
                <label
                  key={option}
                  className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-100 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(option)}
                      onChange={() => toggleCategory(option)}
                      className="accent-green-600 checked:text-[#88ae98] focus:ring-0"
                    />
                    <span className="text-gray-700">{option}</span>
                  </div>
                  {selectedCategories.includes(option) && (
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
          {filteredDocuments.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDocuments.map((doc, idx) => (
                <li
                  key={idx}
                  className="border border-gray-200 rounded-xl shadow-md p-5 flex items-center gap-4 bg-gray-50 transition hover:scale-[1.02]"
                >
                  {doc.type === "pdf" ? (
                    <FileText className="text-red-500 w-10 h-10" />
                  ) : (
                    <File className="text-blue-500 w-10 h-10" />
                  )}
                  <div>
                    <p className="font-semibold text-gray-800">{doc.name}</p>
                    <p className="text-sm text-gray-500">{doc.category}</p>
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

      {/* Dropdown Animation */}
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
