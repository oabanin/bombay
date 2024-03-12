import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import numeral from 'numeral';

import { ENUM_GAME_STATE, ENUM_RESULTS } from '../../constants/specifications.ts';
import { selectBets, selectGameState, selectPlayerPosition, selectTotalBet } from '../../store/selectors.ts';
import { Typography } from '../../UI/Typography/Typography.tsx';
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
  const { result, position } = useSelector(selectPlayerPosition);
  const countWin = useMemo(() => {
    return calculateReturn(bets, position);
  }, [bets, position]);

  const isTie = result === ENUM_RESULTS.tie;
  const isWin = checkPositionResult(result, bets);
  const bet = numeral(totalBet).format('0.00');

  return (
    <div>
      <Typography as="span" size="xl" color="brown">
        You {isWin ? 'win' : 'lose'}
      </Typography>{' '}
      <Typography as="span" size="xl" color="white">
        {isWin ? (isTie ? bet : countWin) : bet}
      </Typography>
    </div>
  );
};
