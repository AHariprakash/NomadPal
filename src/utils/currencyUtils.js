const exchangeRates = {
  USD: 1,
  INR: 83,
  EUR: 0.93,
  JPY: 157,
  GBP: 0.79,
};

export function convertBudget(usdAmount, currency) {
  const rate = exchangeRates[currency] || 1;
  return Math.round(usdAmount * rate);
}
