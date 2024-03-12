import { useEffect, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import numeral from 'numeral';

import { ENUM_GAME_STATE, ENUM_RESULTS } from '../../constants/specifications.ts';
import { resultSound } from '../../effects/sounds/resultSound.ts';
import { selectBets, selectGameState, selectPlayerPosition, selectTotalBet } from '../../store/selectors.ts';
import { Typography } from '../../UI/Typography/Typography.tsx';
import { calculatePositionCount } from '../../utils/calculatePositions.ts';
import { calculateReturn } from '../../utils/calculateReturn.ts';
import { checkPositionResult } from '../../utils/checkPositionResult.ts';

export const Results = () => {
  const gameState = useSelector(selectGameState);
  if (gameState === ENUM_GAME_STATE.result) return <ResultsText />;
  return null;
};

const ResultsText = () => {
  const bets = useSelector(selectBets);
  const totalBet = useSelector(selectTotalBet);
  const resultRef = useRef(null);

  const { result, position } = useSelector(selectPlayerPosition);
  const countWin = useMemo(() => {
    return calculateReturn(bets, position);
  }, [bets, position]);

  const isTie = result === ENUM_RESULTS.tie;
  const isWin = checkPositionResult(result, bets);
  const bet = numeral(totalBet).format('0.00');

  useEffect(() => {
    const positionsCount = calculatePositionCount(bets);
    resultSound(result, positionsCount);
  }, []);

  useGSAP(() => {
    gsap.fromTo(
      resultRef.current,
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'sine.inOut' },
    );
  });

  return (
    <div ref={resultRef}>
      <Typography as="span" size="xl" color="brown">
        You {isWin ? 'win' : 'lose'}
      </Typography>{' '}
      <Typography as="span" size="xl" color="white">
        {isWin ? (isTie ? bet : countWin) : bet}
      </Typography>
    </div>
  );
};
