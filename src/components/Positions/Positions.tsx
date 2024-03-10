import s from './Positions.module.scss';

import { ButtonPosition } from '../../UI/Buttons/ButtonPosition/ButtonPosition.tsx';

import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import { addBet } from '../../store/gameSlice.ts';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectBalanceCalculated, selectBets, selectPlayerPosition, selectGameState } from '../../store/selectors.ts';
import { ENUM_GAME_STATE, ENUM_POSITIONS, MAX_POSITIONS, POSITION_ITEMS } from '../../constants/specifications.ts';
import { getCoinValue } from '../../utils/getCoinValue.tsx';

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
          (Object.keys(bets).length >= MAX_POSITIONS && !bets[item.text]) ||
          gameState !== ENUM_GAME_STATE.placeBet ||
          balance <= 0;

        return (
          <ButtonPosition
            active={gameState === ENUM_GAME_STATE.result && position === item.text}
            disabled={isDisabled}
            onClick={handleClick}
            key={`${index}${item.text}`}
            color={item.color}
            text={item.text}
            bet={bets[item.text] && getCoinValue(bets[item.text])}
          />
        );
      })}
    </div>
  );
};
