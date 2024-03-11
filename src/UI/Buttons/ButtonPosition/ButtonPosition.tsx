import { memo } from 'react';

import { clsx } from 'clsx';

import { Chip } from '../../Chip/Chip.tsx';
import { TypeColor, Typography } from '../../Typography/Typography.tsx';
import s from './ButtonPosition.module.scss';

export const ButtonPosition = memo(
  ({
    text,
    bet,
    disabled,
    active,
    onClick,
    color = 'green',
  }: {
    text: string;
    bet?: string;
    active?: boolean;
    disabled?: boolean;
    onClick?: (value: string) => void;
    color?: Extract<TypeColor, 'green' | 'blue' | 'red'>;
  }) => {
    return (
      <button
        id="bombay-position"
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
        <Typography font="secondary" color={color} size="2xl" className={s.text}>
          {text}
        </Typography>
      </button>
    );
  },
);
