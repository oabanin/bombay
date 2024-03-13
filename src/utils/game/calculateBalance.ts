import numeral from 'numeral';

export const calculateBalance = (balance: number, totalBet: number) => {
  return numeral(balance).subtract(totalBet).value() || 0;
};
