import { gsap } from 'gsap';

export const pickPositionsHide = async () =>
  gsap.to('#bombay-pick-positions', {
    duration: 0.3,
    opacity: 0,
    yPercent: 100,
  });

export const pickPositionsShow = async () =>
  gsap.fromTo(
    '#bombay-pick-positions',
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
