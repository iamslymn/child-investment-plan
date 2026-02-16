"use client";

import { Shield } from "lucide-react";

/**
 * Footer component with brand info and disclaimer.
 */
export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366f1] to-[#06b6d4] flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold">Child Investment Plan</span>
            </div>
            <p className="text-sm text-gray-400">
              Uşağınızın gələcəyini bu gündən təmin edin. İnvestisiya və həyat
              sığortası ilə etibarlı plan.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Sürətli Keçidlər</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  Ana Səhifə
                </a>
              </li>
              <li>
                <a href="/plan" className="hover:text-white transition-colors">
                  Plan Yarat
                </a>
              </li>
              <li>
                <a
                  href="/dashboard"
                  className="hover:text-white transition-colors"
                >
                  İdarə Paneli
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Əlaqə</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>info@childplan.az</li>
              <li>+994 12 000 00 00</li>
              <li>Bakı, Azərbaycan</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-xs text-gray-500 text-center">
            © 2026 Child Investment Plan. Bütün hüquqlar qorunur. Bu demo
            məhsuludur və real maliyyə məsləhəti deyil. İnvestisiya qərarları
            şəxsi araşdırmaya əsaslanmalıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}
