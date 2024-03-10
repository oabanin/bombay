import { ButtonPlay } from '../../UI/Buttons/ButtonPlay/ButtonPlay.tsx';
import s from './Play.module.scss';
import { Typography } from '../../UI/Typography/Typography.tsx';
import { useSelector } from 'react-redux';
import { selectBets, selectGameState, selectTotalBet } from '../../store/selectors.ts';
import { ENUM_GAME_STATE, ENUM_POSITIONS, ENUM_RESULTS } from '../../constants/specifications.ts';
import { getRandomPosition } from '../../utils/getRandomPosition.ts';
import { useAppDispatch } from '../../store/hooks.ts';
import { addWin, clear, setComputerPosition, setGameState } from '../../store/gameSlice.ts';
import { sleep } from '../../utils/sleep.ts';
import { comparePositions } from '../../utils/comparePositions.ts';

export const Play = () => {
  const state = useSelector(selectGameState);
  const bets = useSelector(selectBets);
  const totalBet = useSelector(selectTotalBet);
  const dispatch = useAppDispatch();

  const handlePlay = async () => {
    if (state === ENUM_GAME_STATE.result) {
      dispatch(clear());
      return;
    }
    dispatch(setGameState(ENUM_GAME_STATE.game));
    const computerPosition = getRandomPosition();
    dispatch(setComputerPosition(computerPosition));
    await sleep(1000);
    dispatch(setGameState(ENUM_GAME_STATE.result));
    const { result } = comparePositions(Object.keys(bets) as ENUM_POSITIONS[], computerPosition);
    result === ENUM_RESULTS.win && dispatch(addWin());
  };

  const isButtonDisabled = state === ENUM_GAME_STATE.game || (state === ENUM_GAME_STATE.placeBet && totalBet === 0);

  return (
    <div className={s.container}>
      <ButtonPlay disabled={isButtonDisabled} onClick={handlePlay}>
        <Typography color="brown" size="large">
          {state === ENUM_GAME_STATE.result ? 'Clear' : 'Play'}
        </Typography>
      </ButtonPlay>
    </div>
  );
};
