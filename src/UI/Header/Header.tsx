import s from './Header.module.scss';
import { HeaderItem } from './HeaderItem/HeaderItem.tsx';
import { useAppSelector } from '../../store/hooks.ts';
import { selectWin, selectTotalBet, selectBalanceCalculated } from '../../store/selectors.ts';

export const Header = () => {
  const bet = useAppSelector(selectTotalBet);
  const balance = useAppSelector(selectBalanceCalculated);
  const win = useAppSelector(selectWin);
  return (
    <header className={s.container}>
      <HeaderItem className={s.balance} title="Balance" value={balance} />
      <HeaderItem className={s.bet} title="Bet" value={bet} />
      <HeaderItem className={s.win} title="Win" value={win} />
    </header>
  );
};
