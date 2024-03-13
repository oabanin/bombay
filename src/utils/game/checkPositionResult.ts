import { ENUM_POSITIONS, ENUM_RESULTS } from '@/constants/specifications.ts';

import { calculatePositionCount } from './calculatePositions.ts';

export const checkPositionResult = (result: ENUM_RESULTS, bets: Record<ENUM_POSITIONS, number>) => {
  const isTie = result === ENUM_RESULTS.tie;
  return result === ENUM_RESULTS.win || (isTie && calculatePositionCount(bets) === 1);
};
