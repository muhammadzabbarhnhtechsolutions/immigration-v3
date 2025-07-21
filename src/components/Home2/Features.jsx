import Image from 'next/image';
import icon1 from '../../assets/icon0001.png';
import icon2 from '../../assets/icon0002.png';
import icon3 from '../../assets/icon0003.png';
import icon4 from '../../assets/icon0004.png';
import icon5 from '../../assets/icon0005.png';
import icon6 from '../../assets/icon0006.png';
import icon7 from '../../assets/icon0007.png';
import icon8 from '../../assets/icon0008.png';
import { File } from 'lucide-react';

export default function InfoSection() {
  const keyFeatures = [
    {
      icon: icon5,
      title: 'Easy to Use',
      text: 'Intuitive interface for seamless navigation and learning.',
      isSvg: false,
    },
    {
      icon: icon4,
      title: 'Expert-Led',
      text: 'Courses taught by experienced immigration professionals.',
      isSvg: false,
    },
    {
      icon: File,
      title: 'Practice-Focused Material',
      text: 'Practical exercises and case studies to enhance your skills.',
      isSvg: true,
    },
    {
      icon: icon2,
      title: 'On-Demand Video Learning',
      text: 'Access video lectures anytime, anywhere.',
      isSvg: false,
    },
    {
      icon: icon1,
      title: 'Tools & Templates',
      text: 'Downloadable templates and tools for instant use.',
      isSvg: false,
    },
  ];

  const audience = [
    {
      icon: icon8,
      title: 'Lawyers',
      text: 'Stay ahead with CPD-ready content and templates.',
    },
    {
      icon: icon7,
      title: 'Students',
      text: 'Learn immigration law clearly and confidently.',
    },
    {
      icon: icon6,
      title: 'General Public',
      text: 'Understand your options and application process.',
    },
  ];

  return (
    <section className="bg-white text-gray-900 px-4 sm:px-8 lg:px-12 py-16 sm:py-24">
      {/* --- KEY FEATURES --- */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-3xl font-[600] text-gray-800 mb-4">
          Key Features
        </h2>
        <p className="text-base sm:text-lg text-gray-600 mb-10 sm:mb-12 max-w-3xl">
          Our platform provides powerful tools and expert guidance to help you navigate UK immigration law with confidence and ease.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {keyFeatures.map(({ icon, title, text, isSvg }, idx) => (
            <div
              key={idx}
              className="bg-[#3D61AB24] cursor-pointer border border-gray-200 p-6 rounded-2xl hover:shadow-xl transition-all duration-300"
            >
              <div className="mb-4 h-[34px] w-[34px] flex items-center justify-center">
                {isSvg ? (
                  <File className="text-[#3D61AB] w-[34px] h-[34px]" />
                ) : (
                  <Image
                    src={icon}
                    alt={title}
                    width={34}
                    height={34}
                    className="rounded-md"
                  />
                )}
              </div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">{title}</h3>
              <p className="text-sm text-[#637587] leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* --- WHO IS IT FOR --- */}
      <div className="max-w-6xl mx-auto mt-20 sm:mt-36 px-2 sm:px-0">
        <h2 className="text-2xl sm:text-4xl font-[600] md:text-center mb-10 sm:mb-12">
          Who Is Immigration Navigator For?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-center md:py-12">
          {audience.map(({ icon, title, text }, idx) => (
            <div
              key={idx}
              className="bg-[#F5F9FF] border border-[#D9E3F2] p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <Image
                src={icon}
                alt={title}
                width={60}
                height={60}
                className="mx-auto mb-5"
              />
              <h3 className="font-semibold text-lg sm:text-xl text-[#1A2B4B] mb-2">
                {title}
              </h3>
              <p className="text-sm text-[#637587] leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
