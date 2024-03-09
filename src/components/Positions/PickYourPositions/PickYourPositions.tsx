import s from './PickYourPositions.module.scss';
import { Typography } from '../../../UI/Typography/Typography.tsx';

export const PickYourPositions = () => {
  const isShowPickPositions = true;
  return (
    <div className={s.container}>
      {isShowPickPositions && <Typography color="brown">Pick your positions</Typography>}
    </div>
  );
};
