// "use client";
// import React, { useState } from "react";

// const faqData = [
//   {
//     question: "How do I track my container?",
//     answer:
//       "Enter your container number, entity code, and email to start tracking your shipment in real-time.",
//   },
//   {
//     question: "How do I make a payment via Maya?",
//     answer:
//       "If payment is required, you will be redirected to Maya after accessing your container form to complete the transaction securely.",
//   },
//   {
//     question: "Can I manage multiple employees in the system?",
//     answer:
//       "Yes, our platform allows you to add and manage employees with different roles and access controls.",
//   },
//   {
//     question: "Is my data secure?",
//     answer:
//       "Absolutely. We use email-based authentication and strict access controls to ensure your data privacy and security.",
//   },
// ];

// const FAQ = () => {
//   const [openIndex, setOpenIndex] = useState<number | null>(null);

//   const toggle = (index: number) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
//     // <section className="max-w-4xl mx-auto p-6 bg-white dark:bg-[#0e0e11] text-black dark:text-white rounded-lg shadow-lg mt-10">
//     <section className="py-24 bg-white dark:bg-[#0e0e11] text-black dark:text-white">
//       <h2 className="text-3xl font-bold mb-8 text-center">
//         Frequently Asked Questions
//       </h2>
//       <div className="flex justify-center">
//         <div className="space-y-4 w-full max-w-3xl">
//           {faqData.map(({ question, answer }, i) => (
//             <div
//               key={i}
//               className="border border-gray-300 dark:border-gray-700 rounded-md"
//             >
//               <button
//                 onClick={() => toggle(i)}
//                 className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-[#00ffcc]"
//               >
//                 <span className="font-semibold text-lg">{question}</span>
//                 <span className="ml-4 text-[#00ffcc]">
//                   {openIndex === i ? (
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-6 w-6 transform rotate-180 transition-transform duration-300"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                       strokeWidth={2}
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M19 9l-7 7-7-7"
//                       />
//                     </svg>
//                   ) : (
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-6 w-6 transition-transform duration-300"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                       strokeWidth={2}
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M19 9l-7 7-7-7"
//                       />
//                     </svg>
//                   )}
//                 </span>
//               </button>
//               {openIndex === i && (
//                 <div className="px-6 pb-6 text-gray-700 dark:text-gray-300">
//                   {answer}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FAQ;
"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

// const faqData = [
//   {
//     question: "How do I track my container?",
//     answer:
//       "Enter your container number, entity code, and email to start tracking your shipment in real-time.",
//   },
//   {
//     question: "How do I make a payment via Maya?",
//     answer:
//       "If payment is required, you will be redirected to Maya after accessing your container form to complete the transaction securely.",
//   },
//   {
//     question: "Can I manage multiple employees in the system?",
//     answer:
//       "Yes, our platform allows you to add and manage employees with different roles and access controls.",
//   },
//   {
//     question: "Is my data secure?",
//     answer:
//       "Absolutely. We use email-based authentication and strict access controls to ensure your data privacy and security.",
//   },
// ];

const FAQ = () => {
  const t = useTranslations("FAQ");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const faqData = [
    {
      question: t("q1"),
      answer: t("a1"),
    },
    // {
    //   question: t("q2"),
    //   answer: t("a2"),
    // },
    // {
    //   question: t("q3"),
    //   answer: t("a3"),
    // },
    // {
    //   question: t("q4"),
    //   answer: t("a4"),
    // },
  ];
  return (
    <section className="py-24 bg-gray-50 dark:bg-[#0e0e11] text-black dark:text-white">
      <h2 className="text-3xl font-bold mb-8 text-center">{t("title")}</h2>
      <div className="flex justify-center">
        <div className="space-y-4 w-full max-w-3xl">
          {faqData.map(({ question, answer }, i) => (
            <div
              key={i}
              className="border border-gray-700 dark:border-gray-700 rounded-md"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-[#00ffcc]"
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
                id={`faq-question-${i}`}
              >
                <span className="font-semibold text-lg">{question}</span>
                <span className="ml-4 text-[#00ffcc]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 transition-transform duration-300 ${
                      openIndex === i ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    id={`faq-answer-${i}`}
                    role="region"
                    aria-labelledby={`faq-question-${i}`}
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { height: "auto", opacity: 1, marginTop: 8 },
                      collapsed: { height: 0, opacity: 0, marginTop: 0 },
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden px-6 text-gray-700 dark:text-gray-300"
                  >
                    <p>{answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
