"use client"
import Image from "next/image";

const newsData = [
  {
    image: "https://immigrationnavigator.co.uk/wp-content/uploads/2023/06/educator-img13-1024x683-1-300x200.jpg",
    tag: "LEARNING",
    title: "You Can Now Listen To The Entire Our Library",
    description:
      "Fusce elementum sapien id erat accumsan, ac egestas dui commodo. Pellentesque ac feugiat odio. Quisque aliquam dapibus nunc eget rhoncus. Nam ut elit at est",
    date: "July 18, 2023",
    comments: "No Comments",
  },
  {
    image: "https://immigrationnavigator.co.uk/wp-content/uploads/2023/06/course8-300x180.png",
    tag: "LEARNING",
    title: "You could win a year of free access to Courses",
    description:
      "Are you looking to make career moves this year? Whether you want to launch your career, advance in your current one, or switch jobs entirely.",
    date: "June 14, 2023",
    comments: "No Comments",
  },
  {
    image: "https://immigrationnavigator.co.uk/wp-content/uploads/2023/06/course2-1-1-300x180.png",
    tag: "ONLINE",
    title: "You Can Now Listen To The Entire Our Library",
    description:
      "Fusce elementum sapien id erat accumsan, ac egestas dui commodo. Pellentesque ac feugiat odio. Quisque aliquam dapibus nunc eget rhoncus. Nam ut elit at est",
    date: "June 14, 2023",
    comments: "No Comments",
  },
];

export default function Page() {
  return (
    <div className="min-h-screen  py-26 mt-32 px-4">
      <div className="max-w-5xl mx-auto mb-16">
        <h2 className="text-center text-3xl md:text-4xl font-semibold mb-12">
          Our <span className="text-[#88B29A]">Latest News</span>
        </h2>

        <div className="grid md:grid-cols-3 overflow-hidden gap-6">
          {newsData.map((item, idx) => (
            <div key={idx} className=" rounded-lg overflow-hiddesn ">
              <div className="relative">
              {/* <div className="relative" */}

              <Image
                src={item.image}
                alt={item.title}
                className="w-full h-54 object-fill"
                width={300}
                height={380}
                />
                <span className="absolute top-4 right-4 bg-[#69727d] text-white px-3 py-1 rounded-full text-sm">
                  {item.tag}
                </span>
                </div>
              <div className="relative">
              </div>
              <div className="p-6 bg-[#88B29A]">
                <h3 className="text-xl font-medium mb-3 text-white">{item.title}</h3>
                <p className="text-white/90 mb-4">{item.description}</p>
                <button className="text-white cursor-pointer text-sm font-semibold hover:text-white/80">
                  READ MORE »
                </button>
                <div className="mt-4 pt-4  border-t border-white/20 flex justify-between items-center text-sm text-white">
                  <span>{item.date}</span>
                  <span>{item.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
