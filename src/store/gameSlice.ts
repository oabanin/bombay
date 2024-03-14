import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Decimal from 'decimal.js';

import {
  BET_STEP,
  ENUM_GAME_STATE,
  ENUM_POSITIONS,
  ENUM_RESULTS,
  INITIAL_BALANCE,
} from '@/constants/specifications.ts';
import { GameUtils } from '@/utils/game/gameUtils.ts';

interface GameState {
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
  name: 'game',
  initialState,
  reducers: {
    addBet: (state, action: PayloadAction<ENUM_POSITIONS>) => {
      const calculatedBets = GameUtils.calculateTotalBet(state.bets);
      const calculatedBalance = GameUtils.calculateBalance(state.balance, calculatedBets);
      if (BET_STEP > calculatedBalance) return;
      const currentBet = state.bets[action.payload];
      const BET_STEP_Decimal = new Decimal(BET_STEP);
      if (currentBet) {
        const currentBetDecimal = new Decimal(currentBet);
        state.bets[action.payload] = currentBetDecimal.plus(BET_STEP_Decimal).toNumber() || 0;
      } else {
        state.bets[action.payload] = BET_STEP;
      }
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
      const { result, position } = GameUtils.comparePositions(
        Object.keys(state.bets) as ENUM_POSITIONS[],
        state.computerPosition,
      );
      const totalBet = GameUtils.calculateTotalBet(state.bets);
      const calculatedBalance = GameUtils.calculateBalance(state.balance, totalBet);

      if (result === ENUM_RESULTS.win) {
        const returnAmount = GameUtils.calculateReturn(state.bets, position);
        const calculatedBalanceDecimal = new Decimal(calculatedBalance);
        const returnAmountDecimal = new Decimal(returnAmount);

        state.balance = calculatedBalanceDecimal.plus(returnAmountDecimal).toNumber() || 0;
      } else if (result === ENUM_RESULTS.tie) {
        if (GameUtils.calculatePositionCount(state.bets) > 1) {
          state.balance = calculatedBalance;
        }
      } else {
        state.balance = calculatedBalance;
      }

      state.computerPosition = initialState.computerPosition;
      state.gameState = initialState.gameState;
      state.bets = initialState.bets;
    },
  },
});

export const { addBet, setGameState, setComputerPosition, addWin, clear } = gameSlice.actions;

export default gameSlice.reducer;
