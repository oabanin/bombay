import Decimal from 'decimal.js';

export const calculateBalance = (balance: number, totalBet: number) => {
  const balanceDecimal = new Decimal(balance);
  const totalBetDecimal = new Decimal(totalBet);
  return balanceDecimal.minus(totalBetDecimal).toNumber() || 0;
};
