"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  User,
  Baby,
  Calendar,
  DollarSign,
  Shield,
  BarChart3,
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  Zap,
  PieChart,
  Lock,
  Layers,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartPie,
  Pie,
  Cell,
} from "recharts";
import Navbar from "@/components/Navbar";
import {
  PlanData,
  PlanType,
  RiskLevel,
  RISK_COLORS,
  SAFE_PLAN_SPLIT,
} from "@/lib/types";
import {
  calculateProjection,
  calculateSafeProjection,
  calculateFinalValue,
  calculateSafeFinalValues,
  calculateTotalInvested,
  calculateInsuranceCoverage,
  calculateInsurancePremium,
  getPortfolioAllocation,
} from "@/lib/calculations";
import { useLanguage } from "@/lib/LanguageContext";

export default function PlanPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const [plan, setPlan] = useState<PlanData>({
    parentAge: 30,
    childAge: 0,
    planDuration: 18,
    monthlyInvestment: 200,
    riskLevel: "medium",
    planType: "standard",
  });

  const updatePlan = (updates: Partial<PlanData>) => {
    setPlan((prev) => {
      const newPlan = { ...prev, ...updates };
      if (updates.childAge !== undefined) {
        newPlan.planDuration = 18 - updates.childAge;
      }
      return newPlan;
    });
  };

  const nextStep = () => { if (step < totalSteps) setStep(step + 1); };
  const prevStep = () => { if (step > 1) setStep(step - 1); };

  const completePlan = () => {
    localStorage.setItem("childPlan", JSON.stringify(plan));
    router.push("/dashboard");
  };

  const stepTitles = [
    t("step_personal"),
    t("step_investment"),
    t("step_portfolio"),
    t("step_insurance"),
    t("step_summary"),
  ];

  const riskDescMap: Record<RiskLevel, string> = {
    low: t("risk_low_desc"),
    medium: t("risk_medium_desc"),
    high: t("risk_high_desc"),
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />

      <div className="pt-24 pb-12 max-w-3xl mx-auto px-4 sm:px-6">
        {/* =================== PROGRESS BAR =================== */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {stepTitles.map((title, i) => (
              <div
                key={i}
                className={`flex items-center gap-2 text-sm font-medium ${
                  i + 1 <= step ? "text-[#7F4CFF]" : "text-[#94a3b8]"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    i + 1 < step
                      ? "bg-[#7F4CFF] text-white"
                      : i + 1 === step
                      ? "bg-[#7F4CFF]/10 text-[#7F4CFF] ring-2 ring-[#7F4CFF]"
                      : "bg-[#e2e8f0] text-[#94a3b8]"
                  }`}
                >
                  {i + 1 < step ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
                </div>
                <span className="hidden sm:block">{title}</span>
              </div>
            ))}
          </div>
          <div className="w-full bg-[#e2e8f0] rounded-full h-2">
            <div
              className="bg-[#7F4CFF] h-2 rounded-full transition-all duration-500"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* ========== STEP 1: Personal Info ========== */}
        {step === 1 && (
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#e2e8f0]">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-[#7F4CFF]/10 flex items-center justify-center">
                <User className="w-6 h-6 text-[#7F4CFF]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#0f172a]">{t("s1_title")}</h2>
                <p className="text-sm text-[#64748b]">{t("s1_subtitle")}</p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-[#334155] mb-3">
                  <User className="w-4 h-4 text-[#7F4CFF]" />
                  {t("s1_parent_age")}
                </label>
                <div className="flex items-center gap-4">
                  <input type="range" min={20} max={55} value={plan.parentAge} onChange={(e) => updatePlan({ parentAge: Number(e.target.value) })} className="flex-1" />
                  <div className="w-20 text-center">
                    <span className="text-2xl font-bold text-[#7F4CFF]">{plan.parentAge}</span>
                    <span className="text-sm text-[#64748b] ml-1">{t("s1_age_suffix")}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-[#334155] mb-3">
                  <Baby className="w-4 h-4 text-[#3EC6FF]" />
                  {t("s1_child_age")}
                </label>
                <div className="grid grid-cols-6 sm:grid-cols-11 gap-2">
                  {Array.from({ length: 11 }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => updatePlan({ childAge: i })}
                      className={`h-12 rounded-xl text-sm font-semibold ${
                        plan.childAge === i
                          ? "bg-[#7F4CFF] text-white shadow-lg shadow-[#7F4CFF]/20"
                          : "bg-[#f1f5f9] text-[#64748b] hover:bg-[#e2e8f0]"
                      }`}
                    >
                      {i}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-[#334155] mb-3">
                  <Calendar className="w-4 h-4 text-[#f59e0b]" />
                  {t("s1_plan_duration")}
                </label>
                <div className="flex items-center gap-4">
                  <input type="range" min={5} max={18 - plan.childAge} value={plan.planDuration} onChange={(e) => updatePlan({ planDuration: Number(e.target.value) })} className="flex-1" />
                  <div className="w-24 text-center">
                    <span className="text-2xl font-bold text-[#f59e0b]">{plan.planDuration}</span>
                    <span className="text-sm text-[#64748b] ml-1">{t("s1_year_suffix")}</span>
                  </div>
                </div>
                <p className="mt-2 text-xs text-[#94a3b8]">
                  {t("s1_until_age", { age: plan.childAge + plan.planDuration })}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ========== STEP 2: Investment ========== */}
        {step === 2 && (
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#e2e8f0]">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-[#10b981]/10 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-[#10b981]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#0f172a]">{t("s2_title")}</h2>
                <p className="text-sm text-[#64748b]">{t("s2_subtitle")}</p>
              </div>
            </div>

            <div className="space-y-10">
              {/* Plan Type Selector */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-[#334155] mb-4">
                  <Layers className="w-4 h-4 text-[#7F4CFF]" />
                  {t("s2_plan_type")}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(["standard", "safe"] as PlanType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => updatePlan({ planType: type })}
                      className={`relative p-5 rounded-2xl border-2 text-left transition-all ${
                        plan.planType === type
                          ? "border-[#7F4CFF] bg-[#7F4CFF]/5 shadow-lg"
                          : "border-[#e2e8f0] hover:border-[#7F4CFF]/30"
                      }`}
                    >
                      {plan.planType === type && (
                        <div className="absolute top-3 right-3">
                          <CheckCircle2 className="w-5 h-5 text-[#7F4CFF]" />
                        </div>
                      )}
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                        style={{ backgroundColor: type === "standard" ? "rgba(62, 198, 255, 0.1)" : "rgba(16, 185, 129, 0.1)" }}
                      >
                        {type === "standard" ? <TrendingUp className="w-5 h-5 text-[#3EC6FF]" /> : <Lock className="w-5 h-5 text-[#10b981]" />}
                      </div>
                      <h4 className="font-semibold text-[#0f172a] text-sm">
                        {type === "standard" ? t("plan_type_standard") : t("plan_type_safe")}
                      </h4>
                      <p className="text-xs text-[#64748b] mt-1">
                        {type === "standard"
                          ? t("s2_plan_standard_desc")
                          : t("s2_plan_safe_desc", { savings: SAFE_PLAN_SPLIT.savingsPercent, investment: SAFE_PLAN_SPLIT.investmentPercent })}
                      </p>
                    </button>
                  ))}
                </div>
                <div className={`mt-3 px-4 py-2.5 rounded-xl text-xs font-medium ${plan.planType === "standard" ? "bg-[#3EC6FF]/10 text-[#0284c7]" : "bg-[#10b981]/10 text-[#047857]"}`}>
                  {plan.planType === "standard"
                    ? t("s2_plan_standard_info")
                    : t("s2_plan_safe_info", { savings: SAFE_PLAN_SPLIT.savingsPercent, investment: SAFE_PLAN_SPLIT.investmentPercent })}
                </div>
              </div>

              {/* Monthly Investment */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-[#334155] mb-3">
                  <DollarSign className="w-4 h-4 text-[#10b981]" />
                  {t("s2_monthly_amount")}
                </label>
                <div className="flex items-center gap-4">
                  <input type="range" min={50} max={2000} step={25} value={plan.monthlyInvestment} onChange={(e) => updatePlan({ monthlyInvestment: Number(e.target.value) })} className="flex-1" />
                  <div className="w-28 text-center bg-[#f1f5f9] rounded-xl px-4 py-2">
                    <span className="text-2xl font-bold text-[#10b981]">{plan.monthlyInvestment} ₼</span>
                    <p className="text-xs text-[#64748b]">{t("s2_per_month")}</p>
                  </div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-[#94a3b8]">
                  <span>50 ₼</span>
                  <span>2,000 ₼</span>
                </div>
                <div className="flex gap-2 mt-4">
                  {[100, 200, 500, 1000].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => updatePlan({ monthlyInvestment: amount })}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium ${
                        plan.monthlyInvestment === amount ? "bg-[#10b981] text-white" : "bg-[#f1f5f9] text-[#64748b] hover:bg-[#e2e8f0]"
                      }`}
                    >
                      {amount} ₼
                    </button>
                  ))}
                </div>
              </div>

              {/* Risk Selection */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-[#334155] mb-4">
                  <BarChart3 className="w-4 h-4 text-[#7F4CFF]" />
                  {t("s2_risk_selection")}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {(["low", "medium", "high"] as RiskLevel[]).map((level) => (
                    <button
                      key={level}
                      onClick={() => updatePlan({ riskLevel: level })}
                      className={`relative p-5 rounded-2xl border-2 text-left ${
                        plan.riskLevel === level ? "border-[#7F4CFF] bg-[#7F4CFF]/5 shadow-lg" : "border-[#e2e8f0] hover:border-[#7F4CFF]/30"
                      }`}
                    >
                      {plan.riskLevel === level && (
                        <div className="absolute top-3 right-3"><CheckCircle2 className="w-5 h-5 text-[#7F4CFF]" /></div>
                      )}
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${RISK_COLORS[level]}20` }}>
                        {level === "low" ? <Shield className="w-5 h-5" style={{ color: RISK_COLORS[level] }} />
                          : level === "medium" ? <TrendingUp className="w-5 h-5" style={{ color: RISK_COLORS[level] }} />
                          : <Zap className="w-5 h-5" style={{ color: RISK_COLORS[level] }} />}
                      </div>
                      <h4 className="font-semibold text-[#0f172a]">{t(`risk_${level}`)}</h4>
                      <p className="text-xs text-[#64748b] mt-1">{riskDescMap[level]}</p>
                      <p className="text-sm font-bold mt-2" style={{ color: RISK_COLORS[level] }}>
                        ~{level === "low" ? 6 : level === "medium" ? 9 : 13}% {t("risk_annual")}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========== STEP 3: Portfolio ========== */}
        {step === 3 && (() => {
          const safeValues = plan.planType === "safe" ? calculateSafeFinalValues(plan) : null;
          const projectionData = plan.planType === "safe" ? calculateSafeProjection(plan) : calculateProjection(plan);

          return (
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#e2e8f0]">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-[#f59e0b]/10 flex items-center justify-center">
                <PieChart className="w-6 h-6 text-[#f59e0b]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#0f172a]">{t("s3_title")}</h2>
                <p className="text-sm text-[#64748b]">
                  {plan.planType === "safe" ? t("s3_subtitle_safe") : t("s3_subtitle")}
                </p>
              </div>
            </div>

            {plan.planType === "safe" && (
              <div className="mb-6 p-4 bg-[#10b981]/5 rounded-2xl border border-[#10b981]/20">
                <div className="flex items-center gap-2 mb-3">
                  <Lock className="w-4 h-4 text-[#10b981]" />
                  <span className="text-sm font-semibold text-[#0f172a]">{t("s3_monthly_split")}</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white rounded-xl border border-[#e2e8f0]">
                    <p className="text-xs text-[#64748b]">{t("s3_savings_part")} ({SAFE_PLAN_SPLIT.savingsPercent}%)</p>
                    <p className="text-lg font-bold text-[#10b981]">{Math.round(plan.monthlyInvestment * SAFE_PLAN_SPLIT.savingsPercent / 100)} ₼{t("s3_per_month")}</p>
                    <p className="text-xs text-[#94a3b8] mt-0.5">{t("s3_guaranteed")}</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-[#e2e8f0]">
                    <p className="text-xs text-[#64748b]">{t("s3_investment_part")} ({SAFE_PLAN_SPLIT.investmentPercent}%)</p>
                    <p className="text-lg font-bold text-[#7F4CFF]">{Math.round(plan.monthlyInvestment * SAFE_PLAN_SPLIT.investmentPercent / 100)} ₼{t("s3_per_month")}</p>
                    <p className="text-xs text-[#94a3b8] mt-0.5">{t("s3_portfolio_based")}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartPie>
                    <Pie data={getPortfolioAllocation(plan)} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="percentage">
                      {getPortfolioAllocation(plan).map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </RechartPie>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4 flex flex-col justify-center">
                {getPortfolioAllocation(plan).map((item) => (
                  <div key={item.name} className="flex items-center justify-between p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                      <div>
                        <p className="text-sm font-medium text-[#0f172a]">{item.name}</p>
                        <p className="text-xs text-[#64748b]">{item.percentage}% {t("s3_portfolio_pct")}</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-[#0f172a]">{item.amount} ₼{t("s3_per_month")}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#0f172a] mb-4">{t("s3_projected_growth")}</h3>
              <div className="h-72 bg-[#f8fafc] rounded-2xl p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={projectionData}>
                    <defs>
                      <linearGradient id="investedGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7F4CFF" stopOpacity={0.2} /><stop offset="100%" stopColor="#7F4CFF" stopOpacity={0} /></linearGradient>
                      <linearGradient id="projectedGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3EC6FF" stopOpacity={0.2} /><stop offset="100%" stopColor="#3EC6FF" stopOpacity={0} /></linearGradient>
                      <linearGradient id="savingsGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#10b981" stopOpacity={0.2} /><stop offset="100%" stopColor="#10b981" stopOpacity={0} /></linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="age" tick={{ fontSize: 12, fill: "#64748b" }} label={{ value: t("chart_age"), position: "insideBottom", offset: -5, style: { fontSize: 12, fill: "#64748b" } }} />
                    <YAxis tick={{ fontSize: 12, fill: "#64748b" }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k ₼`} />
                    <Tooltip formatter={(value) => `${Number(value).toLocaleString()} ₼`} labelFormatter={(label) => `${t("chart_age")}: ${label}`} contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }} />
                    <Area type="monotone" dataKey="invested" name={t("s3_total_invested")} stroke="#7F4CFF" fill="url(#investedGrad)" strokeWidth={2} />
                    {plan.planType === "safe" && <Area type="monotone" dataKey="savingsValue" name={t("s3_savings_part")} stroke="#10b981" fill="url(#savingsGrad)" strokeWidth={2} />}
                    <Area type="monotone" dataKey="projected" name={plan.planType === "safe" ? t("s3_total_forecast") : t("s3_projected_value")} stroke="#3EC6FF" fill="url(#projectedGrad)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {plan.planType === "safe" && safeValues ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                  <div className="text-center p-3 bg-[#f1f5f9] rounded-xl">
                    <p className="text-xs text-[#64748b]">{t("s3_total_payment")}</p>
                    <p className="text-lg font-bold text-[#7F4CFF]">{calculateTotalInvested(plan).toLocaleString()} ₼</p>
                  </div>
                  <div className="text-center p-3 bg-[#10b981]/5 rounded-xl border border-[#10b981]/20">
                    <p className="text-xs text-[#64748b]">{t("s3_savings_part")}</p>
                    <p className="text-lg font-bold text-[#10b981]">{safeValues.savingsValue.toLocaleString()} ₼</p>
                  </div>
                  <div className="text-center p-3 bg-[#7F4CFF]/5 rounded-xl border border-[#7F4CFF]/20">
                    <p className="text-xs text-[#64748b]">{t("s3_investment_part")}</p>
                    <p className="text-lg font-bold text-[#7F4CFF]">{safeValues.investmentValue.toLocaleString()} ₼</p>
                  </div>
                  <div className="text-center p-3 bg-[#3EC6FF]/5 rounded-xl border border-[#3EC6FF]/20">
                    <p className="text-xs text-[#64748b]">{t("s3_total_forecast")}</p>
                    <p className="text-lg font-bold text-[#3EC6FF]">{safeValues.total.toLocaleString()} ₼</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="text-center p-3 bg-[#f1f5f9] rounded-xl">
                    <p className="text-xs text-[#64748b]">{t("s3_total_invested")}</p>
                    <p className="text-lg font-bold text-[#7F4CFF]">{calculateTotalInvested(plan).toLocaleString()} ₼</p>
                  </div>
                  <div className="text-center p-3 bg-[#f1f5f9] rounded-xl">
                    <p className="text-xs text-[#64748b]">{t("s3_projected_value")}</p>
                    <p className="text-lg font-bold text-[#3EC6FF]">{calculateFinalValue(plan).toLocaleString()} ₼</p>
                  </div>
                  <div className="text-center p-3 bg-[#f1f5f9] rounded-xl">
                    <p className="text-xs text-[#64748b]">{t("s3_net_profit")}</p>
                    <p className="text-lg font-bold text-[#10b981]">{(calculateFinalValue(plan) - calculateTotalInvested(plan)).toLocaleString()} ₼</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          );
        })()}

        {/* ========== STEP 4: Insurance ========== */}
        {step === 4 && (
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#e2e8f0]">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-[#7F4CFF]/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-[#7F4CFF]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#0f172a]">{t("s4_title")}</h2>
                <p className="text-sm text-[#64748b]">{t("s4_subtitle")}</p>
              </div>
            </div>

            <div className="bg-[#7F4CFF] rounded-2xl p-8 text-white mb-8">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-8 h-8" />
                <h3 className="text-xl font-bold">{t("s4_plan_title")}</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-white/70 text-sm mb-1">{t("s4_coverage")}</p>
                  <p className="text-3xl font-bold">{calculateInsuranceCoverage(plan).toLocaleString()} ₼</p>
                </div>
                <div>
                  <p className="text-white/70 text-sm mb-1">{t("s4_premium")}</p>
                  <p className="text-3xl font-bold">{calculateInsurancePremium(plan).toLocaleString()} ₼</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-[#f0fdf4] rounded-xl border border-[#bbf7d0]">
                <CheckCircle2 className="w-6 h-6 text-[#10b981] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-[#0f172a]">{t("s4_benefit1_title")}</h4>
                  <p className="text-sm text-[#64748b] mt-1">{t("s4_benefit1_desc")}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-[#eff6ff] rounded-xl border border-[#bfdbfe]">
                <Shield className="w-6 h-6 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-[#0f172a]">{t("s4_benefit2_title")}</h4>
                  <p className="text-sm text-[#64748b] mt-1">{t("s4_benefit2_desc")}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-[#fefce8] rounded-xl border border-[#fde68a]">
                <AlertTriangle className="w-6 h-6 text-[#f59e0b] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-[#0f172a]">{t("s4_note_title")}</h4>
                  <p className="text-sm text-[#64748b] mt-1">{t("s4_note_desc")}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========== STEP 5: Summary ========== */}
        {step === 5 && (() => {
          const safeVals = plan.planType === "safe" ? calculateSafeFinalValues(plan) : null;

          return (
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#e2e8f0]">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-[#10b981]/10 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-[#10b981]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#0f172a]">{t("s5_title")}</h2>
                <p className="text-sm text-[#64748b]">{t("s5_subtitle")}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-5 bg-[#f8fafc] rounded-2xl border border-[#e2e8f0]">
                <p className="text-xs text-[#64748b] uppercase tracking-wide mb-1">{t("s5_parent_age")}</p>
                <p className="text-xl font-bold text-[#0f172a]">{plan.parentAge} {t("label_age")}</p>
              </div>
              <div className="p-5 bg-[#f8fafc] rounded-2xl border border-[#e2e8f0]">
                <p className="text-xs text-[#64748b] uppercase tracking-wide mb-1">{t("s5_child_age")}</p>
                <p className="text-xl font-bold text-[#0f172a]">{plan.childAge} {t("label_age")}</p>
              </div>
              <div className="p-5 bg-[#f8fafc] rounded-2xl border border-[#e2e8f0]">
                <p className="text-xs text-[#64748b] uppercase tracking-wide mb-1">{t("s5_plan_duration")}</p>
                <p className="text-xl font-bold text-[#0f172a]">{plan.planDuration} {t("label_year")}</p>
              </div>
              <div className="p-5 bg-[#f8fafc] rounded-2xl border border-[#e2e8f0]">
                <p className="text-xs text-[#64748b] uppercase tracking-wide mb-1">{t("s5_monthly_amount")}</p>
                <p className="text-xl font-bold text-[#10b981]">{plan.monthlyInvestment} ₼</p>
              </div>
              <div className="p-5 bg-[#f8fafc] rounded-2xl border border-[#e2e8f0]">
                <p className="text-xs text-[#64748b] uppercase tracking-wide mb-1">{t("s5_plan_type")}</p>
                <p className="text-xl font-bold" style={{ color: plan.planType === "safe" ? "#10b981" : "#3EC6FF" }}>
                  {plan.planType === "standard" ? t("plan_type_standard") : t("plan_type_safe")}
                </p>
              </div>
              <div className="p-5 bg-[#f8fafc] rounded-2xl border border-[#e2e8f0]">
                <p className="text-xs text-[#64748b] uppercase tracking-wide mb-1">{t("s5_risk_profile")}</p>
                <p className="text-xl font-bold" style={{ color: RISK_COLORS[plan.riskLevel] }}>
                  {t(`risk_${plan.riskLevel}`)}
                </p>
              </div>
            </div>

            {plan.planType === "safe" && safeVals && (
              <div className="mb-6 p-5 bg-[#10b981]/5 rounded-2xl border border-[#10b981]/20">
                <h4 className="text-sm font-semibold text-[#0f172a] mb-3 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#10b981]" />
                  {t("s5_safe_split_title")}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-white rounded-xl border border-[#e2e8f0]">
                    <p className="text-xs text-[#64748b]">{t("s3_savings_part")}</p>
                    <p className="text-xl font-bold text-[#10b981]">{safeVals.savingsValue.toLocaleString()} ₼</p>
                  </div>
                  <div className="text-center p-3 bg-white rounded-xl border border-[#e2e8f0]">
                    <p className="text-xs text-[#64748b]">{t("s3_investment_part")}</p>
                    <p className="text-xl font-bold text-[#7F4CFF]">{safeVals.investmentValue.toLocaleString()} ₼</p>
                  </div>
                  <div className="text-center p-3 bg-white rounded-xl border border-[#e2e8f0]">
                    <p className="text-xs text-[#64748b]">{t("s3_total_forecast")}</p>
                    <p className="text-xl font-bold text-[#3EC6FF]">{safeVals.total.toLocaleString()} ₼</p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-[#7F4CFF] rounded-2xl p-6 text-white mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-white/70 text-sm mb-1">{t("s5_total_payment")}</p>
                  <p className="text-2xl font-bold">{calculateTotalInvested(plan).toLocaleString()} ₼</p>
                </div>
                <div>
                  <p className="text-white/70 text-sm mb-1">{t("s5_projected_value")}</p>
                  <p className="text-2xl font-bold">{calculateFinalValue(plan).toLocaleString()} ₼</p>
                </div>
                <div>
                  <p className="text-white/70 text-sm mb-1">{t("s5_insurance_coverage")}</p>
                  <p className="text-2xl font-bold">{calculateInsuranceCoverage(plan).toLocaleString()} ₼</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-5 bg-[#fefce8] rounded-2xl border border-[#fde68a]">
              <div>
                <p className="text-sm text-[#92400e] font-medium">{t("s5_monthly_total_payment")}</p>
                <p className="text-xs text-[#a16207]">{t("s5_monthly_total_sub")}</p>
              </div>
              <p className="text-2xl font-bold text-[#92400e]">
                {(plan.monthlyInvestment + calculateInsurancePremium(plan)).toLocaleString()} ₼
                <span className="text-sm font-normal">{t("label_per_month")}</span>
              </p>
            </div>
          </div>
          );
        })()}

        {/* =================== NAVIGATION =================== */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={prevStep}
            disabled={step === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium ${
              step === 1 ? "text-[#94a3b8] cursor-not-allowed" : "text-[#64748b] hover:bg-white hover:shadow-sm border border-transparent hover:border-[#e2e8f0]"
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            {t("nav_back")}
          </button>

          {step < totalSteps ? (
            <button onClick={nextStep} className="flex items-center gap-2 px-8 py-3 rounded-xl bg-[#7F4CFF] text-white font-medium hover:bg-[#6A35E0] shadow-lg shadow-[#7F4CFF]/20 transition-colors">
              {t("nav_continue")}
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button onClick={completePlan} className="flex items-center gap-2 px-8 py-3 rounded-xl bg-[#10b981] text-white font-medium hover:bg-[#059669] shadow-lg shadow-[#10b981]/20 transition-colors">
              <CheckCircle2 className="w-5 h-5" />
              {t("nav_confirm")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
