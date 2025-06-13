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
      const data = await getGeneralResource(router, 'course-id'); // pass actual course ID if needed
      if (data?.data) {
        setDocuments(data.data);
      }
    };

    fetchData();
  }, []);

  return (
    <>

       <p className="text-3xl mt-28 mx-12 text-[#88AE98] font-bold mb-6 ml-22">
        General Resources
         </p>
    <div className="flex items-center justify-center  mb-20">
      <div className="mt-26 flex flex-row gap-6">
        {documents.map((doc, index) => (
          <a
            key={index}
            href={doc.documents}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-lg shadow-lg border border-gray-100 px-12 py-4 flex flex-col items-center cursor-pointer hover:shadow-xl transition-shadow"
          >
            <FileArchive
              className="h-[85px] w-[85px] mb-3 mt-4"
              style={{ color: '#64B5F6' }}
            />
            <div className="text-center">
              <p className="text-gray-800 font-medium mb-1">Resource {index + 1}</p>
              <p className="text-gray-500 text-sm">{doc.type.toUpperCase()}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
    </>
  );
};

export default Page;
