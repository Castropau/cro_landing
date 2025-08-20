// "use client";
// import React from "react";
// import { FaGithub, FaLinkedin, FaFacebook, FaTwitter } from "react-icons/fa";
// import Image from "next/image";

// const Footer = () => {
//   return (
//     <footer className="bg-[#636474] dark:bg-[#191847] text-white pt-8 pb-6">
//       <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
//         {/* Left Side: Copyright */}
//         <p className="text-sm text-center md:text-left">
//           &copy; {new Date().getFullYear()} TS Lines. All rights reserved.
//         </p>

//         {/* Center: Developer Info */}
//         <div className="text-center text-sm text-gray-200 flex flex-col items-center">
//           <span className="mb-1">Developed by</span>
//           <a
//             href="https://yourportfolio.com"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="hover:opacity-90 transition"
//           >
//             <div className="flex items-center justify-center gap-3">
//               {/* Image 1 */}
//               <div className="relative w-30 h-30">
//                 <Image
//                   src="/images/logo2.png"
//                   alt="Logo 1"
//                   fill
//                   className="object-contain"
//                 />
//               </div>

//               {/* Divider */}
//               <span className="text-white text-lg font-bold">|</span>

//               {/* Image 2 */}
//               <div className="relative w-30 h-30">
//                 <Image
//                   src="/images/alcon.png"
//                   alt="Logo 2"
//                   fill
//                   className="object-contain"
//                 />
//               </div>
//             </div>
//           </a>
//         </div>

//         {/* Right Side: Socials */}
//         <div className="flex items-center space-x-4">
//           <a
//             href="https://github.com/your-repo"
//             target="_blank"
//             rel="noopener noreferrer"
//             aria-label="GitHub"
//             className="hover:text-cyan-400"
//           >
//             <FaGithub size={20} />
//           </a>
//           <a
//             href="https://linkedin.com/in/your-profile"
//             target="_blank"
//             rel="noopener noreferrer"
//             aria-label="LinkedIn"
//             className="hover:text-cyan-400"
//           >
//             <FaLinkedin size={20} />
//           </a>
//           <a
//             href="https://facebook.com/your-page"
//             target="_blank"
//             rel="noopener noreferrer"
//             aria-label="Facebook"
//             className="hover:text-cyan-400"
//           >
//             <FaFacebook size={20} />
//           </a>
//           <a
//             href="https://twitter.com/your-handle"
//             target="_blank"
//             rel="noopener noreferrer"
//             aria-label="Twitter"
//             className="hover:text-cyan-400"
//           >
//             <FaTwitter size={20} />
//           </a>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
// "use client";
// import React from "react";
// import { FaGithub, FaLinkedin, FaFacebook, FaTwitter } from "react-icons/fa";
// import Image from "next/image";

// const Footer = () => {
//   return (
//     <footer className="bg-[#636474] dark:bg-[#191847] text-white pt-8 pb-6">
//       <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
//         {/* Left: Copyright */}
//         <p className="text-sm text-center md:text-left">
//           &copy; {new Date().getFullYear()} TS Lines. All rights reserved.
//         </p>

//         {/* Center: Developer Info (Separate Groups) */}
//         <div className="flex flex-col items-center gap-4">
//           <span className="text-sm font-semibold">Developed by</span>

//           <div className="flex flex-col sm:flex-row gap-8 items-center text-sm text-gray-200">
//             {/* Group 1 */}
//             <div className="flex flex-col items-center">
//               <div className="relative w-30 h-30 mb-2">
//                 <Image
//                   src="/images/logo2.png"
//                   alt="Logo 1"
//                   fill
//                   className="object-contain"
//                 />
//               </div>
//               <ul className="space-y-1 text-center">
//                 <li>John Doe</li>
//                 <li>Anna Lee</li>
//               </ul>
//             </div>

//             {/* Divider */}
//             {/* <span className="hidden sm:block text-white text-xl font-bold">
//               |
//             </span> */}

//             {/* Group 2 */}
//             <div className="flex flex-col items-center">
//               <div className="relative w-30 h-30 mb-2">
//                 <Image
//                   src="/images/alcon.png"
//                   alt="Logo 2"
//                   fill
//                   className="object-contain"
//                 />
//               </div>
//               <ul className="space-y-1 text-center">
//                 <li>James Change</li>
//                 <li>Albert Kim</li>
//               </ul>
//             </div>
//           </div>
//         </div>

