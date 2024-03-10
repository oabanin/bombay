import s from './Results.module.scss';
import { Typography } from '../../UI/Typography/Typography.tsx';
import { PositionDraw } from './PositionDraw/PositionDraw.tsx';
import { useSelector } from 'react-redux';
import { selectBets, selectGameState, selectPlayerPosition, selectTotalBet } from '../../store/selectors.ts';
import { ENUM_GAME_STATE, ENUM_RESULTS } from '../../constants/specifications.ts';
import { useMemo } from 'react';
import numeral from 'numeral';
import { calculateReturn } from '../../utils/calculateReturn.ts';
import { PickYourPositions } from '../Positions/PickYourPositions/PickYourPositions.tsx';
export const Results = () => {
  const gameState = useSelector(selectGameState);
  const bets = useSelector(selectBets);
  const totalBet = useSelector(selectTotalBet);
  const { result, position } = useSelector(selectPlayerPosition);

  const countWin = useMemo(() => {
    return calculateReturn(bets, position);
  }, [bets, position]);

  const isWin = result === ENUM_RESULTS.win;
  return (
    <div className={s.container}>
      <PositionDraw />
      <div className={s.results}>
        {gameState === ENUM_GAME_STATE.result && (
          <>
            <Typography as="span" size="large" color="brown">
              You {isWin ? 'win' : 'lose'}
            </Typography>{' '}
            <Typography as="span" size="large" color="white">
              {isWin ? countWin : numeral(totalBet).format('0.00')}
            </Typography>
          </>
        )}
      </div>
      <PickYourPositions />
    </div>
  );
};
