import { memo, ReactNode } from 'react';

import { clsx } from 'clsx';

import s from './Typography.module.scss';

export type TypeColor = 'red' | 'green' | 'blue' | 'brown' | 'white';
type TypeTypography = 'h3' | 'h2' | 'h1' | 'div' | 'span';
type TypeSize = 'small' | 'medium' | 'large' | 'xl' | '2xl' | '3xl' | '4xl';
type TypeFont = 'primary' | 'secondary';
export const Typography = memo(
  ({
    as = 'div',
    children,
    color,
    size = 'small',
    font = 'primary',
    className,
  }: {
    as?: TypeTypography;
    children: ReactNode;
    color?: TypeColor;
    size?: TypeSize;
    font?: TypeFont;
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
          size === '3xl' && s.xl3,
          size === '4xl' && s.xl4,
          color === 'brown' && s.brown,
          color === 'white' && s.white,
          color === 'green' && s.green,
          color === 'blue' && s.blue,
          color === 'red' && s.red,
          font === 'secondary' && s.fontSecondary,
          className,
        )}
      >
        {children}
      </Tag>
    );
  },
);
