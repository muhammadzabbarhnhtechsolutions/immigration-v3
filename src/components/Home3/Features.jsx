'use client';
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

import icon1 from "../../assets/1.gif";
import icon2 from "../../assets/2.gif";
import icon3 from "../../assets/3.gif";
import icon4 from "../../assets/4.gif";
import icon5 from "../../assets/5.gif";
import icon9 from "../../assets/6.gif";
import i7 from "../../assets/i7.png";
import i8 from "../../assets/i8.png";
import i9 from "../../assets/i9.png";

export default function InfoSection() {
  const keyFeatures = [
    { icon: icon2, title: "Easy to Step-by-step courses" },
    { icon: icon4, title: "Podcast & video learning" },
    { icon: icon9, title: "Downloadable templates" },
    { icon: icon5, title: "Instant feedback quizzes" },
    { icon: icon3, title: "Verified by immigration lawyers" },
    { icon: icon1, title: "Active support & community" },
  ];

  const audience = [
    { icon: i7, title: "Lawyers", text: "Stay updated with legal training", route: "/lawyers" },
    { icon: i8, title: "Students", text: "Learn how to apply the right way", route: "/students" },
    { icon: i9, title: "General Public", text: "Understand your immigration options", route: "/general-public" },
  ];

  // Animation variants
  const cardVariant = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: i * 0.15, duration: 0.6, type: "spring", stiffness: 120 },
    }),
    hover: { scale: 1.0, y: -5, transition: { type: "spring", stiffness: 300 } },
  };

  const iconVariant = {
    hover: { scale: 1.2, rotate: [0, 10, -10, 0], transition: { duration: 0.6 } },
  };

  return (
    <section className="bg-white text-gray-900 px-4 sm:px-8 lg:px-12 py-16 sm:py-16">
      {/* --- WHO IS IT FOR --- */}
      <div className="max-w-6xl mx-12 mt-20 mb-20 sm:mt-14 px-2 sm:px-0">
        <h2 className="text-2xl font-marko sm:text-5xl md:text-center mb-10 sm:mb-4">
          Who Is Immigration Navigator For?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:py-12">
          {audience.map(({ icon, title, text, route }, idx) => (
            <Link key={idx} href={route}>
              <motion.div
                className="bg-[#3F855D40] transform transition-all duration-300 cursor-pointer hover:-translate-y-3 hover:shadow-xl bg-opacity-20 border border-[#D9E3F2] h-[192px] p-6 sm:p-8 rounded-2xl shadow-sm"
                variants={cardVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx}
              >
                <motion.div
                  className="flex items-center gap-4 mb-4"
                  variants={iconVariant}
                >
                  <Image
                    src={icon}
                    alt={title}
                    width={64}
                    height={64}
                    className="rounded-lg"
                  />
                  <h3
                    style={{ fontFamily: "Marcellus, serif" }}
                    className="font-semibold text-2xl sm:text-2xl ml-2 text-[#1A2B4B]"
                  >
                    {title}
                  </h3>
                </motion.div>
                <p className="text-sm text-[#637587] leading-relaxed">{text}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* --- KEY FEATURES --- */}
      <div className="max-w-7xl mt-28 md:mt-14">
        <h2 className="text-3xl font-marko text-center sm:text-5xl text-gray-800 mb-14">
          Why Choose Us?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {keyFeatures.map(({ icon, title }, idx) => (
            <motion.div
              key={idx}
              className="flex items-center justify-center flex-col cursor-pointer border bg-[#3F855D40] border-gray-200 px-1 py-4 rounded-2xl shadow-sm"
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={idx}
              whileHover="hover"
            >
              <motion.div
                className="mb-4 h-[100px] w-[100px] flex items-center justify-center"
                variants={iconVariant}
              >
                <Image
                  src={icon}
                  alt={title}
                  width={80}
                  height={80}
                  className="rounded-md"
                />
              </motion.div>
              <h3 className="font-semibold text-center text-[19px] text-gray-800 mb-2">
                {title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
