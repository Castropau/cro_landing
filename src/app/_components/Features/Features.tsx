// "use client";
// import React from "react";
// import { CheckCircleIcon } from "@heroicons/react/24/solid"; // Heroicons

// const features = [
//   "Dashboard with charts and calendar",
//   "Email-based secure tracking",
//   "Maya Payment integration",
//   "Employee management",
//   "Department roles & control",
//   "Access control & security",
//   "Transaction viewing and filtering",
//   "Announcement board with attachments",
// ];

// const Features = () => {
//   return (
//     <section className="py-24 bg-white dark:bg-[#0e0e11] text-black dark:text-white">
//       <div className="max-w-6xl mx-auto px-6 text-center">
//         <h2 className="text-4xl font-extrabold mb-6">Features Included</h2>
//         <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12 text-lg">
//           Everything you need to manage container tracking, payments, users, and
//           internal communication—securely and efficiently.
//         </p>

//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
//           {features.map((feature, i) => (
//             <div
//               key={i}
//               className="flex items-start gap-4 bg-gray-50 dark:bg-[#1b1b23] p-5 rounded-xl shadow hover:shadow-md transition"
//             >
//               <CheckCircleIcon className="w-6 h-6 text-[#00ffcc] flex-shrink-0 mt-1" />
//               <p className="text-base text-gray-800 dark:text-gray-200">
//                 {feature}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Features;
"use client";
import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

// const features = [
//   "Dashboard with charts and calendar",
//   "Email-based secure tracking",
//   "Maya Payment integration",
//   "Employee management",
//   "Department roles & control",
//   "Access control & security",
//   "Transaction viewing and filtering",
//   "Announcement board with attachments",
// ];

const Features = () => {
  const t = useTranslations("Features");
  const features = [
    t("dashboard"),
    t("secureTracking"),
    // t("mayaIntegration"),
    // t("employeeManagement"),
    // t("rolesControl"),
    // t("accessSecurity"),
    // t("transactions"),
    // t("announcements"),
  ];
  return (
    <section className="py-24 bg-gray-100 dark:bg-[#0e0e11] text-black dark:text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* <h2 className="text-4xl font-extrabold mb-6">{t("title")}</h2> */}
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12 text-lg">
          {t("description")}
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-4 bg-gray-50 dark:bg-[#1b1b23] p-5 rounded-xl shadow hover:shadow-md transition"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <CheckCircleIcon className="w-6 h-6 text-[#2e6ab8] flex-shrink-0 mt-1" />
              <p className="text-base text-gray-800 dark:text-gray-200">
                {feature}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
