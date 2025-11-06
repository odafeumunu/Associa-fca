"use client";
import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { SiTiktok, SiFacebook, SiInstagram } from "react-icons/si"; 
import Link from "next/link";

export default function FloatingSocialMenu() {
  const [open, setOpen] = useState(false);

  const socialLinks = [
    {
      href: "https://facebook.com/profile.php?id=100087912856577",
      icon: <SiFacebook size={20} />,
      color: "hover:text-blue-500",
    },
    {
      href: "",
      icon: <SiTiktok size={20} />,
      color: "hover:text-black",
    },
    {
      href: "",
      icon: <SiInstagram size={20} />,
      color: "hover:text-pink-500",
    },
  ];

  return (
    <div className="fixed bottom-6 left-6 flex flex-col items-center space-y-3 z-50">
      {/* Social Icons (shown only when open) */}
      <div
        className={`flex flex-col items-center space-y-3 transition-all duration-500 ${
          open
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}>
        {socialLinks.map(({ href, icon, color }, i) => (
          <Link
            key={i}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 p-3 rounded-full shadow-md transition transform hover:scale-110 ${color}`}
            style={{
              transitionDelay: open ? `${i * 100}ms` : "0ms",
            }}>
            {icon}
          </Link>
        ))}
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-lime-400 hover:bg-lime-500 text-white p-4 rounded-full shadow-sm transition-transform transform hover:scale-110 focus:outline-none">
        {open ? <X size={20} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}
