import { memo, ReactNode } from 'react';

import { clsx } from 'clsx';

import { TypeColor } from '../Buttons/ButtonPosition/ButtonPosition.tsx';
import s from './Typography.module.scss';

type TypeTypography = 'h3' | 'h2' | 'h1' | 'div' | 'span';
type TypeSize = 'small' | 'medium' | 'large' | 'xl' | '2xl';
export const Typography = memo(
  ({
    as = 'div',
    children,
    color,
    size = 'small',
    className,
  }: {
    as?: TypeTypography;
    children: ReactNode;
    color?: TypeColor;
    size?: TypeSize;
    className?: string;
  }) => {
    const Tag = as;
    return (
      <Tag
        className={clsx(
          s.text,
          size === 'small' && s.small,
          size === 'medium' && s.medium,
          size === 'large' && s.large,
          size === 'xl' && s.xl,
          size === '2xl' && s.xl2,
          color === 'brown' && s.brown,
          color === 'white' && s.white,
          color === 'green' && s.green,
          color === 'blue' && s.blue,
          color === 'red' && s.red,
          className,
        )}
      >
        {children}
      </Tag>
    );
  },
);
