import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import numeral from 'numeral';

import { ENUM_GAME_STATE, ENUM_RESULTS } from '../../constants/specifications.ts';
import { selectBets, selectGameState, selectPlayerPosition, selectTotalBet } from '../../store/selectors.ts';
import { Typography } from '../../UI/Typography/Typography.tsx';
import { calculatePositionCount } from '../../utils/calculatePositions.ts';
import { calculateReturn } from '../../utils/calculateReturn.ts';

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
  const isWin = result === ENUM_RESULTS.win || (isTie && calculatePositionCount(bets) === 1);
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
