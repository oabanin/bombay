import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import { ENUM_GAME_STATE, ENUM_POSITIONS, ENUM_RESULTS } from '@/constants/specifications.ts';
import { chipDisappear } from '@/effects/animations/chipDisappear.ts';
import { pickPositionsHide, pickPositionsShow } from '@/effects/animations/pickPositions.ts';
import { playButtonTimeline } from '@/effects/animations/playButtonTimeline.ts';
import { clearSound } from '@/effects/sounds/clearSound.ts';
import { sound } from '@/effects/sounds/sound.ts';
import { addWin, clear, setComputerPosition, setGameState } from '@/store/gameSlice.ts';
import { useAppDispatch } from '@/store/hooks.ts';
import { selectGameState, selectIsBetZero } from '@/store/selectors.ts';
import { store } from '@/store/store.ts';
import { ButtonPlay } from '@/UI/Buttons/ButtonPlay/ButtonPlay.tsx';
import { calculatePositionCount } from '@/utils/game/calculatePositions.ts';
import { comparePositions } from '@/utils/game/comparePositions.ts';
import { getRandomPosition } from '@/utils/game/getRandomPosition.ts';
import { sleep } from '@/utils/sleep.ts';

export const Play = () => {
  const gameState = useSelector(selectGameState);
  const betIsZero = useSelector(selectIsBetZero);

  const dispatch = useAppDispatch();
  const [isDisabled, setIsDisabled] = useState(false);

  const handlePlay = useCallback(async () => {
    setIsDisabled(true);
    await playButtonTimeline();

    const { game } = store.getState();
    if (game.gameState === ENUM_GAME_STATE.result) {
      const { result, position } = comparePositions(
        Object.keys(game.bets) as ENUM_POSITIONS[],
        game.computerPosition,
      );
      const positionsCount = calculatePositionCount(game.bets);
      clearSound(result, positionsCount);
      await chipDisappear(result, position, game.bets);
      dispatch(clear());
      setIsDisabled(false);
      await pickPositionsShow();
      return;
    }

    sound.play('play');
    await pickPositionsHide();
    dispatch(setGameState(ENUM_GAME_STATE.game));
    const computerPosition = getRandomPosition();
    const { result } = comparePositions(
      Object.keys(game.bets) as ENUM_POSITIONS[],
      computerPosition,
    );
    dispatch(setComputerPosition(computerPosition));
    await sleep(2000);
    dispatch(setGameState(ENUM_GAME_STATE.result));
    result === ENUM_RESULTS.win && dispatch(addWin());
    setIsDisabled(false);
  }, [dispatch]);

  const isButtonDisabled =
    gameState === ENUM_GAME_STATE.game || (gameState === ENUM_GAME_STATE.placeBet && betIsZero);

  return (
    <ButtonPlay onClick={handlePlay} disabled={isButtonDisabled || isDisabled}>
      {gameState === ENUM_GAME_STATE.result ? 'Clear' : 'Play'}
    </ButtonPlay>
  );
};
