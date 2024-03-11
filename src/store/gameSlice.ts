import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import numeral from 'numeral';

import {
  BET_STEP,
  ENUM_GAME_STATE,
  ENUM_POSITIONS,
  ENUM_RESULTS,
  INITIAL_BALANCE,
} from '../constants/specifications.ts';
import { calculateBalance } from '../utils/calculateBalance.ts';
import { calculatePositionCount } from '../utils/calculatePositions.ts';
import { calculateReturn } from '../utils/calculateReturn.ts';
import { calculateTotalBet } from '../utils/calculateTotalBet.ts';
import { comparePositions } from '../utils/comparePositions.ts';

export interface GameState {
  gameState: ENUM_GAME_STATE;
  balance: number;
  win: number;
  bets: Record<ENUM_POSITIONS, number>;
  computerPosition: null | ENUM_POSITIONS;
}

const initialState: GameState = {
  gameState: ENUM_GAME_STATE.placeBet,
  balance: INITIAL_BALANCE,
  win: 0,
  bets: {} as Record<ENUM_POSITIONS, number>,
  computerPosition: null,
};

export const gameSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addBet: (state, action: PayloadAction<ENUM_POSITIONS>) => {
      const calculatedBets = calculateTotalBet(state.bets);
      const calculatedBalance = calculateBalance(state.balance, calculatedBets);
      if (BET_STEP > calculatedBalance) return;
      const currentBet = state.bets[action.payload];
      state.bets[action.payload] = currentBet ? numeral(currentBet).add(BET_STEP).value() || 0 : BET_STEP;
    },
    setGameState: (state, action: PayloadAction<ENUM_GAME_STATE>) => {
      state.gameState = action.payload;
    },
    addWin: (state) => {
      state.win += 1;
    },
    setComputerPosition: (state, action: PayloadAction<ENUM_POSITIONS>) => {
      state.computerPosition = action.payload;
    },
    clear: (state) => {
      const { result, position } = comparePositions(
        Object.keys(state.bets) as ENUM_POSITIONS[],
        state.computerPosition,
      );
      const totalBet = calculateTotalBet(state.bets);
      const calculatedBalance = calculateBalance(state.balance, totalBet);
      if (result === ENUM_RESULTS.win) {
        state.balance = numeral(calculatedBalance).add(calculateReturn(state.bets, position)).value() || 0;
      } else if (result === ENUM_RESULTS.tie) {
        if (calculatePositionCount(state.bets) > 1) {
          state.balance = calculatedBalance;
        }
      } else {
        state.balance = calculatedBalance;
      }
      state.computerPosition = null;
      state.gameState = ENUM_GAME_STATE.placeBet;
      state.bets = {} as Record<ENUM_POSITIONS, number>;
    },
  },
});

export const { addBet, setGameState, setComputerPosition, addWin, clear } = gameSlice.actions;

export default gameSlice.reducer;
