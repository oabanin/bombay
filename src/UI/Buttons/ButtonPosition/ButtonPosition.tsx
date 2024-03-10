import s from './ButtonPosition.module.scss';

import { Chip } from '../../Chip/Chip.tsx';
import { clsx } from 'clsx';
import { Typography } from '../../Typography/Typography.tsx';
import { ReactNode } from 'react';

export type TypeColor = 'red' | 'green' | 'blue' | 'brown' | 'white';
export const ButtonPosition = ({
  text,
  bet,
  disabled,
  active,
  onClick,
  color = 'green',
}: {
  text: string;
  bet: ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick?: (value: string) => void;
  color?: TypeColor;
}) => {
  return (
    <button
      onClick={() => onClick && onClick(text)}
      disabled={disabled}
      className={clsx(
        s.container,
        color === 'green' && s.green,
        color === 'blue' && s.blue,
        color === 'red' && s.red,
        active && s.active,
      )}
    >
      <div className={s.chipContainer}>{bet && <Chip value={bet} />}</div>
      <Typography color={color} size="large" className={s.text}>
        {text}
      </Typography>
    </button>
  );
};
