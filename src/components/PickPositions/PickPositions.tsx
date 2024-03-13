import { memo } from 'react';
import { useSelector } from 'react-redux';

import { ENUM_GAME_STATE } from 'constants/specifications.ts';
import { useAppSelector } from 'store/hooks.ts';
import { selectBalance, selectGameState } from 'store/selectors.ts';
import { Typography } from 'UI/Typography/Typography.tsx';

export const PickPositions = memo(() => {
  const gameState = useSelector(selectGameState);
  if (gameState === ENUM_GAME_STATE.placeBet) return <Text />;
  return null;
});

const Text = () => {
  const balance = useAppSelector(selectBalance);
  if (balance > 0) {
    return <PickPositionsText />;
  }
  return <Typography color="brown">Your balance is empty</Typography>;
};

const PickPositionsText = () => {
  return <Typography color="brown">Pick your positions</Typography>;
};
