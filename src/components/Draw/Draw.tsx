import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { ENUM_GAME_STATE, POSITION_ITEMS } from '../../constants/specifications.ts';
import { selectComputerPosition, selectGameState, selectPlayerPosition } from '../../store/selectors.ts';
import { PositionTitle } from '../../UI/PositionTitle/PositionTitle.tsx';
import { Typography } from '../../UI/Typography/Typography.tsx';
import s from './Draw.module.scss';

export const Draw = memo(() => {
  const gameState = useSelector(selectGameState);
  if (gameState === ENUM_GAME_STATE.game) return <DrawTitle />;
  if (gameState === ENUM_GAME_STATE.result) return <DrawResult />;
  return null;
});

const DrawTitle = () => {
  const computerPosition = useSelector(selectComputerPosition);
  const { position } = useSelector(selectPlayerPosition);

  if (!computerPosition) return null;
  return (
    <div className={s.draw}>
      <PositionTitle className={s.computerPosition} text={computerPosition} />
      <Typography className={s.vs} size="2xl" color="brown">
        vs
      </Typography>
      <PositionTitle className={s.playerPosition} text={position} />
    </div>
  );
};

const DrawResult = () => {
  const { position, result } = useSelector(selectPlayerPosition);

  const color = useMemo(() => {
    return POSITION_ITEMS.find((item) => item.text === position);
  }, [position]);
  return (
    <Typography color={color?.color} size="2xl">
      {position} {result}
    </Typography>
  );
};
