"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";

type NavLink = {
  href: string;
  label: string;
};

const navLinks: NavLink[] = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About us" },
  { href: "/#categories", label: "Categories" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#fees", label: "Fees" },
  { href: "/#partnership", label: "Partnerships" },
  { href: "/#structure", label: "Structure" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const toggleMenu = () => setIsOpen(!isOpen);

  // IntersectionObserver for active section
  useEffect(() => {
    if (typeof window === "undefined") return;

    const sections = navLinks.map(({ href }) =>
      document.getElementById(href.split("#")[1])
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length) {
          // Pick the section closest to the top
          visibleEntries.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-80px 0px -80% 0px", // account for fixed header
        threshold: 0,
      }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    // Fallback: detect active section on scroll in case observer misses
    const handleScroll = () => {
      const scrollPos = window.scrollY + 85; // slightly below header
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const section = document.getElementById(navLinks[i].href.split("#")[1]);
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(navLinks[i].href.split("#")[1]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Smooth scroll for hash navigation
  useEffect(() => {
    if (typeof window === "undefined") return;

    const scrollToHash = () => {
      const { hash } = window.location;
      if (hash) {
        const el = document.querySelector(hash);
        if (el) {
          setTimeout(() => {
            const yOffset = -80;
            const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
          }, 200);
        }
      }
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    href: string
  ) => {
    if (window.location.pathname === "/") {
      e.preventDefault();
      const id = href.split("#")[1];
      const element = document.getElementById(id);
      if (element) {
        const yOffset = -80;
        const y =
          element.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <div className="px-5 mx-auto flex h-20 items-center justify-between">
          <Image src="/logo.png" alt="associafca logo" height={45} width={45} priority />

          <nav className="hidden lg:flex items-center gap-2">
            {navLinks.map(({ href, label }) => {
              const id = href.split("#")[1];
              const isActive = activeSection === id;
              return (
                <Link
                  key={href}
                  href={href}
                  scroll={false}
                  onClick={(e) => handleNavClick(e, href)}
                  className={`text-xs font-semibold rounded-2xl py-2 px-5 transition ${
                    isActive
                      ? "bg-blue-100 text-blue-500"
                      : "hover:bg-blue-100 hover:text-blue-500"
                  }`}>
                  {label}
                </Link>
              );
            })}
          </nav>

          <Link href="/register" className="hidden md:flex items-center">
            <Button className="ml-4 bg-blue-600 hover:bg-blue-700">
              Join Now
            </Button>
          </Link>

          <div className="flex md:hidden items-center gap-4">
            <button
              aria-label="Toggle menu"
              onClick={toggleMenu}
              className="p-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <nav className="md:hidden bg-white border-t border-gray-200 shadow-md">
            <div className="flex flex-col gap-4 p-6">
              {navLinks.map(({ href, label }) => {
                const id = href.split("#")[1];
                const isActive = activeSection === id;
                return (
                  <Link
                    key={href}
                    href={href}
                    scroll={false}
                    onClick={(e) => {
                      handleNavClick(e, href);
                      setIsOpen(false);
                    }}
                    className={`text-base font-medium transition ${
                      isActive
                        ? "text-blue-600 font-semibold"
                        : "hover:text-blue-500"
                    }`}>
                    {label}
                  </Link>
                );
              })}

              <Link href="/register" onClick={() => setIsOpen(false)}>
                <Button className="w-full mt-2 bg-blue-600 hover:bg-blue-700">
                  Join Now
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
