import s from './Chip.module.scss';
import { ReactNode } from 'react';
import { Typography } from '../Typography/Typography.tsx';

export const Chip = ({ value }: { value: ReactNode }) => {
  return (
    <div className={s.container}>
      <Typography className={s.lowercase} size="medium">
        {value}
      </Typography>
    </div>
  );
};
