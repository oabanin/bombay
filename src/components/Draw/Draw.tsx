import { useSelector } from 'react-redux';

import {
  ENUM_GAME_STATE,
  ENUM_RESULTS,
  POSITION_RESULT_COLORS,
} from '@/constants/specifications.ts';
import { useDrawAnimation } from '@/hooks/animations/useDrawAnimation.ts';
import { useResultsAnimation } from '@/hooks/animations/useResultsAnimation.ts';
import {
  selectComputerPosition,
  selectGameState,
  selectPlayerPosition,
} from '@/store/selectors.ts';
import { PositionTitle } from '@/UI/PositionTitle/PositionTitle.tsx';
import { Typography } from '@/UI/Typography/Typography.tsx';

import s from './Draw.module.scss';

export const Draw = () => {
  const gameState = useSelector(selectGameState);
  if (gameState === ENUM_GAME_STATE.game) return <DrawTitle />;
  if (gameState === ENUM_GAME_STATE.result) return <DrawResult />;
  return null;
};

const DrawTitle = () => {
  const computerPosition = useSelector(selectComputerPosition);
  const { position } = useSelector(selectPlayerPosition);
  const { computerRef, vsRef, playerRef } = useDrawAnimation();

  if (!computerPosition) return null;

  return (
    <div className={s.draw}>
      <div ref={computerRef}>
        <PositionTitle className={s.computerPosition} text={computerPosition} />
      </div>
      <div ref={vsRef}>
        <Typography className={s.vs} size="4xl" color="brown">
          vs
        </Typography>
      </div>
      <div ref={playerRef}>
        <PositionTitle className={s.playerPosition} text={position} />
      </div>
    </div>
  );
};

const DrawResult = () => {
  const { position, result } = useSelector(selectPlayerPosition);
  const ref = useResultsAnimation();

  let text = '';
  switch (result) {
    case ENUM_RESULTS.lose:
      text = 'lost';
      break;
    case ENUM_RESULTS.win:
      text = 'won';
      break;
    case ENUM_RESULTS.tie:
      text = 'tie';
      break;
  }

  return (
    <div ref={ref}>
      <Typography color={POSITION_RESULT_COLORS[result]} size="4xl">
        {position} {text}
      </Typography>
    </div>
  );
};
