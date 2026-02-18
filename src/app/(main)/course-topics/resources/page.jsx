"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { FileText, FolderOpen, BookOpen, Upload } from "lucide-react";

function ResourcesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = searchParams.get("course_id");

  // 2 cards configuration
  const cards = [
    {
      id: "templates",
      name: "Templates",
      description: "View Templates",
      icon:  BookOpen,
      color: "bg-gradient-to-br from-[#88B29A]/20 to-[#88B29A]/10 border-[#88B29A]/30 hover:from-[#88B29A]/30 hover:to-[#88B29A]/20",
      iconColor: "text-[#88B29A]"
    }, {
      id: "sample_docs",
      name: "Sample Docs",
      description: "View sample documents",
      icon: FileText,
      color: "bg-gradient-to-br from-[#88B29A]/20 to-[#88B29A]/10 border-[#88B29A]/30 hover:from-[#88B29A]/30 hover:to-[#88B29A]/20",
      iconColor: "text-[#88B29A]"
    },
    {
      id: "general_resources",
      name: "General Resources",
      description: "Access general resources",
      icon: FolderOpen,
      color: "bg-gradient-to-br from-[#88B29A]/20 to-[#88B29A]/10 border-[#88B29A]/30 hover:from-[#88B29A]/30 hover:to-[#88B29A]/20",
      iconColor: "text-[#88B29A]"
    },{
  id: "document_upload_instruction",
  name: "Document Upload Instructions",
  description: "Instructions for uploading your documents safely", // updated description
  icon: Upload, // icon changed to Upload symbol
 color: "bg-gradient-to-br from-[#88B29A]/20 to-[#88B29A]/10 border-[#88B29A]/30 hover:from-[#88B29A]/30 hover:to-[#88B29A]/20",
      iconColor: "text-[#88B29A]"
}

  ];

  // Handle card click
  const handleCardClick = (cardId) => {
    if (courseId) {
      router.push(`/user/general/resource/resource_template_view/?course_id=${courseId}&category=${cardId}`);
    } else {
      // Use a default course_id or show error
      router.push(`/user/general/resource/resource_template_view/?category=${cardId}`);
    }
  };

  return (
    <section className="px-4 sm:px-12 py-16 ">
      <h4 className="text-2xl font-marko mt-1 sm:text-4xl md:text-center  ">
Resources        </h4>

      {/* 3 Cards Grid */}
      <div className="flex flex-wrap gap-4 mt-12 max-w-7xl mx-auto">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`w-full sm:w-[240px] md:w-[360px] ml-4 ${card.color} border rounded-xl px-6 py-10 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
            >
              <Icon className={`h-16 w-16 mb-4 ${card.iconColor}`} />
              <p className="text-gray-800 font-semibold text-lg mb-1">
                {card.name}
              </p>
              <p className="text-gray-500 text-sm text-center">
                {card.description}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function ResourcesPageSuspense() {
  return (
    <Suspense fallback={
      <section className="px-4 sm:px-12 py-16">
        <h4 className="text-2xl font-marko mt-1 sm:text-4xl md:text-center">
          Resources
        </h4>
        <div className="flex flex-wrap gap-4 mt-12 max-w-7xl mx-auto">
          {/* Loading skeleton for cards */}
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-full sm:w-[240px] md:w-[360px] ml-4 bg-gray-200 border rounded-xl px-6 py-10 animate-pulse"
            >
              <div className="h-16 w-16 mb-4 bg-gray-300 rounded-full mx-auto"></div>
              <div className="h-6 w-24 bg-gray-300 rounded mx-auto mb-2"></div>
              <div className="h-4 w-32 bg-gray-300 rounded mx-auto"></div>
            </div>
          ))}
        </div>
      </section>
    }>
      <ResourcesPage />
    </Suspense>
  );
}

export default function Page() {
  return <ResourcesPageSuspense />;
}

