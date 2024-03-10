import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { ENUM_GAME_STATE, ENUM_POSITIONS, MAX_POSITIONS, POSITION_ITEMS } from '../../constants/specifications.ts';
import { addBet } from '../../store/gameSlice.ts';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import { selectBalanceCalculated, selectBets, selectGameState, selectPlayerPosition } from '../../store/selectors.ts';
import { ButtonPosition } from '../../UI/Buttons/ButtonPosition/ButtonPosition.tsx';
import { getCoinValue } from '../../utils/getCoinValue.tsx';
import s from './Positions.module.scss';

export const Positions = () => {
  const dispatch = useAppDispatch();
  const gameState = useSelector(selectGameState);
  const bets = useSelector(selectBets);
  const { position } = useSelector(selectPlayerPosition);
  const balance = useAppSelector(selectBalanceCalculated);

  const handleClick = useCallback(
    (position: string) => {
      dispatch(addBet(position as ENUM_POSITIONS));
    },
    [dispatch],
  );

  return (
    <div className={s.container}>
      {POSITION_ITEMS.map((item, index) => {
        const isDisabled =
          (Object.keys(bets).length >= MAX_POSITIONS && !bets[item.position]) ||
          gameState !== ENUM_GAME_STATE.placeBet ||
          balance <= 0;
        return (
          <ButtonPosition
            active={gameState === ENUM_GAME_STATE.result && position === item.position}
            disabled={isDisabled}
            onClick={handleClick}
            key={`${index}${item.position}`}
            color={item.color}
            text={item.position}
            bet={bets[item.position] ? getCoinValue(bets[item.position]) : undefined}
          />
        );
      })}
    </div>
  );
};
