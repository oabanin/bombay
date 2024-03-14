import { createSelector } from '@reduxjs/toolkit';
import numeral from 'numeral';

import { ENUM_POSITIONS, MAX_POSITIONS } from '@/constants/specifications.ts';
import { RootState } from '@/store/store.ts';
import { calculatePositionCount } from '@/utils/game/calculatePositions.ts';
import { calculateTotalBet } from '@/utils/game/calculateTotalBet.ts';
import { comparePositions } from '@/utils/game/comparePositions.ts';

export const selectBets = (state: RootState) => state.game.bets;

export const selectBalance = (state: RootState) => state.game.balance;

export const selectGameState = (state: RootState) => state.game.gameState;

export const selectComputerPosition = (state: RootState) => state.game.computerPosition;

export const selectWin = (state: RootState) => state.game.win;

export const selectPlayerPosition = createSelector(
  [selectBets, selectComputerPosition],
  (bets, computerPosition) => {
    return comparePositions(Object.keys(bets) as ENUM_POSITIONS[], computerPosition);
  },
);

export const selectTotalBet = createSelector([selectBets], (bets) => {
  return calculateTotalBet(bets);
});

export const selectIsBetZero = createSelector([selectTotalBet], (totalBet) => {
  return totalBet === 0;
});

export const selectBalanceCalculated = createSelector(
  [selectBalance, selectTotalBet],
  (balance, bet) => {
    return numeral(balance).subtract(bet).value() || 0;
  },
);

export const selectIsBalanceZero = createSelector(
  [selectBalanceCalculated],
  (balance) => balance <= 0,
);

export const selectIsMaxPositionDisabled = createSelector(
  [selectBets],
  (bets) => calculatePositionCount(bets) >= MAX_POSITIONS,
);
