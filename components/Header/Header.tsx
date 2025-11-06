"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // ✅ added
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, User, Group } from "lucide-react";
import Image from "next/image";

type NavLink = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const navLinks: NavLink[] = [
  { href: "/", label: "Home", icon: <Home size={18} /> },
  { href: "/about", label: "About us", icon: <User size={18} /> },
  {
    href: "/structure",
    label: "Organizational Structure",
    icon: <Group size={18} />,
  },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <div className="px-5 md:px-20 mx-auto flex h-20 items-center justify-between">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="associafca logo"
              height={55}
              width={55}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-2">
            {navLinks.map(({ href, label, icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`text-sm font-semibold mx-5 flex items-center gap-2 transition ${
                    isActive ? "text-sky-900" : "hover:text-sky-800"
                  }`}>
                  {icon}
                  {label}
                </Link>
              );
            })}
          </nav>

          <Link href="/register" className="hidden md:flex items-center">
            <Button className="ml-4 bg-sky-900 hover:bg-sky-800">
              Register
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-4">
            <button
              aria-label="Toggle menu"
              onClick={toggleMenu}
              className="p-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-900">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <nav className="md:hidden bg-white border-t border-gray-200 shadow-md">
            <div className="flex flex-col gap-4 p-6">
              {navLinks.map(({ href, label, icon }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`text-base flex items-center gap-2 font-medium transition ${
                      isActive
                        ? "text-sky-900 font-semibold"
                        : "hover:text-sky-900"
                    }`}>
                    {icon}
                    {label}
                  </Link>
                );
              })}

              <Link href="/register" onClick={() => setIsOpen(false)}>
                <Button className="w-full mt-2 bg-sky-900 hover:bg-sky-900">
                  Register
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </header>

      <div className="h-20" />
    </>
  );
}
