import Decimal from 'decimal.js';

import { ENUM_POSITIONS, POSITIONS_MULTIPLIERS } from '@/constants/specifications.ts';

import { calculatePositionCount } from './calculatePositions.ts';

export const calculateReturn = (bets: Record<string, number>, position: ENUM_POSITIONS) => {
  const betsCount = calculatePositionCount(bets) as keyof typeof POSITIONS_MULTIPLIERS;
  if (betsCount < 1) return 0;
  const multiplier = POSITIONS_MULTIPLIERS[betsCount];

  if (multiplier) {
    const multiplierDecimal = new Decimal(multiplier);
    const betsPositionDecimal = new Decimal(bets[position]);
    const winReturnDecimal = multiplierDecimal.times(betsPositionDecimal).toNumber();
    return winReturnDecimal || 0;
  } else {
    return bets[position];
  }
};
