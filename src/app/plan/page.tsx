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
  RiskLevel,
  RISK_LABELS,
  RISK_COLORS,
} from "@/lib/types";
import {
  calculateProjection,
  calculateFinalValue,
  calculateTotalInvested,
  calculateInsuranceCoverage,
  calculateInsurancePremium,
  getPortfolioAllocation,
} from "@/lib/calculations";

/**
 * Multi-step plan creation wizard.
 * 5 steps: Personal Info -> Investment -> Portfolio -> Insurance -> Summary.
 * No framer-motion — simple CSS transitions to avoid blinks.
 */
export default function PlanPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  /** Plan state with defaults */
  const [plan, setPlan] = useState<PlanData>({
    parentAge: 30,
    childAge: 0,
    planDuration: 18,
    monthlyInvestment: 200,
    riskLevel: "medium",
  });

  /** Update plan partially */
  const updatePlan = (updates: Partial<PlanData>) => {
    setPlan((prev) => {
      const newPlan = { ...prev, ...updates };
      if (updates.childAge !== undefined) {
        newPlan.planDuration = 18 - updates.childAge;
      }
      return newPlan;
    });
  };

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };
  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  /** Save plan and go to dashboard */
  const completePlan = () => {
    localStorage.setItem("childPlan", JSON.stringify(plan));
    router.push("/dashboard");
  };

  const stepTitles = [
    "Şəxsi Məlumatlar",
    "İnvestisiya",
    "Portfel",
    "Sığorta",
    "Nəticə",
  ];

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
                  {i + 1 < step ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    i + 1
                  )}
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

        {/* =================== STEP CONTENT =================== */}

        {/* ========== STEP 1: Personal Info ========== */}
        {step === 1 && (
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#e2e8f0]">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-[#7F4CFF]/10 flex items-center justify-center">
                <User className="w-6 h-6 text-[#7F4CFF]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#0f172a]">
                  Şəxsi Məlumatlar
                </h2>
                <p className="text-sm text-[#64748b]">
                  Planı fərdiləşdirmək üçün əsas məlumatları daxil edin
                </p>
              </div>
            </div>

            <div className="space-y-8">
              {/* Parent Age */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-[#334155] mb-3">
                  <User className="w-4 h-4 text-[#7F4CFF]" />
                  Valideyn yaşı
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min={20}
                    max={55}
                    value={plan.parentAge}
                    onChange={(e) =>
                      updatePlan({ parentAge: Number(e.target.value) })
                    }
                    className="flex-1"
                  />
                  <div className="w-20 text-center">
                    <span className="text-2xl font-bold text-[#7F4CFF]">
                      {plan.parentAge}
                    </span>
                    <span className="text-sm text-[#64748b] ml-1">yaş</span>
                  </div>
                </div>
              </div>

              {/* Child Age */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-[#334155] mb-3">
                  <Baby className="w-4 h-4 text-[#3EC6FF]" />
                  Uşağın yaşı
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

              {/* Plan Duration */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-[#334155] mb-3">
                  <Calendar className="w-4 h-4 text-[#f59e0b]" />
                  Plan müddəti
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min={5}
                    max={18 - plan.childAge}
                    value={plan.planDuration}
                    onChange={(e) =>
                      updatePlan({ planDuration: Number(e.target.value) })
                    }
                    className="flex-1"
                  />
                  <div className="w-24 text-center">
                    <span className="text-2xl font-bold text-[#f59e0b]">
                      {plan.planDuration}
                    </span>
                    <span className="text-sm text-[#64748b] ml-1">il</span>
                  </div>
                </div>
                <p className="mt-2 text-xs text-[#94a3b8]">
                  Uşaq {plan.childAge + plan.planDuration} yaşına çatana qədər
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
                <h2 className="text-2xl font-bold text-[#0f172a]">
                  İnvestisiya Parametrləri
                </h2>
                <p className="text-sm text-[#64748b]">
                  Aylıq investisiya məbləği və risk profilini seçin
                </p>
              </div>
            </div>

            <div className="space-y-10">
              {/* Monthly Investment Slider */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-[#334155] mb-3">
                  <DollarSign className="w-4 h-4 text-[#10b981]" />
                  Aylıq investisiya məbləği
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min={50}
                    max={2000}
                    step={25}
                    value={plan.monthlyInvestment}
                    onChange={(e) =>
                      updatePlan({
                        monthlyInvestment: Number(e.target.value),
                      })
                    }
                    className="flex-1"
                  />
                  <div className="w-28 text-center bg-[#f1f5f9] rounded-xl px-4 py-2">
                    <span className="text-2xl font-bold text-[#10b981]">
                      {plan.monthlyInvestment} ₼
                    </span>
                    <p className="text-xs text-[#64748b]">/ay</p>
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
                      onClick={() =>
                        updatePlan({ monthlyInvestment: amount })
                      }
                      className={`flex-1 py-2 rounded-lg text-sm font-medium ${
                        plan.monthlyInvestment === amount
                          ? "bg-[#10b981] text-white"
                          : "bg-[#f1f5f9] text-[#64748b] hover:bg-[#e2e8f0]"
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
                  Risk seçimi
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {(["low", "medium", "high"] as RiskLevel[]).map(
                    (level) => (
                      <button
                        key={level}
                        onClick={() => updatePlan({ riskLevel: level })}
                        className={`relative p-5 rounded-2xl border-2 text-left ${
                          plan.riskLevel === level
                            ? "border-[#7F4CFF] bg-[#7F4CFF]/5 shadow-lg"
                            : "border-[#e2e8f0] hover:border-[#7F4CFF]/30"
                        }`}
                      >
                        {plan.riskLevel === level && (
                          <div className="absolute top-3 right-3">
                            <CheckCircle2 className="w-5 h-5 text-[#7F4CFF]" />
                          </div>
                        )}
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                          style={{
                            backgroundColor: `${RISK_COLORS[level]}20`,
                          }}
                        >
                          {level === "low" ? (
                            <Shield className="w-5 h-5" style={{ color: RISK_COLORS[level] }} />
                          ) : level === "medium" ? (
                            <TrendingUp className="w-5 h-5" style={{ color: RISK_COLORS[level] }} />
                          ) : (
                            <Zap className="w-5 h-5" style={{ color: RISK_COLORS[level] }} />
                          )}
                        </div>
                        <h4 className="font-semibold text-[#0f172a]">
                          {RISK_LABELS[level]}
                        </h4>
                        <p className="text-xs text-[#64748b] mt-1">
                          {level === "low"
                            ? "Sabit gəlir, minimal dalğalanma"
                            : level === "medium"
                            ? "Balanslaşdırılmış, optimal gəlir"
                            : "Maksimal gəlir potensialı"}
                        </p>
                        <p
                          className="text-sm font-bold mt-2"
                          style={{ color: RISK_COLORS[level] }}
                        >
                          ~{level === "low" ? 6 : level === "medium" ? 9 : 13}% illik
                        </p>
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========== STEP 3: Portfolio ========== */}
        {step === 3 && (
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#e2e8f0]">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-[#f59e0b]/10 flex items-center justify-center">
                <PieChart className="w-6 h-6 text-[#f59e0b]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#0f172a]">
                  Portfel Bölgüsü
                </h2>
                <p className="text-sm text-[#64748b]">
                  Seçilmiş risk profilinə uyğun portfel strukturu
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartPie>
                    <Pie
                      data={getPortfolioAllocation(plan)}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="percentage"
                    >
                      {getPortfolioAllocation(plan).map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </RechartPie>
                </ResponsiveContainer>
              </div>

              <div className="space-y-4 flex flex-col justify-center">
                {getPortfolioAllocation(plan).map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <div>
                        <p className="text-sm font-medium text-[#0f172a]">{item.name}</p>
                        <p className="text-xs text-[#64748b]">{item.percentage}% portfel</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-[#0f172a]">{item.amount} ₼/ay</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Projected Growth Chart */}
            <div>
              <h3 className="text-lg font-semibold text-[#0f172a] mb-4">
                Proqnozlaşdırılan Artım
              </h3>
              <div className="h-72 bg-[#f8fafc] rounded-2xl p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={calculateProjection(plan)}>
                    <defs>
                      <linearGradient id="investedGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7F4CFF" stopOpacity={0.2} />
                        <stop offset="100%" stopColor="#7F4CFF" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="projectedGrad" x1="0" y1="0" x2="0" y2="1">
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
                    <Area type="monotone" dataKey="invested" name="İnvestisiya" stroke="#7F4CFF" fill="url(#investedGrad)" strokeWidth={2} />
                    <Area type="monotone" dataKey="projected" name="Proqnoz" stroke="#3EC6FF" fill="url(#projectedGrad)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="text-center p-3 bg-[#f1f5f9] rounded-xl">
                  <p className="text-xs text-[#64748b]">Ümumi İnvestisiya</p>
                  <p className="text-lg font-bold text-[#7F4CFF]">
                    {calculateTotalInvested(plan).toLocaleString()} ₼
                  </p>
                </div>
                <div className="text-center p-3 bg-[#f1f5f9] rounded-xl">
                  <p className="text-xs text-[#64748b]">Proqnoz Dəyəri</p>
                  <p className="text-lg font-bold text-[#3EC6FF]">
                    {calculateFinalValue(plan).toLocaleString()} ₼
                  </p>
                </div>
                <div className="text-center p-3 bg-[#f1f5f9] rounded-xl">
                  <p className="text-xs text-[#64748b]">Xalis Mənfəət</p>
                  <p className="text-lg font-bold text-[#10b981]">
                    {(calculateFinalValue(plan) - calculateTotalInvested(plan)).toLocaleString()} ₼
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========== STEP 4: Insurance ========== */}
        {step === 4 && (
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#e2e8f0]">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-[#7F4CFF]/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-[#7F4CFF]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#0f172a]">Həyat Sığortası</h2>
                <p className="text-sm text-[#64748b]">Uşağınızın gələcəyini hər şəraitdə təmin edin</p>
              </div>
            </div>

            <div className="bg-[#7F4CFF] rounded-2xl p-8 text-white mb-8">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-8 h-8" />
                <h3 className="text-xl font-bold">Həyat Sığortası Planı</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-white/70 text-sm mb-1">Sığorta Məbləği</p>
                  <p className="text-3xl font-bold">{calculateInsuranceCoverage(plan).toLocaleString()} ₼</p>
                </div>
                <div>
                  <p className="text-white/70 text-sm mb-1">Aylıq Premium</p>
                  <p className="text-3xl font-bold">{calculateInsurancePremium(plan).toLocaleString()} ₼</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-[#f0fdf4] rounded-xl border border-[#bbf7d0]">
                <CheckCircle2 className="w-6 h-6 text-[#10b981] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-[#0f172a]">Valideyn vəfat edərsə plan davam edəcək</h4>
                  <p className="text-sm text-[#64748b] mt-1">Sığorta şirkəti qalan investisiya haqlarını ödəyəcək və plan müddəti bitənə qədər davam edəcək.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-[#eff6ff] rounded-xl border border-[#bfdbfe]">
                <Shield className="w-6 h-6 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-[#0f172a]">Tam təminat</h4>
                  <p className="text-sm text-[#64748b] mt-1">Proqnozlaşdırılan dəyərin 120%-i qədər sığorta təminatı ilə uşağınız tam qorunur.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-[#fefce8] rounded-xl border border-[#fde68a]">
                <AlertTriangle className="w-6 h-6 text-[#f59e0b] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-[#0f172a]">Qeyd</h4>
                  <p className="text-sm text-[#64748b] mt-1">Sığorta premium məbləği investisiya haqlarına əlavə olaraq tutulur. Real premium məbləğ sığorta müqaviləsinə əsasən dəyişə bilər.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========== STEP 5: Summary ========== */}
        {step === 5 && (
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#e2e8f0]">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-[#10b981]/10 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-[#10b981]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#0f172a]">Plan Xülasəsi</h2>
                <p className="text-sm text-[#64748b]">Planınızı yoxlayın və təsdiqləyin</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-5 bg-[#f8fafc] rounded-2xl border border-[#e2e8f0]">
                <p className="text-xs text-[#64748b] uppercase tracking-wide mb-1">Valideyn Yaşı</p>
                <p className="text-xl font-bold text-[#0f172a]">{plan.parentAge} yaş</p>
              </div>
              <div className="p-5 bg-[#f8fafc] rounded-2xl border border-[#e2e8f0]">
                <p className="text-xs text-[#64748b] uppercase tracking-wide mb-1">Uşağın Yaşı</p>
                <p className="text-xl font-bold text-[#0f172a]">{plan.childAge} yaş</p>
              </div>
              <div className="p-5 bg-[#f8fafc] rounded-2xl border border-[#e2e8f0]">
                <p className="text-xs text-[#64748b] uppercase tracking-wide mb-1">Plan Müddəti</p>
                <p className="text-xl font-bold text-[#0f172a]">{plan.planDuration} il</p>
              </div>
              <div className="p-5 bg-[#f8fafc] rounded-2xl border border-[#e2e8f0]">
                <p className="text-xs text-[#64748b] uppercase tracking-wide mb-1">Aylıq İnvestisiya</p>
                <p className="text-xl font-bold text-[#10b981]">{plan.monthlyInvestment} ₼</p>
              </div>
              <div className="p-5 bg-[#f8fafc] rounded-2xl border border-[#e2e8f0]">
                <p className="text-xs text-[#64748b] uppercase tracking-wide mb-1">Risk Profili</p>
                <p className="text-xl font-bold" style={{ color: RISK_COLORS[plan.riskLevel] }}>
                  {RISK_LABELS[plan.riskLevel]}
                </p>
              </div>
              <div className="p-5 bg-[#f8fafc] rounded-2xl border border-[#e2e8f0]">
                <p className="text-xs text-[#64748b] uppercase tracking-wide mb-1">Aylıq Premium</p>
                <p className="text-xl font-bold text-[#7F4CFF]">{calculateInsurancePremium(plan)} ₼</p>
              </div>
            </div>

            <div className="bg-[#7F4CFF] rounded-2xl p-6 text-white mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-white/70 text-sm mb-1">Ümumi İnvestisiya</p>
                  <p className="text-2xl font-bold">{calculateTotalInvested(plan).toLocaleString()} ₼</p>
                </div>
                <div>
                  <p className="text-white/70 text-sm mb-1">Proqnoz Dəyəri</p>
                  <p className="text-2xl font-bold">{calculateFinalValue(plan).toLocaleString()} ₼</p>
                </div>
                <div>
                  <p className="text-white/70 text-sm mb-1">Sığorta Təminatı</p>
                  <p className="text-2xl font-bold">{calculateInsuranceCoverage(plan).toLocaleString()} ₼</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-5 bg-[#fefce8] rounded-2xl border border-[#fde68a]">
              <div>
                <p className="text-sm text-[#92400e] font-medium">Aylıq Ümumi Ödəniş</p>
                <p className="text-xs text-[#a16207]">İnvestisiya + Sığorta Premium</p>
              </div>
              <p className="text-2xl font-bold text-[#92400e]">
                {(plan.monthlyInvestment + calculateInsurancePremium(plan)).toLocaleString()} ₼
                <span className="text-sm font-normal">/ay</span>
              </p>
            </div>
          </div>
        )}

        {/* =================== NAVIGATION BUTTONS =================== */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={prevStep}
            disabled={step === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium ${
              step === 1
                ? "text-[#94a3b8] cursor-not-allowed"
                : "text-[#64748b] hover:bg-white hover:shadow-sm border border-transparent hover:border-[#e2e8f0]"
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Geri
          </button>

          {step < totalSteps ? (
            <button
              onClick={nextStep}
              className="flex items-center gap-2 px-8 py-3 rounded-xl bg-[#7F4CFF] text-white font-medium hover:bg-[#6A35E0] shadow-lg shadow-[#7F4CFF]/20 transition-colors"
            >
              Davam et
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={completePlan}
              className="flex items-center gap-2 px-8 py-3 rounded-xl bg-[#10b981] text-white font-medium hover:bg-[#059669] shadow-lg shadow-[#10b981]/20 transition-colors"
            >
              <CheckCircle2 className="w-5 h-5" />
              Planı Təsdiqlə
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
