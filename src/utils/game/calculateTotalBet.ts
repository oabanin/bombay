import numeral from 'numeral';

export const calculateTotalBet = (bets: Record<string, number>) => {
  const total = Object.values(bets).reduce((acc, value) => numeral(acc).add(value).value() || 0, 0);
  return numeral(total).value() || 0;
};
