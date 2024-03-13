import { useRef } from 'react';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

export const useResultsAnimation = () => {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.fromTo(ref.current, { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'sine.inOut' });
  });
  return ref;
};
