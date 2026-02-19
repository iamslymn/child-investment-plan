/**
 * Financial calculation utilities for the Child Investment Plan.
 * Uses simplified simulation formulas suitable for an MVP demo.
 *
 * Supports two plan types:
 *   - "standard": 100% of monthly amount goes to investment portfolio
 *   - "safe": 60% goes to guaranteed savings bucket, 40% to investment portfolio
 */

import {
  PlanData,
  ProjectionPoint,
  SafeProjectionPoint,
  EXPECTED_RETURNS,
  PORTFOLIO_ALLOCATIONS,
  SAFE_PLAN_SPLIT,
  SAFE_SAVINGS_ANNUAL_RATE,
  UniversityCost,
} from "./types";
import { Lang } from "./i18n";

/** Average annual inflation rate used in calculations */
const INFLATION_RATE = 0.05;

// ---------------------------------------------------------------------------
// Helper: compound monthly growth
// ---------------------------------------------------------------------------

/**
 * Calculate future value with monthly contributions and compound interest.
 * @param principal   Starting balance
 * @param annualRate  Annual interest rate (e.g. 0.05 for 5%)
 * @param months      Number of months
 * @param monthlyContribution  Amount added each month
 * @returns Future value after `months` months
 */
export function compoundMonthly(
  principal: number,
  annualRate: number,
  months: number,
  monthlyContribution: number
): number {
  const monthlyRate = annualRate / 12;
  let value = principal;
  for (let m = 0; m < months; m++) {
    value = (value + monthlyContribution) * (1 + monthlyRate);
  }
  return value;
}

// ---------------------------------------------------------------------------
// Standard projection (existing logic, unchanged)
// ---------------------------------------------------------------------------

/**
 * Calculate projected investment growth over the plan duration.
 * Uses compound interest formula with monthly contributions.
 * Works for BOTH plan types — for "safe" plans the caller should use
 * calculateSafeProjection() which provides the bucket split.
 */
export function calculateProjection(plan: PlanData): ProjectionPoint[] {
  const monthlyInvestment =
    plan.planType === "safe"
      ? plan.monthlyInvestment * (SAFE_PLAN_SPLIT.investmentPercent / 100)
      : plan.monthlyInvestment;

  const annualReturn = EXPECTED_RETURNS[plan.riskLevel] / 100;
  const monthlyReturn = annualReturn / 12;
  const points: ProjectionPoint[] = [];

  let totalInvested = 0;
  let currentValue = 0;

  for (let year = 0; year <= plan.planDuration; year++) {
    points.push({
      year,
      age: plan.childAge + year,
      invested: Math.round(totalInvested),
      projected: Math.round(currentValue),
    });

    for (let month = 0; month < 12; month++) {
      currentValue = (currentValue + monthlyInvestment) * (1 + monthlyReturn);
      totalInvested += monthlyInvestment;
    }
  }

  return points;
}

// ---------------------------------------------------------------------------
// Safe plan projection (split buckets)
// ---------------------------------------------------------------------------

/**
 * Calculate projection for "safe" plan type with savings + investment split.
 * Returns yearly snapshots with separate bucket values.
 */
export function calculateSafeProjection(plan: PlanData): SafeProjectionPoint[] {
  const savingsContribution =
    plan.monthlyInvestment * (SAFE_PLAN_SPLIT.savingsPercent / 100);
  const investmentContribution =
    plan.monthlyInvestment * (SAFE_PLAN_SPLIT.investmentPercent / 100);

  const investmentAnnualReturn = EXPECTED_RETURNS[plan.riskLevel] / 100;
  const investmentMonthlyReturn = investmentAnnualReturn / 12;
  const savingsMonthlyReturn = SAFE_SAVINGS_ANNUAL_RATE / 12;

  const points: SafeProjectionPoint[] = [];
  let totalInvested = 0;
  let savingsValue = 0;
  let investmentValue = 0;

  for (let year = 0; year <= plan.planDuration; year++) {
    points.push({
      year,
      age: plan.childAge + year,
      invested: Math.round(totalInvested),
      projected: Math.round(savingsValue + investmentValue),
      savingsValue: Math.round(savingsValue),
      investmentValue: Math.round(investmentValue),
    });

    for (let month = 0; month < 12; month++) {
      savingsValue =
        (savingsValue + savingsContribution) * (1 + savingsMonthlyReturn);
      investmentValue =
        (investmentValue + investmentContribution) *
        (1 + investmentMonthlyReturn);
      totalInvested += plan.monthlyInvestment;
    }
  }

  return points;
}

// ---------------------------------------------------------------------------
// Convenience wrappers (plan-type-aware)
// ---------------------------------------------------------------------------

/**
 * Calculate the final projected value at end of plan.
 * Automatically picks the correct projection based on planType.
 */
