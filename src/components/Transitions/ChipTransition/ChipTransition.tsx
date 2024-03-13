import { ReactNode, useRef } from 'react';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

import { ENUM_POSITIONS } from '@/constants/specifications.ts';

import s from './ChipTransition.module.scss';

export const ChipTransition = ({
  children,
  position,
}: {
  children: ReactNode;
  position: ENUM_POSITIONS;
}) => {
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
  return (
    <div data-position={position} className={`${s.container} bombay-chip-container`} ref={ref}>
      {children}
    </div>
  );
};
