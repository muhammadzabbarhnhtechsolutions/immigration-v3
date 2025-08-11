import Image from 'next/image';
import icon1 from '../../assets/i1.png';
import icon2 from '../../assets/i2.png';
import icon3 from '../../assets/i3.png';
import icon4 from '../../assets/i4.png';
import icon5 from '../../assets/i6.png';
import i7 from '../../assets/i7.png';
import i9 from '../../assets/i9.png';
import i8 from '../../assets/i8.png';

import { File } from 'lucide-react';

export default function InfoSection() {
  const keyFeatures = [
    {
      icon: icon2,
      title: 'Easy to Step-by-step courses',
      // text: 'Intuitive interface for seamless navigation and learning.',
      isSvg: false,
    },
    {
      icon: icon4,
      title: 'Podcast & video learning',
      // text: 'Courses taught by experienced immigration professionals.',
      isSvg: false,
    },
    {
      icon: icon3,
      title: 'Downloadable templates',
      // text: 'Practical exercises and case studies to enhance your skills.',
      isSvg: true,
    },
    {
      icon: icon5,
      title: 'Instant feedback quizzes',
      // text: 'Access video lectures anytime, anywhere.',
      isSvg: false,
    },
    {
      icon: icon3,
      title: 'Verified by immigration lawyers',
      // text: 'Downloadable templates and tools for instant use.',
      isSvg: false,
    },
     {
      icon: icon1,
      title: 'Active support & community',
      // text: 'Downloadable templates and tools for instant use.',
      isSvg: false,
    },
  ];

  const audience = [
    {
      icon: i7,
      title: 'Lawyers',
      text: 'Stay updated with legal training',
    },
    {
      icon: i8,
      title: 'Students',
      text: 'Learn how to apply the right way',
    },
    {
      icon: i9,
      title: 'General Public',
      text: 'Understand your immigration options',
    },
  ];

  return (
    <section className="bg-white text-gray-900 px-4 sm:px-8 lg:px-12 py-16 sm:py-24">
      {/* --- KEY FEATURES --- */}
    

      {/* --- WHO IS IT FOR --- */}
      <div className="max-w-6xl mx-auto mt-20 sm:mt-14 px-2 sm:px-0">
      
        <h2 style={{ fontFamily: 'Marcellus, serif' }} className="text-2xl sm:text-5xl md:text-center mb-10 sm:mb-4">
          Who Is Immigration Navigator For?
        </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:py-12">
  {audience.map(({ icon, title, text }, idx) => (
    <div
      key={idx}
      className="bg-[#3F855D40] bg-opacity-20 border border-[#D9E3F2] p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
    >
      {/* Icon + Title Row */}
      <div className="flex items-center gap-4 mb-4">
        <Image
          src={icon}
          alt={title}
          width={64}
          height={64}
          className="rounded-lg"
        />
        <h3 style={{ fontFamily: 'Marcellus, serif' }} className="font-semibold text-2xl sm:text-2xl ml-2 text-[#1A2B4B]">
          {title}
        </h3>
      </div>

      {/* Description */}
      <p className="text-sm text-[#637587] leading-relaxed">{text}</p>
    </div>
  ))}
</div>

      </div>

        <div className="max-w-7xl mt-14 md:mt-30 ">
        <h2 style={{ fontFamily: 'Marcellus, serif' }} className="text-3xl text-center sm:text-5xl  text-gray-800 mb-14">
          Why Choose Us?
        </h2>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {keyFeatures.map(({ icon, title, text, isSvg }, idx) => (
            <div
              key={idx}
              className=" flex items-center justify-center flex-col cursor-pointer border bg-[#3F855D40] border-gray-200 p-6 rounded-2xl hover:shadow-xl transition-all duration-300"
            >
              <div className="mb-4 h-[65px] w-[65px] flex items-center text-center justify-center">
              
                  <Image
                    src={icon}
                    alt={title}
                    width={74}
                    height={74}
                    className="rounded-md flex items-center text-center justify-center "
                  />
                {/* )} */}
              </div>
              <h3 className="font-semibold text-center text-lg text-gray-800 mb-2">{title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