//         {/* Right: Socials */}
//         <div className="flex items-center space-x-4">
//           <a
//             href="https://github.com/your-repo"
//             target="_blank"
//             rel="noopener noreferrer"
//             aria-label="GitHub"
//             className="hover:text-cyan-400"
//           >
//             <FaGithub size={20} />
//           </a>
//           <a
//             href="https://linkedin.com/in/your-profile"
//             target="_blank"
//             rel="noopener noreferrer"
//             aria-label="LinkedIn"
//             className="hover:text-cyan-400"
//           >
//             <FaLinkedin size={20} />
//           </a>
//           <a
//             href="https://facebook.com/your-page"
//             target="_blank"
//             rel="noopener noreferrer"
//             aria-label="Facebook"
//             className="hover:text-cyan-400"
//           >
//             <FaFacebook size={20} />
//           </a>
//           <a
//             href="https://twitter.com/your-handle"
//             target="_blank"
//             rel="noopener noreferrer"
//             aria-label="Twitter"
//             className="hover:text-cyan-400"
//           >
//             <FaTwitter size={20} />
//           </a>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
"use client";
import React from "react";
// import { FaGithub, FaLinkedin, FaFacebook, FaTwitter } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

// const socialLinks = [
//   {
//     href: "https://github.com/your-repo",
//     label: "GitHub",
//     icon: <FaGithub size={20} />,
//   },
//   {
//     href: "https://linkedin.com/in/your-profile",
//     label: "LinkedIn",
//     icon: <FaLinkedin size={20} />,
//   },
//   {
//     href: "https://facebook.com/your-page",
//     label: "Facebook",
//     icon: <FaFacebook size={20} />,
//   },
//   {
//     href: "https://twitter.com/your-handle",
//     label: "Twitter",
//     icon: <FaTwitter size={20} />,
//   },
// ];

const Footer = () => {
  const t = useTranslations("footer");
  const footer = useTranslations("ContactInfo");

  const developerNames = [
    { name: t("person7") },
    { name: t("person1") },
    { name: t("person2") },
    { name: t("person3") },
    { name: t("person4") },
    { name: t("person5") },
    { name: t("person6") },
  ];
  return (
    <footer className="bg-[#2e6ab8] dark:bg-[#222233] text-white py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
        <div className="text-center sm:text-left flex items-center justify-center sm:justify-start">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} {t("copyright")}
          </p>
        </div>

        <div className="text-center">
          <p className="font-semibold mb-3">{t("developed")}</p>
          <div className="flex justify-center gap-6">
            {/* <div className="relative w-12 h-12">
              <Image
                src="/images/logo2.png"
                alt="Logo 1"
                fill
                className="object-contain"
              />
            </div> */}

            <Link
              href="https://alconph.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="relative w-12 h-12">
                <Image
                  src="/images/logo2.png"
                  alt="Logo 1"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </Link>
            <Link
              href="https://alconph.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="relative w-12 h-12">
                <Image
                  src="/images/alcon.png"
                  alt="Logo 2"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </Link>
          </div>
        </div>

        {/* <div className="text-center sm:text-right md:text-left">
          <p className="font-semibold mb-3">Developers</p>
          <ul className="space-y-1 text-sm">
            {developerNames.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        </div> */}
        <div className="text-center sm:text-right md:text-left">
          <p className="font-semibold mb-3">{t("ourteam")}</p>
          <ul className="space-y-1 text-sm">
            {developerNames.map((dev, index) => (
              <li key={index}>{dev.name}</li>
            ))}
          </ul>
        </div>

        <div className="text-center md:text-right sm:text-left">
          <p className="font-semibold mb-3">{t("address")}</p>
          <address className="not-italic text-sm leading-relaxed">
            {/* 9-A Apo Street */}
            {footer("p")}
            {/* <br />
            Brgy. Sta. Teresita
            <br />
            Quezon City, M.M. Philippines */}
          </address>

          {/* <div className="text-center md:text-left">
            <p className="font-semi mb-3">Call</p>
            <p>+63.2.8805.4812</p>
          </div> */}
        </div>

        <div className="text-center md:text-center">
          <p className="font-semi mb-3">{t("call")}</p>
          <p>+63.999.8888.328</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
