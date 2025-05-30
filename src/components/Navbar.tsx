"use client";

import Link from "next/link";
import { useState } from "react";
import data from "@/data/data.json";

const NAV_LINKS = [
  { label: "Home", href: "/", page: "home" },
  { label: "Submit Repository", href: "/submit", page: "submit" },
  { label: "Results", href: "/results", page: "results" }
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  let activePath = "/";
  if (typeof window !== "undefined") {
    activePath = window.location.pathname;
  }

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <img src="/logo.png" alt="WASM Build App Logo" className="h-10" />
            <span className="text-xl font-bold text-gray-900">{data.companyName}</span>
          </div>
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.page}
                href={link.href}
                className={`nav-link ${
                  (activePath === link.href || (link.href === "/" && activePath === ""))
                    ? "text-blue-600 font-medium border-b-2 border-blue-600 pb-1"
                    : "text-gray-600 hover:text-blue-600 transition-colors duration-200"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              aria-label="Open mobile menu"
              className="text-gray-600 hover:text-blue-600 focus:outline-none"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <span>Close</span> : <span>Menu</span>}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-fade-in">
          <div className="px-4 py-2 space-y-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.page}
                href={link.href}
                className={`mobile-nav-link block py-2 ${
                  (activePath === link.href || (link.href === "/" && activePath === ""))
                    ? "text-blue-600 font-medium"
                    : "text-gray-600"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
