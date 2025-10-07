"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ComingSoon() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-white text-[#88B29A]">
      <div className="text-center px-6">
        {/* Glow circle background effect */}
        <motion.div
          className="absolute w-[300px] h-[300px] bg-white/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
          }}
        />

        {/* Title */}
        <motion.h1
          className="text-5xl sm:text-7xl font-bold mb-6 relative z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
        Coming Soon
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg sm:text-2xl mb-8 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          We’re working hard to bring you something amazing.
        </motion.p>

        {/* Notify me button */}
        <Link href="/">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-[#1A2B4B] font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-gray-100 transition relative z-10"
          >
          Back to Home
        </motion.button>
            </Link>
      </div>
    </div>
  );
}
