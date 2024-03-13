import { ReactNode } from 'react';

import s from './ButtonPlay.module.scss';

export const ButtonPlay = ({
  children,
  onClick,
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) => {
  return (
    <button disabled={disabled} className={s.container} onClick={onClick}>
      {children}
    </button>
  );
};
