import { useRef } from 'react';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

export const useDrawAnimation = () => {
  const computerRef = useRef<HTMLDivElement>(null);
  const vsRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap
      .timeline()
      .fromTo(computerRef.current, { yPercent: -200, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.5 })
      .fromTo(vsRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 })
      .fromTo(playerRef.current, { yPercent: 200, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.5 });
  });
  return { computerRef, vsRef, playerRef };
};
