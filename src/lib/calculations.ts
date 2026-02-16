/**
 * Financial calculation utilities for the Child Investment Plan.
 * Uses simplified simulation formulas suitable for an MVP demo.
 */

import {
  PlanData,
  ProjectionPoint,
  EXPECTED_RETURNS,
  PORTFOLIO_ALLOCATIONS,
  UniversityCost,
} from "./types";

/** Average annual inflation rate used in calculations */
const INFLATION_RATE = 0.05;

/**
 * Calculate projected investment growth over the plan duration.
 * Uses compound interest formula with monthly contributions.
 */
export function calculateProjection(plan: PlanData): ProjectionPoint[] {
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

    // Add 12 months of contributions and growth
    for (let month = 0; month < 12; month++) {
      currentValue = (currentValue + plan.monthlyInvestment) * (1 + monthlyReturn);
      totalInvested += plan.monthlyInvestment;
    }
  }

  return points;
}

/**
 * Calculate the final projected value at end of plan.
 */
export function calculateFinalValue(plan: PlanData): number {
  const projection = calculateProjection(plan);
  return projection[projection.length - 1]?.projected || 0;
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
 */
export function getPortfolioAllocation(plan: PlanData) {
  const allocation = PORTFOLIO_ALLOCATIONS[plan.riskLevel];
  const monthlyAmount = plan.monthlyInvestment;

  return [
    {
      name: "ABŞ ETF (S&P 500)",
      percentage: allocation.usaETF,
      amount: Math.round((monthlyAmount * allocation.usaETF) / 100),
      color: "#6366f1",
    },
    {
      name: "Qlobal İndeks Fondu",
      percentage: allocation.globalIndex,
      amount: Math.round((monthlyAmount * allocation.globalIndex) / 100),
      color: "#06b6d4",
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
      projectedCost: Math.round(8000 * inflationMultiplier * 4), // 4-year degree
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

  // Calculate additional monthly needed using future value of annuity formula
  const fvFactor =
    (Math.pow(1 + monthlyReturn, totalMonths) - 1) / monthlyReturn;
  return Math.round(gap / fvFactor);
}

/**
 * Generate AI insights based on the plan data.
 */
export function generateAIInsights(plan: PlanData): string[] {
  const finalValue = calculateFinalValue(plan);
  const totalInvested = calculateTotalInvested(plan);
  const profit = finalValue - totalInvested;
  const educationCosts = predictEducationCosts(plan.planDuration);

  const insights: string[] = [];

  // Profit insight
  insights.push(
    `Planınız ${plan.planDuration} il ərzində ${totalInvested.toLocaleString()} $ investisiya ilə təxminən ${finalValue.toLocaleString()} $ gəlir gətirəcək. Bu, ${profit.toLocaleString()} $ xalis mənfəət deməkdir.`
  );

  // Education coverage insight
  const azCost = educationCosts[0].projectedCost;
  if (finalValue >= azCost) {
    insights.push(
      `Proqnozlaşdırılan məbləğ Azərbaycanda universitetin tam xərclərini (${azCost.toLocaleString()} $) ödəmək üçün kifayət edəcək.`
    );
  } else {
    const gap = azCost - finalValue;
    insights.push(
      `Azərbaycanda universitetin tam xərci ${azCost.toLocaleString()} $ olacaq. Planınız ilə ${gap.toLocaleString()} $ fərq var. Aylıq investisiyanı artırmağı tövsiyə edirik.`
    );
  }

  // Risk-specific insight
  if (plan.riskLevel === "high") {
    insights.push(
      "Yüksək risk profili seçmisiniz. Uzunmüddətli investisiyalarda yüksək risk daha çox gəlir potensialı verir, amma qısamüddətli dalğalanmalar ola bilər."
    );
  } else if (plan.riskLevel === "low") {
    insights.push(
      "Aşağı risk profili ilə investisiyanız daha stabil olacaq. Gəlir potensialını artırmaq üçün orta risk profilinə keçməyi düşünə bilərsiniz."
    );
  }

  // Monthly increase suggestion
  const europeCost = educationCosts[1].projectedCost;
  if (finalValue < europeCost) {
    const increase = calculateRecommendedIncrease(plan, europeCost);
    if (increase > 0) {
      insights.push(
        `Avropada təhsil planı üçün aylıq investisiyanızı ${increase} $ artırmağınız tövsiyə olunur.`
      );
    }
  }

  return insights;
}

/**
 * Generate post-18 suggestions for the plan.
 */
export function generatePost18Suggestions(plan: PlanData) {
  const finalValue = calculateFinalValue(plan);

  return [
    {
      title: "Xaricdə təhsil planı",
      description: `${finalValue.toLocaleString()} $ ilə Avropa və ya ABŞ-da bakalavr təhsili üçün büdcə planlaşdırın.`,
      icon: "🎓",
    },
    {
      title: "Davamlı investisiya planı",
      description:
        "Toplanmış məbləği çıxarmadan investisiyaya davam edin. 25 yaşına qədər məbləğ 2x arta bilər.",
      icon: "📈",
    },
    {
      title: "Start-up kapital planı",
      description: `${finalValue.toLocaleString()} $ start-up kapitalı kimi istifadə edilə bilər. Texnologiya sektorunda yeni şirkət qurmaq üçün yetərlidir.`,
      icon: "🚀",
    },
  ];
}
