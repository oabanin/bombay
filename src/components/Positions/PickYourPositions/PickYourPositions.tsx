import s from './PickYourPositions.module.scss';
import { Typography } from '../../../UI/Typography/Typography.tsx';
import { useSelector } from 'react-redux';
import { selectGameState } from '../../../store/selectors.ts';
import { ENUM_GAME_STATE } from '../../../constants/specifications.ts';

export const PickYourPositions = () => {
  const state = useSelector(selectGameState);
  return (
    <div className={s.container}>
      {state === ENUM_GAME_STATE.placeBet && <Typography color="brown">Pick your positions</Typography>}
    </div>
  );
};
