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
      <div className="mx-auto bg-[#ebf0ed] px-4 mt-0 py-20 text-center flex flex-col items-center justify-center gap-4 animate-fade-in">
        {/* Spinner */}
        <div className="h-10 w-10 border-4 border-[#3D61AB] border-t-transparent rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-[#3D61AB] text-lg font-medium">
          Loading Video Trailor...
        </p>
      </div>
    );
  }

  return (
   <section className="px-4 sm:px-8 lg:px-14 py-14 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#3D61AB] font-bold mb-6">
          Video Trailers
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book, index) => (
            <div
              key={index}
              className="group bg-white cursor-pointer rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
            >
              {/* Video / Thumbnail */}
              <div className="relative w-full h-48 sm:h-56 md:h-64 bg-black">
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

                    <button
                      onClick={() => setPlayingIndex(index)}
                      className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/40 transition"
                      aria-label="Play trailer"
                    >
                      <PlayCircle className="w-14 h-14 sm:w-16 sm:h-16 text-white" />
                    </button>
                  </>
                )}
              </div>

              {/* Title & Description */}
              <div className="px-3 py-3 sm:py-4">
                <h3 className="font-semibold mb-1 text-black line-clamp-2 text-sm sm:text-base leading-tight">
                  {book.title}
                </h3>
                <p
                  className="line-clamp-3 text-xs sm:text-sm text-gray-700"
                  dangerouslySetInnerHTML={{
                    __html: book?.description || "No description available.",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// user/e-book/view/
