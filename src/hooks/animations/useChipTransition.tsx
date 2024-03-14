import { useRef } from 'react';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

export const useChipTransition = () => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(async () => {
    await gsap.fromTo(
      ref.current,
      {
        opacity: 0,
        yPercent: 300,
      },
      {
        opacity: 1,
        yPercent: 0,
        duration: 0.1,
      },
    );
  });
  return ref;
};
