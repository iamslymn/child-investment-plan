"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, BarChart3, Sparkles } from "lucide-react";

/**
 * Top navigation bar component.
 * Shows brand name and navigation links with active state styling.
 */
export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Ana Səhifə" },
    { href: "/plan", label: "Plan Yarat" },
    { href: "/dashboard", label: "İdarə Paneli" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#06b6d4] flex items-center justify-center shadow-lg">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold gradient-text hidden sm:block">
              Child Plan
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1 sm:gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  pathname === link.href
                    ? "bg-[#6366f1]/10 text-[#6366f1]"
                    : "text-[#64748b] hover:text-[#0f172a] hover:bg-gray-100"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* AI Badge */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#6366f1]/10 to-[#06b6d4]/10 border border-[#6366f1]/20">
            <Sparkles className="w-4 h-4 text-[#6366f1]" />
            <span className="text-xs font-medium text-[#6366f1]">
              AI Dəstəkli
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
