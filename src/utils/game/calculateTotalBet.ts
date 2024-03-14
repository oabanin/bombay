import Decimal from 'decimal.js';

export const calculateTotalBet = (bets: Record<string, number>) => {
  const total = Object.values(bets).reduce((acc, value) => {
    const decimalAcc = new Decimal(acc);
    const decimalValue = new Decimal(value);
    return decimalAcc.plus(decimalValue).toNumber();
  }, 0);

  return new Decimal(total).toNumber() || 0;
};
