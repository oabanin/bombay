import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

import Decimal from 'decimal.js';

import { ENUM_GAME_STATE, ENUM_RESULTS } from '@/constants/specifications.ts';
import { resultSound } from '@/effects/sounds/resultSound.ts';
import { useResultsAnimation } from '@/hooks/animations/useResultsAnimation.ts';
import {
  selectBets,
  selectGameState,
  selectPlayerPosition,
  selectTotalBet,
} from '@/store/selectors.ts';
import { Typography } from '@/UI/Typography/Typography.tsx';
import { GameUtils } from '@/utils/game/gameUtils.ts';

export const Results = () => {
  const gameState = useSelector(selectGameState);
  if (gameState === ENUM_GAME_STATE.result) return <ResultsText />;
  return null;
};

const ResultsText = () => {
  const bets = useSelector(selectBets);
  const totalBet = useSelector(selectTotalBet);
  const ref = useResultsAnimation();
  const { result, position } = useSelector(selectPlayerPosition);

  useEffect(() => {
    const positionsCount = GameUtils.calculatePositionCount(bets);
    resultSound(result, positionsCount);
  }, []);

  const countWin = useMemo(() => {
    return GameUtils.calculateReturn(bets, position);
  }, [bets, position]);

  const isTie = result === ENUM_RESULTS.tie;
  const isWin = GameUtils.checkPositionResult(result, bets);

  const bet = new Decimal(totalBet).toFixed(2);

  const leftPart = `You ${isWin ? 'win' : 'lose'}`;
  const rightPart = () => {
    if (!isWin || isTie) return bet;
    return countWin.toFixed(2);
  };

  return (
    <div ref={ref}>
      <Typography as="span" size="xl" color="brown">
        {leftPart}
      </Typography>{' '}
      <Typography as="span" size="xl" color="white">
        {rightPart()}
      </Typography>
    </div>
  );
};
