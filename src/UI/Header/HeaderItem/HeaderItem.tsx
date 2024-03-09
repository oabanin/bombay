import { ReactNode } from 'react';
import s from './HeaderItem.module.scss';
import { Typography } from '../../Typography/Typography.tsx';
import { clsx } from 'clsx';
export const HeaderItem = ({ title, value, className }: { title: ReactNode; value: ReactNode; className?: string }) => {
  return (
    <div className={clsx(s.container, className)}>
      <Typography as="span" color="brown">
        {title}:{' '}
      </Typography>
      <Typography as="span" color="white">
        {value}
      </Typography>
    </div>
  );
};
