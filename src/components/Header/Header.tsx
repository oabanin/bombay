import { Selector } from '@reduxjs/toolkit';

import { useAppSelector } from '@/store/hooks.ts';
import { selectBalanceCalculated, selectTotalBet, selectWin } from '@/store/selectors.ts';
import { RootState } from '@/store/store.ts';
import { HeaderItem } from '@/UI/HeaderItem/HeaderItem.tsx';
import { Typography } from '@/UI/Typography/Typography.tsx';

import s from './Header.module.scss';

export const Header = () => {
  return (
    <header id="bombay-header" className={s.container}>
      <HeaderItem
        className={s.balance}
        title="Balance"
        counter={<Counter selector={selectBalanceCalculated} />}
      />
      <HeaderItem className={s.bet} title="Bet" counter={<Counter selector={selectTotalBet} />} />
      <HeaderItem className={s.win} title="Win" counter={<Counter selector={selectWin} />} />
    </header>
  );
};

const Counter = ({ selector }: { selector: Selector<RootState, number> }) => {
  const value = useAppSelector(selector);

  return (
    <Typography as="span" color="white">
      {value}
    </Typography>
  );
};
