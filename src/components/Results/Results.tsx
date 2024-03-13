import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

import numeral from 'numeral';

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
import { calculatePositionCount } from '@/utils/game/calculatePositions.ts';
import { calculateReturn } from '@/utils/game/calculateReturn.ts';
import { checkPositionResult } from '@/utils/game/checkPositionResult.ts';

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
    const positionsCount = calculatePositionCount(bets);
    resultSound(result, positionsCount);
  }, []);

  const countWin = useMemo(() => {
    return calculateReturn(bets, position);
  }, [bets, position]);

  const isTie = result === ENUM_RESULTS.tie;
  const isWin = checkPositionResult(result, bets);
  const bet = numeral(totalBet).format('0.00');

  const leftPart = `You ${isWin ? 'win' : 'lose'}`;
  const rightPart = () => {
    if (!isWin || isTie) return bet;
    return countWin;
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
