import { gsap } from 'gsap';

import { ENUM_ELEMENT_SELECTORS } from '@/constants/elementSelectors.ts';

export const playButtonTimeline = async () =>
  gsap
    .timeline()
    .to(`#${ENUM_ELEMENT_SELECTORS.playContainer}`, {
      scale: 0.85,
      duration: 0.1,
    })
    .to(`#${ENUM_ELEMENT_SELECTORS.playContainer}`, { scale: 1, duration: 0.1 });
