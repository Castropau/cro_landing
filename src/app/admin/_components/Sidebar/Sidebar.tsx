"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { TicketIcon, Bars3Icon } from "@heroicons/react/24/outline";

const navItems = [
  {
    label: "All tickets",
    href: "/admin/dashboard",
    icon: <TicketIcon className="h-5 w-5" />,
  },

  //   {
  //     label: "Done",
  //     href: "/admin/done",
  //     icon: <TicketIcon className="h-5 w-5" />,
  //   },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);
  // const useSWR
  // const { data, error, isLoading } = useSWR("/api/user", fetcher);

  return (
    <aside
      className={`${
        collapsed ? "w-[70px]" : "w-[250px]"
      } fixed transition-all duration-300 bg-gray-100 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 h-screen p-4 mt-2`}
    >
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={toggleSidebar}
          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
      </div>

      <nav className="space-y-2">
        {navItems.map(({ label, href, icon }) => {
          const isActive = pathname === href || pathname.startsWith(`${href}/`);

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
              }`}
            >
              {React.cloneElement(icon, {
                className: `h-5 w-5 ${
                  isActive
                    ? "text-white bg-blue-500"
                    : "text-gray-500 dark:text-gray-400"
                }`,
              })}
              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
