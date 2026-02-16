"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Shield,
  TrendingUp,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  BarChart3,
  Heart,
  Brain,
  ChevronRight,
  Star,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/**
 * Landing page for Child Investment Plan.
 * Features: Hero section, features grid, how it works, CTA.
 * All text in Azerbaijani.
 */
export default function LandingPage() {
  /** Animation variants for stagger effect */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  /** Feature cards data */
  const features = [
    {
      icon: TrendingUp,
      title: "İnvestisiya Portfeli",
      description:
        "ABŞ ETF, Qlobal İndeks və Texnologiya fondlarına aylıq investisiya ilə uşağınızın gələcəyini qurun.",
      color: "from-[#6366f1] to-[#818cf8]",
    },
    {
      icon: Shield,
      title: "Həyat Sığortası",
      description:
        "Valideyn vəfat edərsə plan davam edəcək. Uşağınızın gələcəyi hər şəraitdə təmin olunur.",
      color: "from-[#06b6d4] to-[#22d3ee]",
    },
    {
      icon: Brain,
      title: "AI Dəstəyi",
      description:
        "Süni intellekt ilə təhsil xərcləri proqnozu, investisiya məsləhəti və maliyyə planlaşdırması.",
      color: "from-[#f59e0b] to-[#fbbf24]",
    },
  ];

  /** How it works steps */
  const steps = [
    {
      number: "01",
      title: "Planınızı yaradın",
      description:
        "Uşağınızın yaşını, plan müddətini və aylıq investisiya məbləğini seçin.",
    },
    {
      number: "02",
      title: "Risk profilinizi seçin",
      description:
        "Aşağı, orta və ya yüksək risk profilindən birini seçərək portfelinizi formalaşdırın.",
    },
    {
      number: "03",
      title: "AI ilə optimallaşdırın",
      description:
        "AI Məsləhətçi sizə ən uyğun strategiyanı tövsiyə edəcək.",
    },
    {
      number: "04",
      title: "Gələcəyi izləyin",
      description:
        "İdarə panelindən investisiyanızın böyüməsini real vaxt rejimində izləyin.",
    },
  ];

  /** Stats for social proof */
  const stats = [
    { value: "15,000+", label: "Aktiv Plan" },
    { value: "$45M+", label: "Ümumi İnvestisiya" },
    { value: "98%", label: "Müştəri Məmnuniyyəti" },
    { value: "12%", label: "Orta İllik Gəlir" },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* =================== HERO SECTION =================== */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#6366f1]/5 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#06b6d4]/5 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#6366f1]/3 to-[#06b6d4]/3 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6366f1]/10 border border-[#6366f1]/20 text-sm font-medium text-[#6366f1]">
                <Sparkles className="w-4 h-4" />
                AI-dəstəkli investisiya platforması
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-tight"
            >
              <span className="gradient-text">
                Uşağının gələcəyini
              </span>
              <br />
              <span className="text-[#0f172a]">bu gündən qur.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="mt-6 text-lg sm:text-xl text-[#64748b] max-w-2xl mx-auto leading-relaxed"
            >
              İnvestisiya + Həyat Sığortası + AI dəstəyi ilə uşağınızın 18
              yaşına qədər maliyyə gələcəyini təmin edin. Hər ay kiçik
              məbləğlər, böyük nəticələr.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/plan"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#6366f1] to-[#4f46e5] text-white font-semibold text-lg shadow-xl shadow-[#6366f1]/25 hover:shadow-2xl hover:shadow-[#6366f1]/30 hover:-translate-y-0.5 transition-all pulse-glow"
              >
                Plan yarat
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#features"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border-2 border-[#e2e8f0] text-[#64748b] font-semibold text-lg hover:border-[#6366f1]/30 hover:text-[#6366f1] transition-all"
              >
                Daha ətraflı
                <ChevronRight className="w-5 h-5" />
              </Link>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              variants={itemVariants}
              className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold gradient-text">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[#64748b] mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* =================== FEATURES SECTION =================== */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl font-bold text-[#0f172a]"
            >
              Niyə <span className="gradient-text">Child Plan</span>?
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="mt-4 text-lg text-[#64748b] max-w-2xl mx-auto"
            >
              Bir platformada investisiya, sığorta və süni intellekt dəstəyi
              ilə uşağınız üçün ən yaxşı planı qurun.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="group relative p-8 rounded-3xl bg-white border border-[#e2e8f0] hover:border-[#6366f1]/20 hover:shadow-xl hover:shadow-[#6366f1]/5 transition-all"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg`}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#0f172a] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[#64748b] leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* =================== HOW IT WORKS SECTION =================== */}
      <section className="py-20 bg-gradient-to-b from-[#f8fafc] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl font-bold text-[#0f172a]"
            >
              Necə işləyir?
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="mt-4 text-lg text-[#64748b] max-w-2xl mx-auto"
            >
              4 sadə addımda uşağınızın maliyyə gələcəyini planlaşdırın
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                variants={itemVariants}
                className="relative text-center"
              >
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-[#6366f1]/30 to-[#06b6d4]/30" />
                )}
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6366f1] to-[#06b6d4] text-white font-bold text-xl mb-6 shadow-lg">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-[#0f172a] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[#64748b] leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* =================== KEY BENEFITS =================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            {/* Left: Benefits list */}
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0f172a] mb-8">
                Uşağınız üçün{" "}
                <span className="gradient-text">ən yaxşı investisiya</span>
              </h2>
              <div className="space-y-5">
                {[
                  "Gündəlik $1-dən başlayan aylıq investisiya planları",
                  "ABŞ və Avropa bazarlarına birbaşa çıxış",
                  "Həyat sığortası ilə tam qorunma",
                  "AI dəstəkli maliyyə məsləhətçisi",
                  "Təhsil xərcləri proqnozu və planlaşdırma",
                  "18 yaş sonrası davamlılıq planları",
                ].map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#10b981] flex-shrink-0 mt-0.5" />
                    <span className="text-[#334155] leading-relaxed">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
              <Link
                href="/plan"
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl bg-[#6366f1] text-white font-semibold hover:bg-[#4f46e5] transition-colors"
              >
                İndi başla
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Right: Visual card */}
            <motion.div variants={itemVariants} className="relative">
              <div className="relative bg-gradient-to-br from-[#6366f1]/5 to-[#06b6d4]/5 rounded-3xl p-8 border border-[#6366f1]/10">
                {/* Mock investment card */}
                <div className="bg-white rounded-2xl p-6 shadow-lg mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-[#64748b]">
                        Proqnozlaşdırılan dəyər
                      </p>
                      <p className="text-3xl font-bold gradient-text">
                        $127,450
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-[#10b981]/10 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-[#10b981]" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#10b981]">
                    <BarChart3 className="w-4 h-4" />
                    +234% gəlir (18 il)
                  </div>
                </div>

                {/* Mock insurance card */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#6366f1]/10 flex items-center justify-center">
                      <Heart className="w-6 h-6 text-[#6366f1]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#64748b]">
                        Həyat Sığortası
                      </p>
                      <p className="text-xl font-bold text-[#0f172a]">
                        $152,940
                      </p>
                      <p className="text-xs text-[#10b981]">
                        ✓ Tam qorunma aktiv
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 bg-white rounded-xl px-4 py-2 shadow-lg border border-[#e2e8f0]">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-[#f59e0b]" />
                    <span className="text-sm font-medium">4.9/5 Reytinq</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* =================== CTA SECTION =================== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#6366f1] to-[#06b6d4] p-12 sm:p-16 text-center"
          >
            {/* Background patterns */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-white blur-3xl" />
              <div className="absolute bottom-0 right-0 w-60 h-60 rounded-full bg-white blur-3xl" />
            </div>

            <motion.div variants={itemVariants} className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Gələcəyə investisiya bu gün başlayır
              </h2>
              <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
                Hər keçən gün uşağınızın gələcəyi üçün bir fürsətdir. İndi
                plan yaradın və sabit maliyyə gələcəyini təmin edin.
              </p>
              <Link
                href="/plan"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-[#6366f1] font-semibold text-lg hover:bg-white/90 transition-colors shadow-xl"
              >
                Plan yarat
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
