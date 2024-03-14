import { gsap } from 'gsap';

import { ENUM_ELEMENT_SELECTORS } from '@/constants/elementSelectors.ts';
import { ENUM_POSITIONS, ENUM_RESULTS } from '@/constants/specifications.ts';
import { GameUtils } from '@/utils/game/gameUtils.ts';

const options = { duration: 0.3, opacity: 0 };

export const chipDisappear = async (
  result: ENUM_RESULTS,
  position: ENUM_POSITIONS,
  bets: Record<ENUM_POSITIONS, number>,
) => {
  const isWin = GameUtils.checkPositionResult(result, bets);

  const resultBet = gsap.to(
    `.${ENUM_ELEMENT_SELECTORS.chipContainer}[data-position="${position}"]`,
    {
      ...options,
      yPercent: `${isWin ? '' : '-'}200`,
    },
  );

  const otherBetsNodes = document.querySelectorAll(
    `.${ENUM_ELEMENT_SELECTORS.chipContainer}:not([data-position="${position}"])`,
  );

  if (otherBetsNodes.length > 0) {
    const otherBets = gsap.to(otherBetsNodes, {
      ...options,
      yPercent: `-200`,
    });

    return Promise.all([resultBet, otherBets]);
  }

  return resultBet;
};
