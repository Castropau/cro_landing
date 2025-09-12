"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

// import { useTranslations } from "next-intl";
import { ThemeToggleButton } from "@/app/components/ThemeToggleButton";
import UserDropdowns from "./UserDropdown";
// import UserDropdown from "../../support/_components/Navbar/UserDropdown";
// import UserDropdown from "../../support/_components/Navbar/UserDropdown";

// import UserDropdown from "./UserDropdown";

// Flag Components
const FlagEn = () => (
  <svg
    width="20"
    height="14"
    viewBox="0 0 60 30"
    role="img"
    aria-label="English"
  >
    <clipPath id="t">
      <path d="M0 0v30h60V0z" />
    </clipPath>
    <clipPath id="s">
      <path d="M30 15h30v15zM0 0h30v15z" />
    </clipPath>
    <g clipPath="url(#t)">
      <path fill="#012169" d="M0 0h60v30H0z" />
      <path d="M0 0l60 30M60 0L0 30" stroke="#FFF" strokeWidth="6" />
      <path
        d="M0 0l60 30M60 0L0 30"
        clipPath="url(#s)"
        stroke="#C8102E"
        strokeWidth="4"
      />
      <path fill="#FFF" d="M25 0h10v30H25zM0 10h60v10H0z" />
      <path fill="#C8102E" d="M27 0h6v30h-6zM0 12h60v6H0z" />
    </g>
  </svg>
);

// const FlagFr = () => (
//   <svg
//     width="20"
//     height="14"
//     viewBox="0 0 3 2"
//     role="img"
//     aria-label="Français"
//   >
//     <rect width="1" height="2" fill="#0055A4" />
//     <rect x="1" width="1" height="2" fill="#FFF" />
//     <rect x="2" width="1" height="2" fill="#EF4135" />
//   </svg>
// );

// const FlagKr = () => (
//   <svg
//     width="20"
//     height="14"
//     viewBox="0 0 60 40"
//     role="img"
//     aria-label="한국어"
//   >
//     <rect width="60" height="40" fill="#fff" />
//     <circle cx="30" cy="20" r="10" fill="#fff" />
//     <circle cx="30" cy="20" r="10" fill="none" stroke="#000" strokeWidth="2" />
//     <circle cx="30" cy="20" r="7" fill="#cd2e3a" />
//     <circle cx="30" cy="20" r="5" fill="#0047a0" />
//   </svg>
// );
const FlagPh = () => (
  <svg
    width="20"
    height="14"
    viewBox="0 0 60 40"
    role="img"
    aria-label="Filipino"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Blue top band */}
    <rect width="60" height="20" fill="#0038A8" />
    {/* Red bottom band */}
    <rect y="20" width="60" height="20" fill="#CE1126" />

    {/* White equilateral triangle on left */}
    <polygon points="0,0 30,20 0,40" fill="#fff" />

    {/* Yellow sun */}
    <circle cx="13" cy="20" r="6" fill="#FCD116" />

    {/* Sun rays */}
    {[...Array(8)].map((_, i) => {
      const angle = (i * 360) / 8;
      const innerRadius = 6;
      const outerRadius = 11;
      const x1 = 13 + innerRadius * Math.cos((angle * Math.PI) / 180);
      const y1 = 20 + innerRadius * Math.sin((angle * Math.PI) / 180);
      const x2 = 13 + outerRadius * Math.cos((angle * Math.PI) / 180);
      const y2 = 20 + outerRadius * Math.sin((angle * Math.PI) / 180);
      return (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#FCD116"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      );
    })}

    {/* 3 stars - equilateral triangles approximated as circles */}
    <circle cx="6" cy="7" r="2.2" fill="#FCD116" />
    <circle cx="6" cy="20" r="2.2" fill="#FCD116" />
    <circle cx="6" cy="33" r="2.2" fill="#FCD116" />
  </svg>
);
// const FlagEs = () => (
//   <svg
//     width="20"
//     height="14"
//     viewBox="0 0 60 30"
//     xmlns="http://www.w3.org/2000/svg"
//     role="img"
//     aria-label="Spanish"
//   >
//     <rect width="60" height="30" fill="#AA151B" />
//     <rect y="10" width="60" height="10" fill="#F1BF00" />
//   </svg>
// );
// const FlagEs = () => (
//   <svg
//     width="20"
//     height="14"
//     viewBox="0 0 60 30"
//     xmlns="http://www.w3.org/2000/svg"
//     role="img"
//     aria-label="Spanish"
//   >
//     {/* Top red stripe */}
//     <rect width="60" height="10" fill="#AA151B" />
//     {/* Middle yellow stripe */}
//     <rect y="10" width="60" height="10" fill="#F1BF00" />
//     {/* Bottom red stripe */}
//     <rect y="20" width="60" height="10" fill="#AA151B" />
//   </svg>
// );
const FlagEs = () => (
  <svg
    width="20"
    height="14"
    viewBox="0 0 60 30"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Spanish"
  >
    {/* Top red stripe */}
    <rect width="60" height="10" fill="#AA151B" />
    {/* Middle yellow stripe */}
    <rect y="10" width="60" height="10" fill="#F1BF00" />
    {/* Bottom red stripe */}
    <rect y="20" width="60" height="10" fill="#AA151B" />

    {/* Simplified coat of arms */}
    <circle
      cx="15"
      cy="15"
      r="5"
      fill="#C8102E"
      stroke="#FFD100"
      strokeWidth="0.5"
    />
    <rect x="13" y="13" width="4" height="4" fill="#FFD100" />
  </svg>
);

