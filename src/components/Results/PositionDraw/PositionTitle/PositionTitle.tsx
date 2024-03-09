import s from './PositionTitle.module.scss';
import { Typography } from '../../../../UI/Typography/Typography.tsx';
import { TypeColor } from '../../../../UI/Buttons/ButtonPosition/ButtonPosition.tsx';
import { ReactNode } from 'react';
import { clsx } from 'clsx';
export const PositionTitle = ({
  text,
  className,
  color = 'white',
}: {
  text: ReactNode;
  color?: TypeColor;
  className?: string;
}) => {
  return (
    <div className={clsx(s.container, className)}>
      <Typography size="2xl" color={color}>
        {text}
      </Typography>
    </div>
  );
};
