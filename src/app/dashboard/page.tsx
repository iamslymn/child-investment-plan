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
  Lock,
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
import { PlanData, RISK_COLORS, SAFE_PLAN_SPLIT } from "@/lib/types";
import {
  calculateProjection,
  calculateSafeProjection,
  calculateFinalValue,
  calculateSafeFinalValues,
  calculateTotalInvested,
  calculateInsuranceCoverage,
  getPortfolioAllocation,
  predictEducationCosts,
  generateAIInsights,
} from "@/lib/calculations";
import { useLanguage } from "@/lib/LanguageContext";

export default function DashboardPage() {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [plan, setPlan] = useState<PlanData | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("childPlan");
    if (saved) {
      const parsed = JSON.parse(saved) as PlanData;
      if (!parsed.planType) parsed.planType = "standard";
      setPlan(parsed);
    }
  }, []);

  if (!plan) {
    return (
      <div className="min-h-screen bg-[#f8fafc]">
        <Navbar />
        <div className="pt-32 text-center px-4">
          <div className="max-w-md mx-auto bg-white rounded-3xl p-10 shadow-sm border border-[#e2e8f0]">
            <div className="w-16 h-16 rounded-2xl bg-[#7F4CFF]/10 flex items-center justify-center mx-auto mb-6">
              <Target className="w-8 h-8 text-[#7F4CFF]" />
            </div>
            <h2 className="text-2xl font-bold text-[#0f172a] mb-3">{t("dash_no_plan_title")}</h2>
            <p className="text-[#64748b] mb-6">{t("dash_no_plan_desc")}</p>
            <button
              onClick={() => router.push("/plan")}
              className="px-6 py-3 bg-[#7F4CFF] text-white rounded-xl font-medium hover:bg-[#6A35E0] transition-colors"
            >
              {t("dash_create_plan")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isSafePlan = plan.planType === "safe";
  const projection = isSafePlan ? calculateSafeProjection(plan) : calculateProjection(plan);
  const finalValue = calculateFinalValue(plan);
  const totalInvested = calculateTotalInvested(plan);
  const insuranceCoverage = calculateInsuranceCoverage(plan);
  const portfolioAllocation = getPortfolioAllocation(plan);
  const educationCosts = predictEducationCosts(plan.planDuration);
  const aiInsights = generateAIInsights(plan, lang);
  const profit = finalValue - totalInvested;
  const profitPercentage = ((profit / totalInvested) * 100).toFixed(1);
  const safeValues = isSafePlan ? calculateSafeFinalValues(plan) : null;

  const progressPercent = 15;
  const currentInvested = Math.round(totalInvested * (progressPercent / 100));
  const currentValue = Math.round(currentInvested * (1 + (finalValue / totalInvested - 1) * 0.3));
  const currentSavingsBalance = isSafePlan && safeValues ? Math.round(safeValues.savingsValue * (progressPercent / 100)) : 0;
  const currentInvestmentBalance = isSafePlan && safeValues ? Math.round(safeValues.investmentValue * (progressPercent / 100)) : 0;

  const educationChartData = educationCosts.map((c) => ({
    name: c.region,
    [t("dash_edu_current")]: c.currentCost * 4,
    [t("dash_edu_projected")]: c.projectedCost,
  }));

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />

      <div className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0f172a]">{t("dash_title")}</h1>
          <p className="text-[#64748b] mt-1">{t("dash_subtitle")}</p>
        </div>

        {/* =================== STATS CARDS =================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#3EC6FF]/10 flex items-center justify-center"><Wallet className="w-5 h-5 text-[#3EC6FF]" /></div>
              <span className="flex items-center gap-1 text-xs font-medium text-[#10b981] bg-[#10b981]/10 px-2 py-1 rounded-full">
                <ArrowUpRight className="w-3 h-3" />+{((currentValue / currentInvested - 1) * 100).toFixed(1)}%
              </span>
            </div>
            <p className="text-sm text-[#64748b]">{isSafePlan ? t("dash_total_balance") : t("dash_current_value")}</p>
            <p className="text-2xl font-bold text-[#0f172a] mt-1">{currentValue.toLocaleString()} ₼</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#7F4CFF]/10 flex items-center justify-center"><TrendingUp className="w-5 h-5 text-[#7F4CFF]" /></div>
              <span className="flex items-center gap-1 text-xs font-medium text-[#7F4CFF] bg-[#7F4CFF]/10 px-2 py-1 rounded-full">
                <Target className="w-3 h-3" />{plan.planDuration} {t("label_year")}
              </span>
            </div>
            <p className="text-sm text-[#64748b]">{t("dash_projected_value")}</p>
            <p className="text-2xl font-bold text-[#0f172a] mt-1">{finalValue.toLocaleString()} ₼</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#10b981]/10 flex items-center justify-center"><Shield className="w-5 h-5 text-[#10b981]" /></div>
              <span className="text-xs font-medium text-[#10b981] bg-[#10b981]/10 px-2 py-1 rounded-full">{t("dash_active")}</span>
            </div>
            <p className="text-sm text-[#64748b]">{t("dash_insurance")}</p>
            <p className="text-2xl font-bold text-[#0f172a] mt-1">{insuranceCoverage.toLocaleString()} ₼</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#f59e0b]/10 flex items-center justify-center"><Activity className="w-5 h-5 text-[#f59e0b]" /></div>
              <span className="text-xs font-medium px-2 py-1 rounded-full" style={{ color: RISK_COLORS[plan.riskLevel], backgroundColor: `${RISK_COLORS[plan.riskLevel]}15` }}>
                {t(`risk_${plan.riskLevel}`)}
              </span>
            </div>
            <p className="text-sm text-[#64748b]">{t("dash_net_profit")}</p>
            <p className="text-2xl font-bold text-[#10b981] mt-1">+{profitPercentage}%</p>
          </div>
        </div>

        {/* =================== SAFE PLAN BALANCE BREAKDOWN =================== */}
        {isSafePlan && safeValues && (
          <div className="mb-8 bg-white rounded-2xl p-6 border border-[#10b981]/20 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#10b981]/10 flex items-center justify-center"><Lock className="w-5 h-5 text-[#10b981]" /></div>
              <div>
                <h3 className="text-lg font-semibold text-[#0f172a]">{t("dash_safe_balances_title")}</h3>
                <p className="text-sm text-[#64748b]">
                  {t("dash_safe_balances_desc", { amount: plan.monthlyInvestment, savings: SAFE_PLAN_SPLIT.savingsPercent, investment: SAFE_PLAN_SPLIT.investmentPercent })}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 bg-[#10b981]/5 rounded-2xl border border-[#10b981]/20">
                <p className="text-xs text-[#64748b] uppercase tracking-wide mb-1">{t("dash_savings_balance")}</p>
                <p className="text-2xl font-bold text-[#10b981]">{currentSavingsBalance.toLocaleString()} ₼</p>
                <p className="text-xs text-[#94a3b8] mt-1">{t("dash_forecast")}: {safeValues.savingsValue.toLocaleString()} ₼</p>
              </div>
              <div className="p-5 bg-[#7F4CFF]/5 rounded-2xl border border-[#7F4CFF]/20">
                <p className="text-xs text-[#64748b] uppercase tracking-wide mb-1">{t("dash_investment_balance")}</p>
                <p className="text-2xl font-bold text-[#7F4CFF]">{currentInvestmentBalance.toLocaleString()} ₼</p>
                <p className="text-xs text-[#94a3b8] mt-1">{t("dash_forecast")}: {safeValues.investmentValue.toLocaleString()} ₼</p>
              </div>
              <div className="p-5 bg-[#3EC6FF]/5 rounded-2xl border border-[#3EC6FF]/20">
                <p className="text-xs text-[#64748b] uppercase tracking-wide mb-1">{t("dash_overall_balance")}</p>
                <p className="text-2xl font-bold text-[#3EC6FF]">{currentValue.toLocaleString()} ₼</p>
                <p className="text-xs text-[#94a3b8] mt-1">{t("dash_forecast")}: {safeValues.total.toLocaleString()} ₼</p>
              </div>
            </div>
          </div>
        )}

        {/* =================== MAIN CONTENT =================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Growth Chart */}
            <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#0f172a]">{isSafePlan ? t("dash_chart_title_safe") : t("dash_chart_title")}</h3>
                  <p className="text-sm text-[#64748b]">{isSafePlan ? t("dash_chart_subtitle_safe") : t("dash_chart_subtitle")}</p>
                </div>
                <div className="flex items-center gap-4 text-xs flex-wrap">
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#7F4CFF]" />{isSafePlan ? t("dash_chart_payment") : t("dash_chart_invested")}</span>
                  {isSafePlan && <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#10b981]" />{t("dash_chart_savings")}</span>}
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#3EC6FF]" />{isSafePlan ? t("dash_chart_total") : t("dash_chart_projected")}</span>
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={projection}>
                    <defs>
                      <linearGradient id="dashInvestedGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7F4CFF" stopOpacity={0.2} /><stop offset="100%" stopColor="#7F4CFF" stopOpacity={0} /></linearGradient>
                      <linearGradient id="dashProjectedGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3EC6FF" stopOpacity={0.2} /><stop offset="100%" stopColor="#3EC6FF" stopOpacity={0} /></linearGradient>
                      <linearGradient id="dashSavingsGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#10b981" stopOpacity={0.2} /><stop offset="100%" stopColor="#10b981" stopOpacity={0} /></linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="age" tick={{ fontSize: 12, fill: "#64748b" }} label={{ value: t("chart_age"), position: "insideBottom", offset: -5, style: { fontSize: 12, fill: "#64748b" } }} />
                    <YAxis tick={{ fontSize: 12, fill: "#64748b" }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k ₼`} />
                    <Tooltip formatter={(value) => `${Number(value).toLocaleString()} ₼`} labelFormatter={(label) => `${t("chart_age")}: ${label}`} contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }} />
                    <Area type="monotone" dataKey="invested" name={isSafePlan ? t("dash_chart_payment") : t("dash_chart_invested")} stroke="#7F4CFF" fill="url(#dashInvestedGrad)" strokeWidth={2} />
                    {isSafePlan && <Area type="monotone" dataKey="savingsValue" name={t("dash_chart_savings")} stroke="#10b981" fill="url(#dashSavingsGrad)" strokeWidth={2} />}
                    <Area type="monotone" dataKey="projected" name={isSafePlan ? t("dash_chart_total") : t("dash_chart_projected")} stroke="#3EC6FF" fill="url(#dashProjectedGrad)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Education Cost Comparison */}
            <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#0f172a]">{t("dash_edu_title")}</h3>
                  <p className="text-sm text-[#64748b]">{t("dash_edu_subtitle", { years: plan.planDuration })}</p>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={educationChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#64748b" }} />
                    <YAxis tick={{ fontSize: 12, fill: "#64748b" }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k ₼`} />
                    <Tooltip formatter={(value) => `${Number(value).toLocaleString()} ₼`} contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0" }} />
                    <Bar dataKey={t("dash_edu_current")} fill="#7F4CFF" radius={[8, 8, 0, 0]} />
                    <Bar dataKey={t("dash_edu_projected")} fill="#3EC6FF" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 p-4 bg-[#f0fdf4] rounded-xl border border-[#bbf7d0] flex items-center justify-between">
                <span className="text-sm text-[#166534] font-medium">{t("dash_edu_your_amount")}</span>
                <span className="text-lg font-bold text-[#166534]">{finalValue.toLocaleString()} ₼</span>
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#7F4CFF] flex items-center justify-center"><BarChart3 className="w-5 h-5 text-white" /></div>
                <div>
                  <h3 className="text-lg font-semibold text-[#0f172a]">{t("dash_ai_title")}</h3>
                  <p className="text-sm text-[#64748b]">{t("dash_ai_subtitle")}</p>
                </div>
              </div>
              <div className="space-y-4">
                {aiInsights.map((insight, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-[#f8fafc] rounded-xl border border-[#e2e8f0]">
                    <div className="w-6 h-6 rounded-full bg-[#7F4CFF]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-[#7F4CFF]">{i + 1}</span>
                    </div>
                    <p className="text-sm text-[#334155] leading-relaxed">{insight}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ===== RIGHT COLUMN ===== */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <PieIcon className="w-5 h-5 text-[#7F4CFF]" />
                <h3 className="text-lg font-semibold text-[#0f172a]">{t("dash_portfolio_title")}</h3>
              </div>
              <div className="h-48 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={portfolioAllocation} cx="50%" cy="50%" innerRadius={45} outerRadius={80} paddingAngle={5} dataKey="percentage">
                      {portfolioAllocation.map((entry, i) => <Cell key={i} fill={entry.color} />)}
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

            <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-5 h-5 text-[#7F4CFF]" />
                <h3 className="text-lg font-semibold text-[#0f172a]">{t("dash_plan_details")}</h3>
              </div>
              <div className="space-y-4">
                {[
                  { label: t("dash_plan_type"), value: plan.planType === "standard" ? t("plan_type_standard_short") : t("plan_type_safe_short") },
                  { label: t("dash_monthly_amount"), value: `${plan.monthlyInvestment} ₼` },
                  ...(isSafePlan
                    ? [
                        { label: t("dash_savings_part"), value: `${Math.round(plan.monthlyInvestment * SAFE_PLAN_SPLIT.savingsPercent / 100)} ₼${t("label_per_month")}` },
                        { label: t("dash_investment_part"), value: `${Math.round(plan.monthlyInvestment * SAFE_PLAN_SPLIT.investmentPercent / 100)} ₼${t("label_per_month")}` },
                      ]
                    : []),
                  { label: t("dash_plan_duration"), value: `${plan.planDuration} ${t("label_year")}` },
                  { label: t("dash_child_age"), value: `${plan.childAge} ${t("label_age")}` },
                  { label: t("dash_target_age"), value: `${plan.childAge + plan.planDuration} ${t("label_age")}` },
                  { label: t("dash_risk_profile"), value: t(`risk_${plan.riskLevel}`) },
                ].map((detail) => (
                  <div key={detail.label} className="flex items-center justify-between py-2 border-b border-[#f1f5f9] last:border-0">
                    <span className="text-sm text-[#64748b]">{detail.label}</span>
                    <span className="text-sm font-semibold text-[#0f172a]">{detail.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <div className="flex items-center justify-between text-xs text-[#64748b] mb-2">
                  <span>{t("dash_progress")}</span>
                  <span>{progressPercent}%</span>
                </div>
                <div className="w-full h-2 bg-[#e2e8f0] rounded-full">
                  <div className="h-2 rounded-full bg-[#7F4CFF]" style={{ width: `${progressPercent}%` }} />
                </div>
              </div>
            </div>

            <AIAdvisor plan={plan} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
