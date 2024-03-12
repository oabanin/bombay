import { gsap } from 'gsap';

export const playButtonTimeline = async () =>
  gsap
    .timeline()
    .to('#bombay-play-container', {
      scale: 0.85,
      duration: 0.1,
    })
    .to('#bombay-play-container', { scale: 1, duration: 0.1 });
