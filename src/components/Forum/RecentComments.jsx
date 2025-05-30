import Image from "next/image";

const comments = [
  {
    name: "Diana Amber",
    comment: "Lorem ipsum dolor",
    image: "/avatars/avatar1.jpg",
  },
  {
    name: "Emi",
    comment: "Lorem ipsum dolor",
    image: "/avatars/avatar2.jpg",
  },
  {
    name: "Nicole",
    comment: "Lorem ipsum dolor",
    image: "/avatars/avatar3.jpg",
  },
  {
    name: "Olivia Steward",
    comment: "Lorem ipsum dolor",
    image: "/avatars/avatar4.jpg",
  },
  {
    name: "Sophia Page",
    comment: "Lorem ipsum dolornd",
    image: "/avatars/avatar5.jpg",
  },
];

 export const RecentComments = ({profileData}) => {
  return (
    <div className=" text-white p-4 rounded-lg ">
      <h2 className="text-gray-400 text-lg mb-4">Recent Comments</h2>
      <div className="flex flex-col gap-4">
        {comments.map((user, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
              <Image
                src={profileData?.profile}
                alt={user.name}
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex flex-col text-sm">
              <span className="text-sky-400 font-semibold">{user.name}</span>
              <span className="text-pink-400">{user.comment}</span>
              <div className="w-full border-b border-gray-400 mt-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


