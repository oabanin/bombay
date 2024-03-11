import { ReactNode, useEffect, useRef } from 'react';

import { gsap } from 'gsap';

import s from './ChipTransition.module.scss';
export const ChipTransition = ({ children }: { children: ReactNode }) => {
  const ref = useRef(null);
  useEffect(() => {
    (async () => {
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
    })();
  }, []);
  return (
    <div className={`${s.container} bombay-chip-container`} ref={ref}>
      {children}
    </div>
  );
};
