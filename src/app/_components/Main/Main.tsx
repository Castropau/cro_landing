"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Variants } from "framer-motion";

const Main = () => {
  const t = useTranslations("HomePage");

  const leftVariant: Variants = {
    hidden: { opacity: 0, rotateY: 90 },
    visible: {
      opacity: 1,
      rotateY: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const rightVariant: Variants = {
    hidden: { opacity: 0, rotateY: -90 },
    visible: {
      opacity: 1,
      rotateY: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="pt-24 sm:pt-28 md:pt-32 bg-gradient-to-b from-[#636474] to-[#202024] dark:from-[#0d0e1d] dark:to-[#090a14] text-white min-h-screen flex items-center justify-center px-6">
      <div className="max-w-7xl w-full mx-auto flex flex-col lg:flex-row md:items-center md:justify-between gap-12">
        {/* Left Text Content */}
        <motion.div
          className="order-1 lg:order-1 w-full lg:w-1/2 space-y-6 text-center lg:text-left"
          initial="hidden"
          animate="visible"
          variants={leftVariant}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
            {t("h1")}
            <br className="hidden md:block" />
            {t("br")}&nbsp;
            <span className="text-[#2e6ab8] dark:text-[#00ffcc] uppercase">
              {t("title")}
            </span>
          </h1>
          <p className="text-base sm:text-lg text-gray-200 dark:text-gray-300">
            {t("p")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.tslines.com.ph/"
              className="bg-white text-[#2c2f73] dark:bg-gray-100 dark:text-[#2c2f73] px-6 py-3 rounded-full font-semibold hover:bg-gray-100 dark:hover:bg-white/90 transition"
            >
              {t("button1")}
            </a>
          </div>
        </motion.div>

        {/* Right Illustration */}
        <motion.div
          className="order-2 lg:order-2 w-full lg:w-1/2 flex items-center justify-center"
          initial="hidden"
          animate="visible"
          variants={rightVariant}
        >
          <div className="relative w-full max-w-2xl rounded-xl bg-gray-900 shadow-2xl overflow-hidden border border-gray-700">
            {/* Top "laptop screen" bar */}
            <div className="h-6 bg-gray-800 flex items-center px-4 space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <div className="w-3 h-3 bg-green-500 rounded-full" />
            </div>

            {/* Screen content */}
            <div className="relative w-full h-[500px] bg-black">
              <Image
                src="/images/cro-home.png"
                alt="Smartarksys Desktop View"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 80vw, 100vw"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Main;
