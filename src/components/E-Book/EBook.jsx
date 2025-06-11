"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import Image from "next/image";
import { getEBooks } from "../../services/blogService"; // Adjust the import path as necessary
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
    return <div className="flex flex-col items-center justify-center py-24">
  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
  <p className="text-lg font-semibold text-gray-700">Loading E-Book...</p>
</div>
;
  }

  return (
    <section className="px-6 py-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl text-[#88AE98] font-bold mb-6">E-Book</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {books?.map((book, index) => (
            <div
              key={index}
              className="group bg-white cursor-pointer rounded-lg overflow-hidden shadow-sm hover:shadow-xl pb-4 transition duration-300 transform hover:-translate-y-1"
            >
              <div className="relative w-full h-64">
                <Image
                  src={book?.thumbnail || "/placeholder.jpg"} // Fallback image
                  alt={book?.title}
                  fill
                  className="object-cover object-top rounded-t-lg"
                />
              </div>
              <div className="px-3 py-2">
                <h3 className="font-semibold text-black line-clamp-2 mt-2 text-sm leading-tight">
                  {book?.title}
                </h3>
                <p className="text-gray-600 text-xs">{book.author}</p>
                <div className="flex items-center gap-1 text-xs mt-1">
                  <div>
                 <p className="line-clamp-3" dangerouslySetInnerHTML={{ __html: book?.description || "No description available." }} />
                  </div>
                  {/* <div className="flex items-center text-yellow-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.round(book.rating) ? "" : "opacity-30"
                        }`}
                        fill="currentColor"
                      />
                    ))}
                  </div>
                  <span className="text-gray-500">
                    ({book.reviews?.toLocaleString?.() || 0})
                  </span> */}
                </div>
                {/* <p className="text-gray-800 font-medium text-sm mt-1">
                  {book.price || "$0.00"}
                </p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
