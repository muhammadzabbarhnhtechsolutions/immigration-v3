'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getRefrenceMaterial } from '@/services/refrenceMaterialServices';
import { FileArchive, VideoIcon } from 'lucide-react';


const Page = () => {
  const [documents, setDocuments] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRefrenceMaterial(router);
      if (data?.data) {
        setDocuments(data.data);
      }
    };

    fetchData();
  }, []);

  return (
      <>
    <div className='pl-22 '>
    </div>
      <div className='flex items-left mx-8 justify-start mb-6'>
       <p className="text-3xl mt-24 text-[#88AE98] text-left font-bold mb-6 ml-22">
         Reference Materials
         </p>
      </div>
      
    <div className="flex items-center justify-center flex-col mb-20 ">
      <div className="mt-22 flex flex-wrap justify-center gap-6">
        {documents.map((doc, index) => (
          <a
            key={doc.id}
            href={doc.file}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-lg shadow-lg border px-12 py-4 flex flex-col items-center cursor-pointer hover:shadow-xl transition-shadow w-72"
          >
            <FileArchive className="h-[85px] w-[85px] mb-3 mt-4 text-[#64B5F6]" />
            <div className="text-center">
              <p className="text-gray-800 font-semibold mb-1">{doc.title}</p>
              {/* <p
                className="text-gray-500 text-sm mb-1"
                dangerouslySetInnerHTML={{ __html: doc.description }}
              />
              <p className="text-gray-400 text-xs">{doc.type.toUpperCase()}</p> */}
            </div>
          </a>
        ))}
      </div>
    </div>
    </>
  );
};

export default Page;
