import { memo, ReactNode } from 'react';

import { clsx } from 'clsx';

import { TypeColor, Typography } from '@/UI/Typography/Typography.tsx';

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
    bet?: ReactNode;
    active?: boolean;
    disabled?: boolean;
    onClick?: (value: string) => void;
    color?: Extract<TypeColor, 'green' | 'blue' | 'red'>;
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
        <div className={s.chipContainer}>{bet}</div>
        <Typography font="secondary" color={color} size="2xl" className={s.text}>
          {text}
        </Typography>
      </button>
    );
  },
);
