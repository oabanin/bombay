import { createSelector } from '@reduxjs/toolkit';

import { RootState } from './store';
import numeral from 'numeral';
import { calculateTotalBet } from '../utils/calculateTotalBet.ts';
import { comparePositions } from '../utils/comparePositions.ts';
import { ENUM_POSITIONS } from '../constants/specifications.ts';
export const selectBets = (state: RootState) => state.game.bets;
const selectBalance = (state: RootState) => state.game.balance;
export const selectGameState = (state: RootState) => state.game.gameState;
export const selectComputerPosition = (state: RootState) => state.game.computerPosition;
export const selectWin = (state: RootState) => state.game.win;
export const selectPlayerPosition = createSelector([selectBets, selectComputerPosition], (bets, computerPosition) => {
  return comparePositions(Object.keys(bets) as ENUM_POSITIONS[], computerPosition);
});
export const selectTotalBet = createSelector([selectBets], (bets) => {
  return calculateTotalBet(bets);
});
export const selectBalanceCalculated = createSelector([selectBalance, selectTotalBet], (balance, bet) => {
  return numeral(balance).subtract(bet).value() || 0;
});
