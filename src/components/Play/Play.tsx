import { ButtonPlay } from '../../UI/Buttons/ButtonPlay/ButtonPlay.tsx';
import s from './Play.module.scss';
import { Typography } from '../../UI/Typography/Typography.tsx';

//Play
//CLEAR
export const Play = () => {
  return (
    <div className={s.container}>
      <ButtonPlay disabled onClick={() => console.log('play')}>
        <Typography color="brown" size="large">
          Play
        </Typography>
      </ButtonPlay>
    </div>
  );
};
