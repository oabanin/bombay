import { useCallback } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import { ChipTransition } from '@/components/Transitions/ChipTransition/ChipTransition.tsx';
import { ENUM_ELEMENT_SELECTORS } from '@/constants/elementSelectors.ts';
import {
  ENUM_GAME_STATE,
  ENUM_POSITIONS,
  MAX_POSITIONS,
  POSITION_ITEMS,
} from '@/constants/specifications.ts';
import { chipNotAllowed } from '@/effects/animations/chipNotAllowed.ts';
import { sound } from '@/effects/sounds/sound.ts';
import { addBet } from '@/store/gameSlice.ts';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import {
  selectBets,
  selectGameState,
  selectIsBalanceZero,
  selectPlayerPosition,
} from '@/store/selectors.ts';
import { ButtonPosition } from '@/UI/Buttons/ButtonPosition/ButtonPosition.tsx';
import { Chip } from '@/UI/Chip/Chip.tsx';
import { debounce } from '@/utils/debounce.ts';
import { calculatePositionCount } from '@/utils/game/calculatePositions.ts';
import { getCoinValue } from '@/utils/game/getCoinValue.ts';

import s from './Positions.module.scss';

export const Positions = () => {
  const dispatch = useAppDispatch();
  const gameState = useSelector(selectGameState);
  const bets = useSelector(selectBets);
  const { position } = useSelector(selectPlayerPosition, shallowEqual);
  const isBalanceZero = useAppSelector(selectIsBalanceZero);

  const handleClick = useCallback(
    debounce(async (position: string) => {
      sound.play('bet');
      dispatch(addBet(position as ENUM_POSITIONS));
    }, 100),
    [dispatch],
  );

  const onDisabled = useCallback(
    (isDisabled: boolean, position: ENUM_POSITIONS) => async () => {
      if (!isDisabled) return;
      sound.play('notAllowed');
      await chipNotAllowed(position);
    },
    [],
  );

  return (
    <div className={s.container}>
      {POSITION_ITEMS.map((item, index) => {
        const isDisabled =
          (calculatePositionCount(bets) >= MAX_POSITIONS && !bets[item.position]) ||
          gameState !== ENUM_GAME_STATE.placeBet ||
          isBalanceZero;
        return (
          <div
            key={`${index}${item.position}`}
            onClick={onDisabled(isDisabled, item.position)}
            className={ENUM_ELEMENT_SELECTORS.position}
          >
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
