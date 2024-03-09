import s from './ButtonPosition.module.scss';
import { ReactNode } from 'react';
import { Chip } from '../../Chip/Chip.tsx';
import { clsx } from 'clsx';
import { Typography } from '../../Typography/Typography.tsx';

export type TypeColor = 'red' | 'green' | 'blue' | 'brown' | 'white';
export const ButtonPosition = ({
  text,
  value,
  disabled,
  active,
  onClick,
  color = 'green',
}: {
  text: ReactNode;
  value: number;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  color?: TypeColor;
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        s.container,
        color === 'green' && s.green,
        color === 'blue' && s.blue,
        color === 'red' && s.red,
        active && s.active,
      )}
    >
      <div className={s.chipContainer}>{value && <Chip value={value} />}</div>
      <Typography color={color} size="large" className={s.text}>
        {text}
      </Typography>
    </button>
  );
};
