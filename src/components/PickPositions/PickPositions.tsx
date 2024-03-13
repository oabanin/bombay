import { memo } from 'react';
import { useSelector } from 'react-redux';

import { ENUM_GAME_STATE } from 'constants/specifications.ts';
import { selectGameState } from 'store/selectors.ts';
import { Typography } from 'UI/Typography/Typography.tsx';

export const PickPositions = memo(() => {
  const gameState = useSelector(selectGameState);
  if (gameState === ENUM_GAME_STATE.placeBet) return <PickPositionsText />;
  return null;
});

const PickPositionsText = () => {
  return <Typography color="brown">Pick your positions</Typography>;
};
