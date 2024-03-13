import { gsap } from 'gsap';

import { ENUM_ELEMENT_SELECTORS } from '@/constants/elementSelectors.ts';
import { ENUM_POSITIONS } from '@/constants/specifications.ts';

export const chipNotAllowed = async (position: ENUM_POSITIONS) => {
  const betNode = document.querySelector(
    `.${ENUM_ELEMENT_SELECTORS.chipContainer}[data-position="${position}"]`,
  );
  if (!betNode) return;

  return gsap
    .timeline()
    .to(betNode, { duration: 0.05, xPercent: 7 })
    .to(betNode, { duration: 0.05, xPercent: -7 })
    .to(betNode, { duration: 0.05, xPercent: 0 });
};
