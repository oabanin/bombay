import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { ENUM_GAME_STATE, ENUM_POSITIONS, ENUM_RESULTS } from '../../constants/specifications.ts';
import { addWin, clear, setComputerPosition, setGameState } from '../../store/gameSlice.ts';
import { useAppDispatch } from '../../store/hooks.ts';
import { selectGameState, selectTotalBet } from '../../store/selectors.ts';
import { store } from '../../store/store.ts';
import { ButtonPlay } from '../../UI/Buttons/ButtonPlay/ButtonPlay.tsx';
import { Typography } from '../../UI/Typography/Typography.tsx';
import { comparePositions } from '../../utils/comparePositions.ts';
import { getRandomPosition } from '../../utils/getRandomPosition.ts';
import { sleep } from '../../utils/sleep.ts';

export const Play = () => {
  const gameState = useSelector(selectGameState);
  const totalBet = useSelector(selectTotalBet);
  const dispatch = useAppDispatch();

  const handlePlay = useCallback(async () => {
    const { game } = store.getState();
    if (game.gameState === ENUM_GAME_STATE.result) {
      dispatch(clear());
      return;
    }
    dispatch(setGameState(ENUM_GAME_STATE.game));
    const computerPosition = getRandomPosition();
    dispatch(setComputerPosition(computerPosition));
    await sleep(1000);
    dispatch(setGameState(ENUM_GAME_STATE.result));
    const { result } = comparePositions(Object.keys(game.bets) as ENUM_POSITIONS[], computerPosition);
    result === ENUM_RESULTS.win && dispatch(addWin());
  }, [dispatch]);

  const isButtonDisabled =
    gameState === ENUM_GAME_STATE.game || (gameState === ENUM_GAME_STATE.placeBet && totalBet === 0);

  return (
    <ButtonPlayContainer
      handlePlay={handlePlay}
      isDisabled={isButtonDisabled}
      text={gameState === ENUM_GAME_STATE.result ? 'Clear' : 'Play'}
    />
  );
};

const ButtonPlayContainer = memo(
  ({ text, isDisabled, handlePlay }: { text: string; isDisabled: boolean; handlePlay: () => void }) => {
    return (
      <ButtonPlay onClick={handlePlay} disabled={isDisabled}>
        <Typography color="brown" size="xl">
          {text}
        </Typography>
      </ButtonPlay>
    );
  },
);
