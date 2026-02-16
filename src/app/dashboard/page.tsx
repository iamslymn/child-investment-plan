"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  TrendingUp,
  Shield,
  BarChart3,
  Wallet,
  Target,
  Clock,
  ArrowUpRight,
  PieChart as PieIcon,
  Activity,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIAdvisor from "@/components/AIAdvisor";
import { PlanData, RISK_LABELS, RISK_COLORS } from "@/lib/types";
import {
  calculateProjection,
  calculateFinalValue,
  calculateTotalInvested,
  calculateInsuranceCoverage,
  getPortfolioAllocation,
  predictEducationCosts,
  generateAIInsights,
} from "@/lib/calculations";

/**
 * Dashboard page displaying plan summary, charts, and AI advisor.
 * Reads plan data from localStorage. No framer-motion — simple renders only.
 */
export default function DashboardPage() {
  const router = useRouter();
  const [plan, setPlan] = useState<PlanData | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("childPlan");
    if (saved) {
      setPlan(JSON.parse(saved));
    }
  }, []);

  /** If no plan exists, show prompt to create one */
  if (!plan) {
    return (
      <div className="min-h-screen bg-[#f8fafc]">
        <Navbar />
        <div className="pt-32 text-center px-4">
          <div className="max-w-md mx-auto bg-white rounded-3xl p-10 shadow-sm border border-[#e2e8f0]">
            <div className="w-16 h-16 rounded-2xl bg-[#7F4CFF]/10 flex items-center justify-center mx-auto mb-6">
              <Target className="w-8 h-8 text-[#7F4CFF]" />
            </div>
            <h2 className="text-2xl font-bold text-[#0f172a] mb-3">
              Hələ plan yaradılmayıb
            </h2>
            <p className="text-[#64748b] mb-6">
              İdarə panelinə baxmaq üçün əvvəlcə investisiya planınızı yaradın.
            </p>
            <button
              onClick={() => router.push("/plan")}
              className="px-6 py-3 bg-[#7F4CFF] text-white rounded-xl font-medium hover:bg-[#6A35E0] transition-colors"
            >
              Plan Yarat
            </button>
          </div>
        </div>
      </div>
    );
  }

  /** Derived calculations */
  const projection = calculateProjection(plan);
  const finalValue = calculateFinalValue(plan);
  const totalInvested = calculateTotalInvested(plan);
  const insuranceCoverage = calculateInsuranceCoverage(plan);
  const portfolioAllocation = getPortfolioAllocation(plan);
  const educationCosts = predictEducationCosts(plan.planDuration);
  const aiInsights = generateAIInsights(plan);
  const profit = finalValue - totalInvested;
  const profitPercentage = ((profit / totalInvested) * 100).toFixed(1);

  /** Simulated current progress (mock: 15% into the plan for demo) */
  const progressPercent = 15;
  const currentInvested = Math.round(totalInvested * (progressPercent / 100));
  const currentValue = Math.round(
    currentInvested * (1 + (finalValue / totalInvested - 1) * 0.3)
  );

  /** Education cost bar chart data */
  const educationChartData = educationCosts.map((c) => ({
    name: c.region,
    "Cari Xərc": c.currentCost * 4,
    "Proqnoz Xərc": c.projectedCost,
  }));

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />

      <div className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* =================== PAGE HEADER =================== */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0f172a]">İdarə Paneli</h1>
          <p className="text-[#64748b] mt-1">
            Uşağınızın investisiya planının ümumi görünüşü
          </p>
        </div>

        {/* =================== STATS CARDS =================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Current Value */}
          <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#3EC6FF]/10 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-[#3EC6FF]" />
              </div>
              <span className="flex items-center gap-1 text-xs font-medium text-[#10b981] bg-[#10b981]/10 px-2 py-1 rounded-full">
                <ArrowUpRight className="w-3 h-3" />
                +{((currentValue / currentInvested - 1) * 100).toFixed(1)}%
              </span>
            </div>
            <p className="text-sm text-[#64748b]">Cari Portfel Dəyəri</p>
            <p className="text-2xl font-bold text-[#0f172a] mt-1">
              {currentValue.toLocaleString()} ₼
            </p>
          </div>

          {/* Projected Value */}
          <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#7F4CFF]/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#7F4CFF]" />
              </div>
              <span className="flex items-center gap-1 text-xs font-medium text-[#7F4CFF] bg-[#7F4CFF]/10 px-2 py-1 rounded-full">
                <Target className="w-3 h-3" />
                {plan.planDuration} il
              </span>
            </div>
            <p className="text-sm text-[#64748b]">Proqnoz Dəyəri (18 yaş)</p>
            <p className="text-2xl font-bold text-[#0f172a] mt-1">
              {finalValue.toLocaleString()} ₼
            </p>
          </div>

          {/* Insurance */}
          <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#10b981]/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#10b981]" />
              </div>
              <span className="text-xs font-medium text-[#10b981] bg-[#10b981]/10 px-2 py-1 rounded-full">
                Aktiv
              </span>
            </div>
            <p className="text-sm text-[#64748b]">Sığorta Təminatı</p>
            <p className="text-2xl font-bold text-[#0f172a] mt-1">
              {insuranceCoverage.toLocaleString()} ₼
            </p>
          </div>

          {/* Risk Profile */}
          <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#f59e0b]/10 flex items-center justify-center">
                <Activity className="w-5 h-5 text-[#f59e0b]" />
              </div>
              <span
                className="text-xs font-medium px-2 py-1 rounded-full"
                style={{
                  color: RISK_COLORS[plan.riskLevel],
                  backgroundColor: `${RISK_COLORS[plan.riskLevel]}15`,
                }}
              >
                {RISK_LABELS[plan.riskLevel]}
              </span>
            </div>
            <p className="text-sm text-[#64748b]">Xalis Mənfəət</p>
            <p className="text-2xl font-bold text-[#10b981] mt-1">
              +{profitPercentage}%
            </p>
          </div>
        </div>

        {/* =================== MAIN CONTENT =================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ===== LEFT COLUMN (2/3) ===== */}
          <div className="lg:col-span-2 space-y-8">
            {/* Growth Chart */}
            <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#0f172a]">
                    İnvestisiya Artım Qrafiki
                  </h3>
                  <p className="text-sm text-[#64748b]">
                    İnvestisiya vs Proqnoz dəyəri
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#7F4CFF]" />
                    İnvestisiya
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#3EC6FF]" />
                    Proqnoz
                  </span>
                </div>
              </div>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={projection}>
                    <defs>
                      <linearGradient id="dashInvestedGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7F4CFF" stopOpacity={0.2} />
                        <stop offset="100%" stopColor="#7F4CFF" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="dashProjectedGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3EC6FF" stopOpacity={0.2} />
                        <stop offset="100%" stopColor="#3EC6FF" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis
                      dataKey="age"
                      tick={{ fontSize: 12, fill: "#64748b" }}
                      label={{ value: "Yaş", position: "insideBottom", offset: -5, style: { fontSize: 12, fill: "#64748b" } }}
                    />
                    <YAxis
                      tick={{ fontSize: 12, fill: "#64748b" }}
                      tickFormatter={(v) => `${(v / 1000).toFixed(0)}k ₼`}
                    />
                    <Tooltip
                      formatter={(value) => `${Number(value).toLocaleString()} ₼`}
                      labelFormatter={(label) => `Yaş: ${label}`}
                      contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                    />
                    <Area type="monotone" dataKey="invested" name="İnvestisiya" stroke="#7F4CFF" fill="url(#dashInvestedGrad)" strokeWidth={2} />
                    <Area type="monotone" dataKey="projected" name="Proqnoz" stroke="#3EC6FF" fill="url(#dashProjectedGrad)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Education Cost Comparison */}
            <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#0f172a]">
                    Təhsil Xərcləri Müqayisəsi
                  </h3>
                  <p className="text-sm text-[#64748b]">
                    {plan.planDuration} il sonra universitetin proqnoz xərcləri (4 illik)
                  </p>
                </div>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={educationChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#64748b" }} />
                    <YAxis tick={{ fontSize: 12, fill: "#64748b" }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k ₼`} />
                    <Tooltip
                      formatter={(value) => `${Number(value).toLocaleString()} ₼`}
                      contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0" }}
                    />
                    <Bar dataKey="Cari Xərc" fill="#7F4CFF" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="Proqnoz Xərc" fill="#3EC6FF" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 p-4 bg-[#f0fdf4] rounded-xl border border-[#bbf7d0] flex items-center justify-between">
                <span className="text-sm text-[#166534] font-medium">
                  Sizin proqnozlaşdırılan məbləğ:
                </span>
                <span className="text-lg font-bold text-[#166534]">
                  {finalValue.toLocaleString()} ₼
                </span>
              </div>
            </div>

            {/* AI Insights Panel */}
            <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#7F4CFF] flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#0f172a]">AI Anlayışları</h3>
                  <p className="text-sm text-[#64748b]">Planınız haqqında süni intellekt qeydləri</p>
                </div>
              </div>

              <div className="space-y-4">
                {aiInsights.map((insight, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 bg-[#f8fafc] rounded-xl border border-[#e2e8f0]"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#7F4CFF]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-[#7F4CFF]">{i + 1}</span>
                    </div>
                    <p className="text-sm text-[#334155] leading-relaxed">{insight}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ===== RIGHT COLUMN (1/3) ===== */}
          <div className="space-y-8">
            {/* Portfolio Allocation */}
            <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <PieIcon className="w-5 h-5 text-[#7F4CFF]" />
                <h3 className="text-lg font-semibold text-[#0f172a]">Portfel Bölgüsü</h3>
              </div>

              <div className="h-48 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={portfolioAllocation}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="percentage"
                    >
                      {portfolioAllocation.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-3">
                {portfolioAllocation.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-[#334155]">{item.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-[#0f172a]">{item.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Plan Details */}
            <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-5 h-5 text-[#7F4CFF]" />
                <h3 className="text-lg font-semibold text-[#0f172a]">Plan Detalları</h3>
              </div>

              <div className="space-y-4">
                {[
                  { label: "Aylıq İnvestisiya", value: `${plan.monthlyInvestment} ₼` },
                  { label: "Plan Müddəti", value: `${plan.planDuration} il` },
                  { label: "Uşağın Yaşı", value: `${plan.childAge} yaş` },
                  { label: "Hədəf Yaş", value: `${plan.childAge + plan.planDuration} yaş` },
                  { label: "Risk Profili", value: RISK_LABELS[plan.riskLevel] },
                ].map((detail) => (
                  <div
                    key={detail.label}
                    className="flex items-center justify-between py-2 border-b border-[#f1f5f9] last:border-0"
                  >
                    <span className="text-sm text-[#64748b]">{detail.label}</span>
                    <span className="text-sm font-semibold text-[#0f172a]">{detail.value}</span>
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-xs text-[#64748b] mb-2">
                  <span>İrəliləmə</span>
                  <span>{progressPercent}%</span>
                </div>
                <div className="w-full h-2 bg-[#e2e8f0] rounded-full">
                  <div
                    className="h-2 rounded-full bg-[#7F4CFF]"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* AI Advisor Chat */}
            <AIAdvisor plan={plan} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