export function calculateFinalValue(plan: PlanData): number {
  if (plan.planType === "safe") {
    const projection = calculateSafeProjection(plan);
    return projection[projection.length - 1]?.projected || 0;
  }
  const projection = calculateProjection(plan);
  return projection[projection.length - 1]?.projected || 0;
}

/**
 * Get the final split values for "safe" plan type.
 * Returns { savingsValue, investmentValue, total }.
 */
export function calculateSafeFinalValues(plan: PlanData) {
  const projection = calculateSafeProjection(plan);
  const last = projection[projection.length - 1];
  return {
    savingsValue: last?.savingsValue || 0,
    investmentValue: last?.investmentValue || 0,
    total: last?.projected || 0,
  };
}

/**
 * Calculate total amount invested over the plan duration.
 */
export function calculateTotalInvested(plan: PlanData): number {
  return plan.monthlyInvestment * plan.planDuration * 12;
}

/**
 * Calculate life insurance coverage amount.
 * Coverage = total projected value + 20% buffer for the child's security.
 */
export function calculateInsuranceCoverage(plan: PlanData): number {
  const finalValue = calculateFinalValue(plan);
  return Math.round(finalValue * 1.2);
}

/**
 * Calculate monthly insurance premium (simplified).
 * Based on parent's age and coverage amount.
 */
export function calculateInsurancePremium(plan: PlanData): number {
  const coverage = calculateInsuranceCoverage(plan);
  const ageFactor = plan.parentAge > 40 ? 0.003 : plan.parentAge > 30 ? 0.002 : 0.0015;
  return Math.round((coverage * ageFactor) / 12);
}

/**
 * Get portfolio allocation details for a given risk level.
 * For "safe" plan type, the investment portion is only 40% of monthly amount.
 */
export function getPortfolioAllocation(plan: PlanData) {
  const allocation = PORTFOLIO_ALLOCATIONS[plan.riskLevel];
  const monthlyAmount =
    plan.planType === "safe"
      ? plan.monthlyInvestment * (SAFE_PLAN_SPLIT.investmentPercent / 100)
      : plan.monthlyInvestment;

  return [
    {
      name: "ABŞ ETF (S&P 500)",
      percentage: allocation.usaETF,
      amount: Math.round((monthlyAmount * allocation.usaETF) / 100),
      color: "#7F4CFF",
    },
    {
      name: "Qlobal İndeks Fondu",
      percentage: allocation.globalIndex,
      amount: Math.round((monthlyAmount * allocation.globalIndex) / 100),
      color: "#3EC6FF",
    },
    {
      name: "Texnologiya Fondu",
      percentage: allocation.techFund,
      amount: Math.round((monthlyAmount * allocation.techFund) / 100),
      color: "#f59e0b",
    },
  ];
}

/**
 * Predict university education costs in the future using inflation.
 */
export function predictEducationCosts(yearsUntil18: number): UniversityCost[] {
  const inflationMultiplier = Math.pow(1 + INFLATION_RATE, yearsUntil18);

  return [
    {
      region: "Azərbaycan",
      currentCost: 8000,
      projectedCost: Math.round(8000 * inflationMultiplier * 4),
    },
    {
      region: "Avropa",
      currentCost: 25000,
      projectedCost: Math.round(25000 * inflationMultiplier * 4),
    },
    {
      region: "ABŞ",
      currentCost: 45000,
      projectedCost: Math.round(45000 * inflationMultiplier * 4),
    },
  ];
}

/**
 * Calculate recommended monthly increase to meet education goal.
 */
export function calculateRecommendedIncrease(
  plan: PlanData,
  targetCost: number
): number {
  const currentProjected = calculateFinalValue(plan);
  const gap = targetCost - currentProjected;

  if (gap <= 0) return 0;

  const annualReturn = EXPECTED_RETURNS[plan.riskLevel] / 100;
  const monthlyReturn = annualReturn / 12;
  const totalMonths = plan.planDuration * 12;

  const fvFactor =
    (Math.pow(1 + monthlyReturn, totalMonths) - 1) / monthlyReturn;
  return Math.round(gap / fvFactor);
}

/**
 * Generate AI insights based on the plan data.
 */
