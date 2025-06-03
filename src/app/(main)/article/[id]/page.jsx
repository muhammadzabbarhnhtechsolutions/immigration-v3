import Image from 'next/image';
import img1 from '../../../../assets/article1.png';
import img2 from '../../../../assets/article2.png';
const page = () => {
  return (
   <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
  <h2 className="text-3xl font-bold text-green-600 mb-10">Blog</h2>

  {/* Main Image */}
  <Image
    src={img1}
    alt="VR user"
    className="w-full h-auto rounded-xl shadow-md mb-8"
  />

  {/* Intro Paragraph */}
  <p className="text-gray-700 text-lg leading-relaxed mb-6">
    Graphics have been revolutionized by many powers driving the benefits for individuals, businesses,
    and organizations. Effective virtual simulations are being adopted in education, military, and healthcare industries
    to help bridge the gap between physical and digital environments.
  </p>

  {/* Main Content Paragraph */}
  <p className="text-gray-700 text-lg leading-relaxed mb-6">
    While Virtual Reality (VR) was once limited to gaming and entertainment, it is now influencing training simulations,
    product development, and even mental health therapies. As hardware gets cheaper and more powerful, access to this technology
    becomes more feasible for the masses.
  </p>

  {/* Quote Block */}
  <blockquote className="border-l-4 border-purple-500 pl-4 italic text-gray-600 text-base mb-6">
    "People worry that computers will get too smart and take over the world, but the real problem is that they’re too dumb
    and they’ve already taken over the world." – Pedro Domingos
  </blockquote>

  {/* Secondary Paragraph */}
  <p className="text-gray-700 text-lg leading-relaxed mb-6">
    As organizations adopt VR into onboarding processes or design strategies, software solutions must evolve with hardware capabilities.
    It's no longer just about the headset – it's about creating fully immersive and meaningful experiences.
  </p>

  {/* Blue Bordered Image */}
  <div className="w-full border-4 border-blue-500 rounded-xl shadow-lg overflow-hidden mb-6">
    <Image
      src={img2}
      alt="AR interface"
      className="w-full h-auto object-cover"
    />
  </div>

  {/* Final Paragraph */}
  <p className="text-gray-700 text-lg leading-relaxed">
    VR is quickly shifting from entertainment to enterprise-level use. Organizations are looking to immersive solutions for
    better productivity, hands-on learning, and meaningful digital engagement.
  </p>
</div>

  );
};
export default page;