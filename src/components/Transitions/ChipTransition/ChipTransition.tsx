import { memo, ReactNode } from 'react';

import { ENUM_ELEMENT_SELECTORS } from '@/constants/elementSelectors.ts';
import { ENUM_POSITIONS } from '@/constants/specifications.ts';
import { useChipTransition } from '@/hooks/animations/useChipTransition.tsx';

import s from './ChipTransition.module.scss';

export const ChipTransition = memo(
  ({ children, position }: { children: ReactNode; position: ENUM_POSITIONS }) => {
    const ref = useChipTransition();
    return (
      <div
        data-position={position}
        className={`${s.container} ${ENUM_ELEMENT_SELECTORS.chipContainer}`}
        ref={ref}
      >
        {children}
      </div>
    );
  },
);
