import s from './PositionDraw.module.scss';
import { Typography } from '../../../UI/Typography/Typography.tsx';
import { PositionTitle } from './PositionTitle/PositionTitle.tsx';
import { EPOSITIONS } from '../../../constants/specifications.ts';

export const PositionDraw = () => {
  const isDraw = false;
  return (
    <div className={s.container}>
      {isDraw ? (
        <div className={s.draw}>
          <PositionTitle className={s.computerPosition} text={EPOSITIONS.scissors} />
          <Typography className={s.vs} size="2xl" color="brown">
            vs
          </Typography>
          <PositionTitle className={s.playerPosition} text={EPOSITIONS.paper} />
        </div>
      ) : (
        <Typography color="green" size="2xl">
          {`${EPOSITIONS.paper} won`}
        </Typography>
      )}
    </div>
  );
};
