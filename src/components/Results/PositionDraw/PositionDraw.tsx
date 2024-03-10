import s from './PositionDraw.module.scss';
import { Typography } from '../../../UI/Typography/Typography.tsx';
import { PositionTitle } from './PositionTitle/PositionTitle.tsx';
import { ENUM_GAME_STATE, POSITION_ITEMS } from '../../../constants/specifications.ts';
import { useSelector } from 'react-redux';
import { selectComputerPosition, selectPlayerPosition, selectGameState } from '../../../store/selectors.ts';
import { useMemo } from 'react';

export const PositionDraw = () => {
  const gameState = useSelector(selectGameState);
  const computerPosition = useSelector(selectComputerPosition);
  const { position, result } = useSelector(selectPlayerPosition);

  const color = useMemo(() => {
    return POSITION_ITEMS.find((item) => item.text === position);
  }, [position]);

  return (
    <div className={s.container}>
      {gameState === ENUM_GAME_STATE.game && computerPosition && (
        <div className={s.draw}>
          <PositionTitle className={s.computerPosition} text={computerPosition} />
          <Typography className={s.vs} size="2xl" color="brown">
            vs
          </Typography>
          <PositionTitle className={s.playerPosition} text={position} />
        </div>
      )}
      {gameState === ENUM_GAME_STATE.result && (
        <Typography color={color?.color} size="2xl">
          {position} {result}
        </Typography>
      )}
    </div>
  );
};