const FlagZh = () => (
  <svg
    width="20"
    height="14"
    viewBox="0 0 30 20"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Chinese"
  >
    <rect width="30" height="20" fill="#DE2910" />
    <g fill="#FFDE00">
      <polygon points="5,2 5.6,3.8 7.5,3.8 6,5 6.6,6.8 5,5.8 3.4,6.8 4,5 2.5,3.8 4.4,3.8" />
      <polygon
        transform="translate(10,1.5) rotate(20)"
        points="0,0 0.4,1.2 -0.9,0.4 0.9,0.4 -0.4,1.2"
      />
      <polygon
        transform="translate(11.5,3.5) rotate(40)"
        points="0,0 0.4,1.2 -0.9,0.4 0.9,0.4 -0.4,1.2"
      />
      <polygon
        transform="translate(11,6) rotate(0)"
        points="0,0 0.4,1.2 -0.9,0.4 0.9,0.4 -0.4,1.2"
      />
      <polygon
        transform="translate(9,7.5) rotate(25)"
        points="0,0 0.4,1.2 -0.9,0.4 0.9,0.4 -0.4,1.2"
      />
    </g>
  </svg>
);
const FlagHi = () => (
  <svg
    width="20"
    height="14"
    viewBox="0 0 60 40"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Hindi"
  >
    {/* Saffron */}
    <rect width="60" height="13.33" y="0" fill="#FF9933" />
    {/* White */}
    <rect width="60" height="13.33" y="13.33" fill="#FFFFFF" />
    {/* Green */}
    <rect width="60" height="13.34" y="26.66" fill="#138808" />
    {/* Ashoka Chakra */}
    <circle
      cx="30"
      cy="20"
      r="4.5"
      stroke="#000080"
      strokeWidth="1"
      fill="none"
    />
    <g transform="translate(30,20) scale(0.5)" stroke="#000080" strokeWidth="1">
      {Array.from({ length: 24 }).map((_, i) => (
        <line
          key={i}
          x1="0"
          y1="0"
          x2="0"
          y2="-8"
          transform={`rotate(${i * 15})`}
        />
      ))}
    </g>
  </svg>
);

const FlagAr = () => (
  <svg
    width="20"
    height="14"
    viewBox="0 0 48 32"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Arabic"
  >
    {/* Green background */}
    <rect width="48" height="32" fill="#006C35" />

    {/* White Arabic inscription and sword simplified */}
    <path fill="#fff" d="M10 20h28l-3 2-5-2 5-3-5-3 5-2 3 2h-28z" />
    <rect
      x="15"
      y="18"
      width="18"
      height="2"
      fill="#fff"
      transform="rotate(-10 24 19)"
    />
  </svg>
);

const languages = [
  { code: "en", label: "English", Flag: FlagEn },
  // { code: "fr", label: "Français", Flag: FlagFr },
  // { code: "kr", label: "한국어", Flag: FlagKr },
  { code: "fil", label: "Filipino", Flag: FlagPh },
  { code: "es", label: "Spanish", Flag: FlagEs },
  { code: "zh", label: "Mandarin Chinese", Flag: FlagZh },
  { code: "hi", label: "Hindi", Flag: FlagHi },
  { code: "ar", label: "Arabic", Flag: FlagAr },
];

