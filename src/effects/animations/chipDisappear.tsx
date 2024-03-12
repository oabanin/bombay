import { gsap } from 'gsap';

import { ENUM_POSITIONS, ENUM_RESULTS } from '../../constants/specifications.ts';
import { checkPositionResult } from '../../utils/checkPositionResult.ts';

const options = { duration: 0.3, opacity: 0 };
export const chipDisappear = async (
  result: ENUM_RESULTS,
  position: ENUM_POSITIONS,
  bets: Record<ENUM_POSITIONS, number>,
) => {
  const isWin = checkPositionResult(result, bets);
  const resultBet = gsap.to(`.bombay-chip-container[data-position="${position}"]`, {
    ...options,
    yPercent: `${isWin ? '' : '-'}200`,
  });
  const otherBets = gsap.to(`.bombay-chip-container:not([data-position="${position}"])`, {
    ...options,
    yPercent: `-200`,
  });
  return Promise.all([resultBet, otherBets]);
};
