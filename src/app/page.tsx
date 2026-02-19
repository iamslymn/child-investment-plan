"use client";

import Link from "next/link";
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
import { useLanguage } from "@/lib/LanguageContext";

export default function LandingPage() {
  const { t } = useLanguage();

  const features = [
    {
      icon: TrendingUp,
      title: t("feature_portfolio_title"),
      description: t("feature_portfolio_desc"),
      color: "#7F4CFF",
    },
    {
      icon: Shield,
      title: t("feature_insurance_title"),
      description: t("feature_insurance_desc"),
      color: "#3EC6FF",
    },
    {
      icon: Brain,
      title: t("feature_ai_title"),
      description: t("feature_ai_desc"),
      color: "#f59e0b",
    },
  ];

  const steps = [
    { number: "01", title: t("how_step1_title"), description: t("how_step1_desc") },
    { number: "02", title: t("how_step2_title"), description: t("how_step2_desc") },
    { number: "03", title: t("how_step3_title"), description: t("how_step3_desc") },
    { number: "04", title: t("how_step4_title"), description: t("how_step4_desc") },
  ];

  const stats = [
    { value: "15,000+", label: t("stat_active_plans") },
    { value: "45M+ ₼", label: t("stat_total_investment") },
    { value: "98%", label: t("stat_satisfaction") },
    { value: "12%", label: t("stat_avg_return") },
  ];

  const benefits = [
    t("benefit_1"),
    t("benefit_2"),
    t("benefit_3"),
    t("benefit_4"),
    t("benefit_5"),
    t("benefit_6"),
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* =================== HERO SECTION =================== */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#7F4CFF]/5 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#3EC6FF]/5 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7F4CFF]/10 border border-[#7F4CFF]/20 text-sm font-medium text-[#7F4CFF]">
                <Sparkles className="w-4 h-4" />
                {t("hero_badge")}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-tight">
              <span className="text-[#7F4CFF]">{t("hero_title_1")}</span>
              <br />
              <span className="text-[#0f172a]">{t("hero_title_2")}</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-[#64748b] max-w-2xl mx-auto leading-relaxed">
              {t("hero_subtitle")}
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/plan"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#7F4CFF] text-white font-semibold text-lg shadow-lg shadow-[#7F4CFF]/20 hover:bg-[#6A35E0] hover:-translate-y-0.5 transition-all"
              >
                {t("hero_cta")}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#features"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border-2 border-[#e2e8f0] text-[#64748b] font-semibold text-lg hover:border-[#7F4CFF]/30 hover:text-[#7F4CFF] transition-all"
              >
                {t("hero_cta_secondary")}
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-[#7F4CFF]">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[#64748b] mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =================== FEATURES SECTION =================== */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f172a]">
              {t("features_title_1")}{" "}
              <span className="text-[#7F4CFF]">{t("features_title_2")}</span>?
            </h2>
            <p className="mt-4 text-lg text-[#64748b] max-w-2xl mx-auto">
              {t("features_subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group relative p-8 rounded-3xl bg-white border border-[#e2e8f0] hover:border-[#7F4CFF]/20 hover:shadow-lg transition-all"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${feature.color}15` }}
                >
                  <feature.icon className="w-7 h-7" style={{ color: feature.color }} />
                </div>
                <h3 className="text-xl font-semibold text-[#0f172a] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[#64748b] leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================== HOW IT WORKS SECTION =================== */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f172a]">
              {t("how_title")}
            </h2>
            <p className="mt-4 text-lg text-[#64748b] max-w-2xl mx-auto">
              {t("how_subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative text-center">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-[#7F4CFF]/15" />
                )}
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#7F4CFF] text-white font-bold text-xl mb-6">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-[#0f172a] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[#64748b] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================== KEY BENEFITS =================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0f172a] mb-8">
                {t("benefits_title_1")}{" "}
                <span className="text-[#7F4CFF]">{t("benefits_title_2")}</span>
              </h2>
              <div className="space-y-5">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#10b981] flex-shrink-0 mt-0.5" />
                    <span className="text-[#334155] leading-relaxed">{benefit}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/plan"
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl bg-[#7F4CFF] text-white font-semibold hover:bg-[#6A35E0] transition-colors"
              >
                {t("benefits_cta")}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="relative">
              <div className="relative bg-[#7F4CFF]/5 rounded-3xl p-8 border border-[#7F4CFF]/10">
                <div className="bg-white rounded-2xl p-6 shadow-lg mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-[#64748b]">{t("card_projected_value")}</p>
                      <p className="text-3xl font-bold text-[#7F4CFF]">127,450 ₼</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-[#10b981]/10 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-[#10b981]" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#10b981]">
                    <BarChart3 className="w-4 h-4" />
                    {t("card_return")}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#7F4CFF]/10 flex items-center justify-center">
                      <Heart className="w-6 h-6 text-[#7F4CFF]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#64748b]">{t("card_insurance_label")}</p>
                      <p className="text-xl font-bold text-[#0f172a]">152,940 ₼</p>
                      <p className="text-xs text-[#10b981]">{t("card_insurance_active")}</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 bg-white rounded-xl px-4 py-2 shadow-lg border border-[#e2e8f0]">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-[#f59e0b]" />
                    <span className="text-sm font-medium">{t("card_rating")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================== CTA SECTION =================== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-[#7F4CFF] p-12 sm:p-16 text-center">
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                {t("cta_title")}
              </h2>
              <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
                {t("cta_subtitle")}
              </p>
              <Link
                href="/plan"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-[#7F4CFF] font-semibold text-lg hover:bg-white/90 transition-colors shadow-xl"
              >
                {t("hero_cta")}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
