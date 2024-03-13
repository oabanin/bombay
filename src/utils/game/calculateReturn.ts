import numeral from 'numeral';

import { ENUM_POSITIONS, POSITIONS_MULTIPLIERS } from '@/constants/specifications.ts';

import { calculatePositionCount } from './calculatePositions.ts';

export const calculateReturn = (bets: Record<string, number>, position: ENUM_POSITIONS) => {
  const betsCount = calculatePositionCount(bets) as keyof typeof POSITIONS_MULTIPLIERS;
  if (betsCount < 1) return 0;
  const multiplier = POSITIONS_MULTIPLIERS[betsCount];
  const winReturn = numeral(multiplier).multiply(bets[position]).value();
  return multiplier ? winReturn || 0 : bets[position];
};
