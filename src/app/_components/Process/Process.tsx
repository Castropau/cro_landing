// "use client";
// import React from "react";
// import Image from "next/image";

// const steps = [
//   {
//     title: "Step 1: Enter Container Info",
//     description:
//       "Input your container number, entity code, and email address to begin tracking.",
//     image: "/images/container_tracker.png",
//   },
//   {
//     title: "Step 2: Check Email",
//     description:
//       "A link to access your container form will be sent via email. If payment is required, you'll be redirected to Maya.",
//     image: "/images/container_tracker.png",
//   },
//   {
//     title: "Step 3: Maya Payment",
//     description:
//       "If unpaid, scan and pay using Maya. Once complete, you'll gain access to your container information.",
//     image: "/images/container_tracker.png",
//   },
//   {
//     title: "Step 4: View Container Form",
//     description:
//       "After payment verification, the container form is displayed with size, type, and commodity info.",
//     image: "/images/container_tracker.png",
//   },
// ];

// const Process = () => {
//   return (
//     <section className="py-24 bg-white dark:bg-[#0e0e11] text-black dark:text-white">
//       <div className="max-w-6xl mx-auto px-4">
//         <h2 className="text-4xl font-extrabold text-center mb-16">
//           How the Process Works
//         </h2>
//         <div className="space-y-20">
//           {steps.map((step, i) => (
//             <div
//               key={i}
//               className={`flex flex-col md:flex-row ${
//                 i % 2 !== 0 ? "md:flex-row-reverse" : ""
//               } items-center gap-10`}
//             >
//               {/* Phone Mockup with Label */}
//               <div className="flex flex-col items-center space-y-4">
//                 {/* <h3 className="text-lg font-semibold text-center">
//                   Employee View
//                 </h3> */}
//                 <div className="mockup-phone border-gray-dark h-[540px] w-[280px] flex-shrink-0">
//                   <div className="mockup-phone-camera absolute rounded-full h-[20] w-[100]" />
//                   <div className="mockup-phone-display relative w-full h-full">
//                     <Image
//                       src={step.image}
//                       alt={step.title}
//                       fill
//                       className="object-cover"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Text Content */}
//               <div className="md:w-2/3 space-y-3">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 rounded-full bg-[#00ffcc] text-black font-bold flex items-center justify-center text-lg shadow">
//                     {i + 1}
//                   </div>
//                   <h3 className="text-2xl font-semibold">{step.title}</h3>
//                 </div>
//                 <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
//                   {step.description}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Process;
"use client";
import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useTranslations } from "next-intl";

const Process = () => {
  const t = useTranslations("Process");

  const steps = [
    {
      title: t("step1Title"),
      description: t("step1Desc"),
      image: "/images/cro-home.png",
    },
    {
      title: t("step2Title"),
      description: t("step2Desc"),
      image: "/images/cro-email1.png",
    },
    // {
    //   title: t("step3Title"),
    //   description: t("step3Desc"),
    //   image: "/images/paid_m.jpg",
    // },
    {
      title: t("step4Title"),
      description: t("step4Desc"),
      image: "/images/cro-form-2.png",
    },
  ];
  return (
    <section className="py-24 bg-gray-200 dark:bg-[#0e0e11] text-black dark:text-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-16">{t("h2")}</h2>
        <div className="space-y-20">
          {steps.map((step, i) => {
            const isOdd = i % 2 !== 0;
            const variants: Variants = {
              hidden: { opacity: 0, scale: 0.95 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: {
                  duration: 0.6,
                  delay: i * 0.2,
                  type: "spring",
                  stiffness: 80,
                  damping: 15,
                },
              },
            };

            return (
              <motion.div
                key={i}
                className={`flex flex-col md:flex-row ${
                  isOdd ? "md:flex-row-reverse" : ""
                } items-center gap-10`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={variants}
              >
                {/* Laptop Mockup */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative w-[320px] md:w-[500px] max-w-full rounded-xl bg-gray-900 shadow-2xl overflow-hidden border border-gray-700">
                    {/* Top bar with window controls */}
                    <div className="h-6 bg-gray-800 flex items-center px-4 space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                      <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                    </div>

                    {/* Image inside screen */}
                    <div className="relative w-full h-[280px] md:h-[350px] bg-black">
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                      />
                    </div>
                  </div>
                </div>

                {/* Text Content */}
                <div className="md:w-2/3 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#2e6ab8] text-white font-bold flex items-center justify-center text-lg shadow">
                      {i + 1}
                    </div>
                    <h3 className="text-2xl font-semibold">{step.title}</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;
