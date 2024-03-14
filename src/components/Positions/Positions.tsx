import { memo, useCallback } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import { ChipTransition } from '@/components/Transitions/ChipTransition/ChipTransition.tsx';
import { ENUM_ELEMENT_SELECTORS } from '@/constants/elementSelectors.ts';
import { ENUM_GAME_STATE, ENUM_POSITIONS, POSITION_ITEMS } from '@/constants/specifications.ts';
import { chipNotAllowed } from '@/effects/animations/chipNotAllowed.ts';
import { sound } from '@/effects/sounds/sound.ts';
import { addBet } from '@/store/gameSlice.ts';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import {
  selectBets,
  selectGameState,
  selectIsBalanceZero,
  selectIsMaxPositionDisabled,
  selectPlayerPosition,
} from '@/store/selectors.ts';
import { ButtonPosition } from '@/UI/Buttons/ButtonPosition/ButtonPosition.tsx';
import { Chip } from '@/UI/Chip/Chip.tsx';
import { TypeColor } from '@/UI/Typography/Typography.tsx';
import { debounce } from '@/utils/debounce.ts';
import { GameUtils } from '@/utils/game/gameUtils.ts';

import s from './Positions.module.scss';

export const Positions = () => {
  const dispatch = useAppDispatch();
  const isMaxPositionDisabled = useSelector(selectIsMaxPositionDisabled);
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
        return (
          <ButtonPositionContainer
            key={`${index}${item.position}`}
            position={item.position}
            color={item.color}
            handleClick={handleClick}
            onDisabled={onDisabled}
            isMaxPositionDisabled={isMaxPositionDisabled}
            isBalanceZero={isBalanceZero}
          />
        );
      })}
    </div>
  );
};

const ButtonPositionContainer = memo(
  ({
    color,
    position,
    handleClick,
    onDisabled,
    isMaxPositionDisabled,
    isBalanceZero,
  }: {
    position: ENUM_POSITIONS;
    color: Extract<TypeColor, 'green' | 'blue' | 'red'>;
    handleClick: (value: string) => void;
    onDisabled: (isDisabled: boolean, position: ENUM_POSITIONS) => () => Promise<void>;
    isMaxPositionDisabled: boolean;
    isBalanceZero: boolean;
  }) => {
    const { position: positionPlayer } = useSelector(selectPlayerPosition, shallowEqual);
    const gameState = useSelector(selectGameState);
    const bets = useSelector(selectBets, (a, b) => a[position] === b[position]);

    const isDisabled =
      (isMaxPositionDisabled && !bets[position]) ||
      gameState !== ENUM_GAME_STATE.placeBet ||
      isBalanceZero;

    return (
      <div onClick={onDisabled(isDisabled, position)} className={ENUM_ELEMENT_SELECTORS.position}>
        <ButtonPosition
          active={gameState === ENUM_GAME_STATE.result && positionPlayer === position}
          disabled={isDisabled}
          onClick={handleClick}
          color={color}
          text={position}
          bet={
            bets[position] && (
              <ChipTransition position={position}>
                <Chip value={GameUtils.getCoinValue(bets[position])} />
              </ChipTransition>
            )
          }
        />
      </div>
    );
  },
);