export function generateAIInsights(plan: PlanData, lang: Lang = "az"): string[] {
  const finalValue = calculateFinalValue(plan);
  const totalInvested = calculateTotalInvested(plan);
  const profit = finalValue - totalInvested;
  const educationCosts = predictEducationCosts(plan.planDuration);

  const insights: string[] = [];
  const isEn = lang === "en";

  if (plan.planType === "safe") {
    const safe = calculateSafeFinalValues(plan);
    insights.push(
      isEn
        ? `You've selected the Safe plan. Over ${plan.planDuration} years, the savings portion will be ${safe.savingsValue.toLocaleString()} ₼, investment portion ${safe.investmentValue.toLocaleString()} ₼, for a total projection of ${safe.total.toLocaleString()} ₼.`
        : `Təhlükəsiz plan seçmisiniz. ${plan.planDuration} il ərzində yığım hissəsi ${safe.savingsValue.toLocaleString()} ₼, investisiya hissəsi ${safe.investmentValue.toLocaleString()} ₼ olmaqla ümumi ${safe.total.toLocaleString()} ₼ proqnozlaşdırılır.`
    );
  } else {
    insights.push(
      isEn
        ? `Your plan will generate approximately ${finalValue.toLocaleString()} ₼ over ${plan.planDuration} years with ${totalInvested.toLocaleString()} ₼ total investment. That's ${profit.toLocaleString()} ₼ net profit.`
        : `Planınız ${plan.planDuration} il ərzində ${totalInvested.toLocaleString()} ₼ investisiya ilə təxminən ${finalValue.toLocaleString()} ₼ gəlir gətirəcək. Bu, ${profit.toLocaleString()} ₼ xalis mənfəət deməkdir.`
    );
  }

  const azCost = educationCosts[0].projectedCost;
  if (finalValue >= azCost) {
    insights.push(
      isEn
        ? `The projected amount will be sufficient to cover full university costs in Azerbaijan (${azCost.toLocaleString()} ₼).`
        : `Proqnozlaşdırılan məbləğ Azərbaycanda universitetin tam xərclərini (${azCost.toLocaleString()} ₼) ödəmək üçün kifayət edəcək.`
    );
  } else {
    const gap = azCost - finalValue;
    insights.push(
      isEn
        ? `Full university cost in Azerbaijan will be ${azCost.toLocaleString()} ₼. There's a ${gap.toLocaleString()} ₼ gap with your plan. We recommend increasing your monthly investment.`
        : `Azərbaycanda universitetin tam xərci ${azCost.toLocaleString()} ₼ olacaq. Planınız ilə ${gap.toLocaleString()} ₼ fərq var. Aylıq investisiyanı artırmağı tövsiyə edirik.`
    );
  }

  if (plan.riskLevel === "high") {
    insights.push(
      isEn
        ? "You've selected a high-risk profile. Long-term high-risk investments offer greater return potential, but short-term fluctuations may occur."
        : "Yüksək risk profili seçmisiniz. Uzunmüddətli investisiyalarda yüksək risk daha çox gəlir potensialı verir, amma qısamüddətli dalğalanmalar ola bilər."
    );
  } else if (plan.riskLevel === "low") {
    insights.push(
      isEn
        ? "With a low-risk profile, your investment will be more stable. Consider switching to medium risk to increase return potential."
        : "Aşağı risk profili ilə investisiyanız daha stabil olacaq. Gəlir potensialını artırmaq üçün orta risk profilinə keçməyi düşünə bilərsiniz."
    );
  }

  const europeCost = educationCosts[1].projectedCost;
  if (finalValue < europeCost) {
    const increase = calculateRecommendedIncrease(plan, europeCost);
    if (increase > 0) {
      insights.push(
        isEn
          ? `For a European education plan, we recommend increasing your monthly investment by ${increase} ₼.`
          : `Avropada təhsil planı üçün aylıq investisiyanızı ${increase} ₼ artırmağınız tövsiyə olunur.`
      );
    }
  }

  return insights;
}

/**
 * Generate post-18 suggestions for the plan.
 */
export function generatePost18Suggestions(plan: PlanData, lang: Lang = "az") {
  const finalValue = calculateFinalValue(plan);
  const isEn = lang === "en";

  return [
    {
      title: isEn ? "Study abroad plan" : "Xaricdə təhsil planı",
      description: isEn
        ? `Plan a budget for a bachelor's degree in Europe or the US with ${finalValue.toLocaleString()} ₼.`
        : `${finalValue.toLocaleString()} ₼ ilə Avropa və ya ABŞ-da bakalavr təhsili üçün büdcə planlaşdırın.`,
      icon: "🎓",
    },
    {
      title: isEn ? "Continued investment plan" : "Davamlı investisiya planı",
      description: isEn
        ? "Continue investing without withdrawing. The amount could double by age 25."
        : "Toplanmış məbləği çıxarmadan investisiyaya davam edin. 25 yaşına qədər məbləğ 2x arta bilər.",
      icon: "📈",
    },
    {
      title: isEn ? "Start-up capital plan" : "Start-up kapital planı",
      description: isEn
        ? `${finalValue.toLocaleString()} ₼ can be used as start-up capital. It's sufficient to start a new company in the tech sector.`
        : `${finalValue.toLocaleString()} ₼ start-up kapitalı kimi istifadə edilə bilər. Texnologiya sektorunda yeni şirkət qurmaq üçün yetərlidir.`,
      icon: "🚀",
    },
  ];
}
