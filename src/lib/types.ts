/** Core type definitions for the Child Investment Plan application */

/** Risk level options for the investment plan */
export type RiskLevel = "low" | "medium" | "high";

/** Plan type: "standard" = 100% investment, "safe" = split savings + investment */
export type PlanType = "standard" | "safe";

/** Risk level labels in Azerbaijani */
export const RISK_LABELS: Record<RiskLevel, string> = {
  low: "Aşağı risk",
  medium: "Orta risk",
  high: "Yüksək risk",
};

/** Risk level colors for UI */
export const RISK_COLORS: Record<RiskLevel, string> = {
  low: "#10b981",
  medium: "#f59e0b",
  high: "#ef4444",
};

/** Plan type labels in Azerbaijani */
export const PLAN_TYPE_LABELS: Record<PlanType, string> = {
  standard: "Standart (İnvestisiya əsaslı)",
  safe: "Təhlükəsiz (Yığım + İnvestisiya)",
};

/** Plan type short labels for dashboard */
export const PLAN_TYPE_SHORT_LABELS: Record<PlanType, string> = {
  standard: "Standart",
  safe: "Təhlükəsiz",
};

/** Split percentages for the "safe" plan type */
export const SAFE_PLAN_SPLIT = {
  savingsPercent: 60,
  investmentPercent: 40,
} as const;

/** Fixed annual interest rate for the savings bucket in "safe" plan (demo) */
export const SAFE_SAVINGS_ANNUAL_RATE = 0.05;

/** Portfolio allocation percentages per risk level */
export const PORTFOLIO_ALLOCATIONS: Record<
  RiskLevel,
  { usaETF: number; globalIndex: number; techFund: number }
> = {
  low: { usaETF: 60, globalIndex: 30, techFund: 10 },
  medium: { usaETF: 40, globalIndex: 35, techFund: 25 },
  high: { usaETF: 25, globalIndex: 25, techFund: 50 },
};

/** Expected annual returns per risk level (%) */
export const EXPECTED_RETURNS: Record<RiskLevel, number> = {
  low: 6,
  medium: 9,
  high: 13,
};

/** The plan data created during the wizard flow */
export interface PlanData {
  parentAge: number;
  childAge: number;
  planDuration: number;
  monthlyInvestment: number;
  riskLevel: RiskLevel;
  planType: PlanType;
}

/** Projection data point for charts */
export interface ProjectionPoint {
  year: number;
  age: number;
  invested: number;
  projected: number;
}

/** Projection data point for the "safe" plan with split buckets */
export interface SafeProjectionPoint extends ProjectionPoint {
  savingsValue: number;
  investmentValue: number;
}

/** University cost data for AI advisor */
export interface UniversityCost {
  region: string;
  currentCost: number;
  projectedCost: number;
}
