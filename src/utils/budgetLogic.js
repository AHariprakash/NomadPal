import { convertBudget } from "./currencyUtils";

export function calculateDailyBudget(groupType, budgetLevel, currency) {
  const base = {
    couple: 100,
    family: 200,
    friends: 150,
    school: 300,
  };

  const multiplier = {
    low: 0.8,
    mid: 1.0,
    luxury: 1.5,
  };

  const usd = base[groupType] * multiplier[budgetLevel];
  return convertBudget(usd, currency);
}
