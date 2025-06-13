"use client";
import { useEffect, useState } from "react";
import { Star, PlayCircle } from "lucide-react";
import Image from "next/image";
import { getVideoTrailor } from "../../services/VideoTrailor"; // Adjust the import path as necessary
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function VideoTrailor() {
  const [playingIndex, setPlayingIndex] = useState(null);
  const router = useRouter();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEBooks = async () => {
      setLoading(true);
      const data = await getVideoTrailor(router);
      if (data) setBooks(data?.data);
      setLoading(false);
    };
    fetchEBooks();
  }, [router]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
        <p className="text-lg font-semibold text-gray-700">
          Loading Video Trailors...
        </p>
      </div>
    );
  }

  return (
    <section className="px-14 py-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl text-[#88AE98] font-bold mb-6">
          Video Trailors
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {books?.map((book, index) => (
            <div
              key={index}
              className="group bg-white cursor-pointer rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition duration-300 pb-4 transform hover:-translate-y-1"
            >
              <div className="relative w-full h-64 bg-black">
                {/* <Link href="/course-module"> */}
                {playingIndex === index ? (
                  <video
                    src={decodeURIComponent(book.file)}
                    controls
                    autoPlay
                    className="w-full h-full object-cover"
                    onEnded={() => setPlayingIndex(null)}
                  />
                ) : (
                  <>
                    {book.thumbnail ? (
                      <Image
                        src={book.thumbnail}
                        alt={book.title}
                        fill
                        className="object-cover object-top rounded-t-lg"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center text-white">
                        No Thumbnail
                      </div>
                    )}

                    <div
                      onClick={() => setPlayingIndex(index)}
                      className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/40 transition"
                    >
                      <PlayCircle className="w-16 h-16 text-white" />
                    </div>
                  </>
                )}
                {/* </Link> */}
              </div>
              <div className="px-3 py-2 mt-2">
                <h3 className="font-semibold mb-1 text-black line-clamp-2 text-sm leading-tight">
                  {book.title}
                </h3>
                <div>
                  <p
                    className="line-clamp-3"
                    dangerouslySetInnerHTML={{
                      __html: book?.description || "No description available.",
                    }}
                  />
                </div>
                {/* <p className="text-gray-600 text-xs">{book.author}</p>
                <div className="flex items-center gap-1 text-xs mt-1">
                  <div className="flex items-center text-yellow-500">
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
                    ({book.reviews.toLocaleString()})
                  </span> */}
                {/* </div> */}
                {/* <p className="text-gray-800 font-medium text-sm mt-1">
                  {book.price}
                </p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// user/e-book/view/
