import { Typography } from '../Typography/Typography.tsx';
import s from './Chip.module.scss';

export const Chip = ({ value }: { value: string }) => {
  return (
    <div className={s.container}>
      <Typography font="secondary" size={value.length < 4 ? 'medium' : 'small'}>
        {value}
      </Typography>
    </div>
  );
};
