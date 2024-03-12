import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import * as Howler from 'howler';

import { ENUM_GAME_STATE, ENUM_POSITIONS, MAX_POSITIONS, POSITION_ITEMS } from '../../constants/specifications.ts';
import { addBet } from '../../store/gameSlice.ts';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import { selectBalanceCalculated, selectBets, selectGameState, selectPlayerPosition } from '../../store/selectors.ts';
import { ButtonPosition } from '../../UI/Buttons/ButtonPosition/ButtonPosition.tsx';
import { Chip } from '../../UI/Chip/Chip.tsx';
import { calculatePositionCount } from '../../utils/calculatePositions.ts';
import { getCoinValue } from '../../utils/getCoinValue.ts';
import { ChipTransition } from './ChipTransition/ChipTransition.tsx';
import s from './Positions.module.scss';

const sound = new Howler.Howl({
  src: ['/assets/sounds.mp3'],
  sprite: {
    bet: [3000, 500],
    notAllowed: [7000, 600],
  },
  preload: true,
});

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

  return (
    <div className={s.container}>
      {POSITION_ITEMS.map((item, index) => {
        const isDisabled =
          (calculatePositionCount(bets) >= MAX_POSITIONS && !bets[item.position]) ||
          gameState !== ENUM_GAME_STATE.placeBet ||
          balance <= 0;
        return (
          <div
            onClick={() => {
              isDisabled && sound.play('notAllowed');
            }}
            className="bombay-position"
          >
            <ButtonPosition
              active={gameState === ENUM_GAME_STATE.result && position === item.position}
              disabled={isDisabled}
              onClick={handleClick}
              key={`${index}${item.position}`}
              color={item.color}
              text={item.position}
              bet={
                bets[item.position] && (
                  <ChipTransition>
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
