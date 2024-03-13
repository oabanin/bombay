export const calculatePositionCount = (bets: Record<string, number>) => {
  return Object.values(bets).map((item) => item > 0).length;
};
