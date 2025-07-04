'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getGeneralResource } from '../../../../services/generalResourcesServices';
import { FileArchive } from 'lucide-react';

const Page = () => {
  const [documents, setDocuments] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getGeneralResource(router, 'course-id'); // Replace 'course-id' if needed
      if (data?.data) {
        setDocuments(data.data);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <p className="text-[26px] sm:text-3xl mt-12 md:mt-28 px-4 sm:px-12 text-[#88AE98] font-bold mb-6">
        General Resources
      </p>

      <div className="flex justify-center mb-20 px-4">
        <div className="flex flex-wrap justify-center gap-6 max-w-6xl">
          {documents.map((doc, index) => (
            <a
              key={index}
              href={doc.documents}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white w-full sm:w-[240px] md:w-[260px] rounded-xl shadow-lg border border-gray-100 px-6 py-6 flex flex-col items-center cursor-pointer hover:shadow-xl transition-shadow"
            >
              <FileArchive className="h-16 w-16 mb-3 text-[#64B5F6]" />
              <div className="text-center">
                <p className="text-gray-800 font-semibold mb-1">Resource {index + 1}</p>
                <p className="text-gray-500 text-sm">{doc.type?.toUpperCase()}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
