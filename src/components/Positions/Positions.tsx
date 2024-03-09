import s from './Positions.module.scss';

import { ButtonPosition } from '../../UI/Buttons/ButtonPosition/ButtonPosition.tsx';
import { ITEMS } from './positionsItems.ts';
import { PickYourPositions } from './PickYourPositions/PickYourPositions.tsx';

export const Positions = () => {
  return (
    <div className={s.container}>
      <PickYourPositions />
      {ITEMS.map((item) => (
        <ButtonPosition active color={item.color} text={item.text} value={500} />
      ))}
    </div>
  );
};
