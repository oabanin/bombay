import { gsap } from 'gsap';

import { ENUM_ELEMENT_SELECTORS } from '@/constants/elementSelectors.ts';

export const pickPositionsHide = async () =>
  gsap.to(`#${ENUM_ELEMENT_SELECTORS.pickPositions}`, {
    duration: 0.3,
    opacity: 0,
    yPercent: 100,
  });

export const pickPositionsShow = async () =>
  gsap.fromTo(
    `#${ENUM_ELEMENT_SELECTORS.pickPositions}`,
    {
      opacity: 0,
      yPercent: 100,
    },
    {
      opacity: 1,
      yPercent: 0,
      duration: 0.3,
    },
  );
