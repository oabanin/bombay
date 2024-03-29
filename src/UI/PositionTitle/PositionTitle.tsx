import { ReactNode } from 'react';

import { TypeColor } from '@/UI/Typography/Typography.tsx';
import { Typography } from '@/UI/Typography/Typography.tsx';

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
    <div className={className}>
      <Typography size="4xl" color={color}>
        {text}
      </Typography>
    </div>
  );
};
