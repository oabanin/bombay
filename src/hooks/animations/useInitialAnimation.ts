import { useEffect } from 'react';

import { gsap } from 'gsap';

export const useInitialAnimation = () => {
  useEffect(() => {
    const timeline = gsap.timeline();
    timeline
      .fromTo('#bombay-header', { y: -25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 })
      .fromTo('#bombay-position', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, stagger: 0.15 })
      .fromTo('#bombay-play-container', { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 })
      .fromTo('#bombay-pick-positions', { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 });
  }, []);
};