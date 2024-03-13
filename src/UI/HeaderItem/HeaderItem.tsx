import { ReactNode } from 'react';

import { clsx } from 'clsx';

import { Typography } from '@/UI/Typography/Typography.tsx';

import s from './HeaderItem.module.scss';

export const HeaderItem = ({
  title,
  counter,
  className,
}: {
  title: ReactNode;
  counter: ReactNode;
  className?: string;
}) => {
  return (
    <div className={clsx(s.container, className)}>
      <Typography as="span" color="brown">
        {title}:{' '}
      </Typography>
      {counter}
    </div>
  );
};
