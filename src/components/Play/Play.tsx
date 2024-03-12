import { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import { ENUM_GAME_STATE, ENUM_POSITIONS, ENUM_RESULTS } from '../../constants/specifications.ts';
import { chipDisappear } from '../../effects/animations/chipDisappear.tsx';
import { pickPositionsHide, pickPositionsShow } from '../../effects/animations/pickPositions.ts';
import { playButtonTimeline } from '../../effects/animations/playButtonTimeline.ts';
import { resultsSound } from '../../effects/sounds/resultsSound.ts';
import { sound } from '../../effects/sounds/sound.ts';
import { addWin, clear, setComputerPosition, setGameState } from '../../store/gameSlice.ts';
import { useAppDispatch } from '../../store/hooks.ts';
import { selectGameState, selectTotalBet } from '../../store/selectors.ts';
import { store } from '../../store/store.ts';
import { ButtonPlay } from '../../UI/Buttons/ButtonPlay/ButtonPlay.tsx';
import { calculatePositionCount } from '../../utils/calculatePositions.ts';
import { comparePositions } from '../../utils/comparePositions.ts';
import { getRandomPosition } from '../../utils/getRandomPosition.ts';
import { sleep } from '../../utils/sleep.ts';

export const Play = () => {
  const gameState = useSelector(selectGameState);
  const totalBet = useSelector(selectTotalBet);
  const dispatch = useAppDispatch();
  const [isDisabled, setIsDisabled] = useState(false);

  const handlePlay = useCallback(async () => {
    setIsDisabled(true);
    await playButtonTimeline();

    const { game } = store.getState();
    if (game.gameState === ENUM_GAME_STATE.result) {
      const { result, position } = comparePositions(Object.keys(game.bets) as ENUM_POSITIONS[], game.computerPosition);
      const positionsCount = calculatePositionCount(game.bets);
      resultsSound(result, positionsCount);
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
    const { result } = comparePositions(Object.keys(game.bets) as ENUM_POSITIONS[], computerPosition);
    dispatch(setComputerPosition(computerPosition));
    await sleep(1000);
    dispatch(setGameState(ENUM_GAME_STATE.result));
    result === ENUM_RESULTS.win && dispatch(addWin());
    setIsDisabled(false);
  }, [dispatch]);

  const isButtonDisabled =
    gameState === ENUM_GAME_STATE.game || (gameState === ENUM_GAME_STATE.placeBet && totalBet === 0);

  return (
    <ButtonPlayContainer
      handlePlay={handlePlay}
      isDisabled={isButtonDisabled || isDisabled}
      text={gameState === ENUM_GAME_STATE.result ? 'Clear' : 'Play'}
    />
  );
};

const ButtonPlayContainer = memo(
  ({ text, isDisabled, handlePlay }: { text: string; isDisabled: boolean; handlePlay: () => void }) => {
    return (
      <ButtonPlay onClick={handlePlay} disabled={isDisabled}>
        {text}
      </ButtonPlay>
    );
  },
);
