import s from './Results.module.scss';
import { Typography } from '../../UI/Typography/Typography.tsx';
import { PositionDraw } from './PositionDraw/PositionDraw.tsx';

export const Results = () => {
  const isShowWin = false;
  return (
    <div className={s.container}>
      <PositionDraw />
      <div className={s.results}>
        {isShowWin && (
          <>
            <Typography as="span" size="large" color="brown">
              You win
            </Typography>{' '}
            <Typography as="span" size="large" color="white">
              XXX.XX
            </Typography>
          </>
        )}
      </div>
    </div>
  );
};
