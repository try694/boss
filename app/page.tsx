"use client";

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-20 gap-12 md:gap-0">
        {/* Left Content */}
        <div className="md:w-1/2 text-center md:text-left space-y-8">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Discover the Future of <br />
            <motion.span
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear",
              }}
              className="bg-[linear-gradient(90deg,#a855f7,#06b6d4,#3b82f6,#a855f7)] bg-[length:200%_200%] bg-clip-text text-transparent"
            >
              Arbitrage
            </motion.span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl">
            Seamlessly optimize your trades and get ahead with real-time tools built for modern finance.
          </p>
          <Link
            href="/auth/login"
            className="inline-block mt-4 px-8 py-3 bg-gray-950 text-white font-semibold text-base md:text-lg rounded-xl shadow-lg hover:shadow-2xl transition duration-300"
          >
            Get Started
          </Link>
        </div>

        {/* Right Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="md:w-1/2 flex justify-center"
        >
          <img src="/logo.png" alt="Hero Illustration" className="w-2/4 max-w-md" />
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-600 py-6 border-t border-gray-800 mt-auto">
        &copy; {new Date().getFullYear()} Amazing Arbitrage. All rights reserved.
      </footer>
    </div>
  );
}
