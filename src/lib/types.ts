/** Core type definitions for the Child Investment Plan application */

/** Risk level options for the investment plan */
export type RiskLevel = "low" | "medium" | "high";

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
}

/** Projection data point for charts */
export interface ProjectionPoint {
  year: number;
  age: number;
  invested: number;
  projected: number;
}

/** University cost data for AI advisor */
export interface UniversityCost {
  region: string;
  currentCost: number;
  projectedCost: number;
}
