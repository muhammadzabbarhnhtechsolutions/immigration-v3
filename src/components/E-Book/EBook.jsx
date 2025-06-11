"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getEBooks } from "../../services/blogService";

export default function BookSection() {
  const router = useRouter();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEBooks = async () => {
      setLoading(true);
      const data = await getEBooks(router);
      if (data) setBooks(data?.data);
      setLoading(false);
    };

    fetchEBooks();
  }, [router]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
        <p className="text-lg font-semibold text-gray-700">Loading E-Book...</p>
      </div>
    );
  }

  return (
    <section className="px-6 py-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl text-[#88AE98] font-bold mb-6">E-Book</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {books?.map((book, index) => (
            <div
              key={index}
              className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl pb-4 transition duration-300 transform hover:-translate-y-1"
            >
              {/* Wrap the image in an anchor tag to trigger PDF download */}
              <a
                href={book?.file}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-full h-64 block"
              >
                <Image
                  src={book?.thumbnail || "/placeholder.jpg"}
                  alt={book?.title}
                  fill
                  className="object-cover object-top rounded-t-lg"
                />
              </a>

              <div className="px-3 py-2">
                <h3 className="font-semibold text-black line-clamp-2 mt-2 text-sm leading-tight">
                  {book?.title}
                </h3>
                <p className="text-gray-600 text-xs">{book.author}</p>
                <div className="text-xs mt-1">
                  <p
                    className="line-clamp-3"
                    dangerouslySetInnerHTML={{
                      __html: book?.description || "No description available.",
                    }}
                  />
                </div>

                {/* Optional: Separate download button */}
                <a
                  href={book?.file}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-xs text-blue-600 hover:underline"
                >
                  Download PDF
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
