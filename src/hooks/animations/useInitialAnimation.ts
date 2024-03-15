import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

import { ENUM_ELEMENT_SELECTORS } from '@/constants/elementSelectors.ts';

export const useInitialAnimation = () => {
  useGSAP(() => {
    gsap
      .timeline()
      .fromTo(
        `#${ENUM_ELEMENT_SELECTORS.header}`,
        { yPercent: -100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.5 },
      )
      .fromTo(
        `#${ENUM_ELEMENT_SELECTORS.pickPositions}`,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
      )
      .fromTo(
        `.${ENUM_ELEMENT_SELECTORS.position}`,
        { scale: 0.8, opacity: 0, pointerEvents: 'none' },
        { scale: 1, opacity: 1, duration: 0.5, pointerEvents: 'auto', stagger: 0.15 },
      )
      .fromTo(
        `#${ENUM_ELEMENT_SELECTORS.playContainer}`,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
      );
  });
};
