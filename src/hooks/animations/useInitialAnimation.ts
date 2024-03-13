import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

export const useInitialAnimation = () => {
  useGSAP(() => {
    gsap
      .timeline()
      .fromTo(
        '#bombay-header',
        { yPercent: -100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.5 },
      )
      .fromTo('#bombay-pick-positions', { opacity: 0 }, { opacity: 1, duration: 0.5 })
      .fromTo(
        '.bombay-position',
        { scale: 0.8, opacity: 0, pointerEvents: 'none' },
        { scale: 1, opacity: 1, duration: 0.5, pointerEvents: 'auto', stagger: 0.15 },
      )
      .fromTo('#bombay-play-container', { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 });
  });
};