export default function Navbars() {
  const [locale, setLocale] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  //   const t = useTranslations("Navbar");

  useEffect(() => {
    const cookieLocale = document.cookie
      .split("; ")
      .find((row) => row.startsWith("MYNEXTAPP_LOCALE="))
      ?.split("=")[1];

    if (cookieLocale) {
      setLocale(cookieLocale);
    } else {
      const browserLocale = navigator.language.slice(0, 2);
      setLocale(browserLocale);
      document.cookie = `MYNEXTAPP_LOCALE=${browserLocale}; path=/`;
      router.refresh();
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [router]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const changeLocale = (newLocale: string) => {
    setLocale(newLocale);
    document.cookie = `MYNEXTAPP_LOCALE=${newLocale}; path=/`;
    router.refresh();
    setIsOpen(false);
    setMobileMenuOpen(false);
  };

  const currentLang = languages.find((l) => l.code === locale) || languages[0];

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md backdrop-saturate-150 text-black px-6 py-4 flex justify-between items-center border-white/10 dark:text-white">
      {/* Left: Logo */}
      <div className="text-2xl font-bold hover:text-cyan-400 transition-colors uppercase">
        <Link
          href="/"
          className="text-center font-bold text-2xl system-name mb-3"
        >
          smartark sys
        </Link>
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-6 ">
        {/* <Link
          href="/"
          className="hover:text-cyan-400 text-green-500 transition-colors"
        >
          {t("home")}
        </Link>

        <Link
          href="/component/Login"
          className="hover:text-cyan-400 text-green-500 transition-colors"
        >
          Login
        </Link> */}
        {/* <Link
          href="/contactus"
          className="hover:text-cyan-400 transition-colors text-green-500"
        >
          {t("contact")}
        </Link> */}
        {/* <Link
          href="/developer"
          className="hover:text-cyan-400 transition-colors text-green-500"
        >
          {t("dev")}
        </Link> */}

        <ThemeToggleButton />
        <UserDropdowns />
        {/* Language Dropdown */}
        {/* <div className="relative" ref={dropdownRef}>
          <span className="text-sm flex justify-center">Language</span>
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-label="Select language"
            className="flex items-center gap-2 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-md text-sm"
          >
            <currentLang.Flag />
            <span>{currentLang.label}</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 bg-white dark:bg-gray-900 border border-gray-700 rounded shadow-lg w-44 z-50">
              {languages.map(({ code, label, Flag }) => (
                <button
                  key={code}
                  onClick={() => changeLocale(code)}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <Flag />
                  {label}
                </button>
              ))}
            </div>
          )}
        </div> */}
      </div>

      {/* Mobile: Theme Toggle + Hamburger */}
      <div className="md:hidden flex items-center gap-4">
        <ThemeToggleButton />
        {/* <button
          className="flex items-center focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button> */}
        <UserDropdowns />
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute items-center text-center top-full left-0 w-full bg-white dark:bg-[#0e0e11] shadow-md border-t border-gray-300 dark:border-gray-700 md:hidden flex flex-col px-6 py-4 gap-4 z-40">
          {/* <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-cyan-300 transition"
          >
            {t("home")}
          </Link>
          <Link
            href="/login"
            className="hover:text-cyan-400 text-green-500 transition-colors"
          >
            Login
          </Link> */}
          {/* <Link
            href="#how-to-use"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-cyan-300 transition"
          >
            {t("contact")}
          </Link> */}
          {/* <Link
            href="/developer"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-cyan-300 transition"
          >
            {t("dev")}
          </Link> */}

          {/* <ThemeToggleButton /> */}

          {/* Mobile Language Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 px-3 py-1.5 border hover:bg-white/30 rounded-md text-sm w-full justify-center"
              aria-haspopup="listbox"
              aria-expanded={isOpen}
            >
              <currentLang.Flag />
              <span>{currentLang.label}</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isOpen && (
              <div className="absolute left-0 mt-2 bg-white dark:bg-gray-900 border border-gray-700 rounded shadow-lg w-full z-50">
                {languages.map(({ code, label, Flag }) => (
                  <button
                    key={code}
                    onClick={() => changeLocale(code)}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <Flag />
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
