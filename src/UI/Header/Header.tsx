import s from './Header.module.scss';
import { HeaderItem } from './HeaderItem/HeaderItem.tsx';
export const Header = () => {
  return (
    <header className={s.container}>
      <HeaderItem title="Balance" value="XXXX" />
      <HeaderItem className={s.centerItem} title="Bet" value="XXX" />
      <HeaderItem title="Win" value="X" />
    </header>
  );
};
