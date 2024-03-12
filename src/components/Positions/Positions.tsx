import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { ENUM_GAME_STATE, ENUM_POSITIONS, MAX_POSITIONS, POSITION_ITEMS } from '../../constants/specifications.ts';
import { sound } from '../../effects/sounds/sound.ts';
import { addBet } from '../../store/gameSlice.ts';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import { selectBalanceCalculated, selectBets, selectGameState, selectPlayerPosition } from '../../store/selectors.ts';
import { ButtonPosition } from '../../UI/Buttons/ButtonPosition/ButtonPosition.tsx';
import { Chip } from '../../UI/Chip/Chip.tsx';
import { calculatePositionCount } from '../../utils/calculatePositions.ts';
import { getCoinValue } from '../../utils/getCoinValue.ts';
import { ChipTransition } from './ChipTransition/ChipTransition.tsx';
import s from './Positions.module.scss';

export const Positions = () => {
  const dispatch = useAppDispatch();
  const gameState = useSelector(selectGameState);
  const bets = useSelector(selectBets);
  const { position } = useSelector(selectPlayerPosition);
  const balance = useAppSelector(selectBalanceCalculated);

  const handleClick = useCallback(
    async (position: string) => {
      sound.play('bet');
      dispatch(addBet(position as ENUM_POSITIONS));
    },
    [dispatch],
  );

  const onDisabled = useCallback(
    (isDisabled: boolean) => () => {
      isDisabled && sound.play('notAllowed');
    },
    [],
  );

  return (
    <div className={s.container}>
      {POSITION_ITEMS.map((item, index) => {
        const isDisabled =
          (calculatePositionCount(bets) >= MAX_POSITIONS && !bets[item.position]) ||
          gameState !== ENUM_GAME_STATE.placeBet ||
          balance <= 0;
        return (
          <div key={`${index}${item.position}`} onClick={onDisabled(isDisabled)} className="bombay-position">
            <ButtonPosition
              active={gameState === ENUM_GAME_STATE.result && position === item.position}
              disabled={isDisabled}
              onClick={handleClick}
              color={item.color}
              text={item.position}
              bet={
                bets[item.position] && (
                  <ChipTransition position={item.position}>
                    <Chip value={getCoinValue(bets[item.position])} />
                  </ChipTransition>
                )
              }
            />
          </div>
        );
      })}
    </div>
  );
};
