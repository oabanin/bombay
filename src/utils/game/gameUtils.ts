import Decimal from 'decimal.js';

import {
  COMPUTER_POSITION_CHOICES,
  ENUM_POSITIONS,
  ENUM_RESULTS,
  POSITIONS_MULTIPLIERS,
  WIN_MAP,
} from '@/constants/specifications.ts';

export class GameUtils {
  public static calculateBalance(balance: number, totalBet: number): number {
    const balanceDecimal = new Decimal(balance);
    const totalBetDecimal = new Decimal(totalBet);
    return balanceDecimal.minus(totalBetDecimal).toNumber() || 0;
  }

  public static calculatePositionCount(bets: Record<string, number>): number {
    return Object.values(bets).filter((item) => item > 0).length;
  }

  public static calculateReturn(bets: Record<string, number>, position: ENUM_POSITIONS): number {
    const betsCount = GameUtils.calculatePositionCount(bets) as keyof typeof POSITIONS_MULTIPLIERS;
    if (betsCount < 1) return 0;
    const multiplier = POSITIONS_MULTIPLIERS[betsCount];

    if (multiplier) {
      const multiplierDecimal = new Decimal(multiplier);
      const betsPositionDecimal = new Decimal(bets[position]);
      const winReturnDecimal = multiplierDecimal.times(betsPositionDecimal).toNumber();
      return winReturnDecimal || 0;
    } else {
      return bets[position] || 0;
    }
  }

  public static calculateTotalBet(bets: Record<string, number>): number {
    const total = Object.values(bets).reduce((acc, value) => {
      const decimalAcc = new Decimal(acc);
      const decimalValue = new Decimal(value);
      return decimalAcc.plus(decimalValue).toNumber();
    }, 0);

    return new Decimal(total).toNumber() || 0;
  }

  public static checkPositionResult(
    result: ENUM_RESULTS,
    bets: Record<ENUM_POSITIONS, number>,
  ): boolean {
    const isTie = result === ENUM_RESULTS.tie;
    return result === ENUM_RESULTS.win || (isTie && GameUtils.calculatePositionCount(bets) === 1);
  }

  public static comparePositions(
    playerPositions: Array<ENUM_POSITIONS>,
    computerPosition: ENUM_POSITIONS | null,
  ) {
    let result = ENUM_RESULTS.lose;
    let position = playerPositions[0];
    if (!computerPosition) return { position, result };

    for (const playerPosition of playerPositions) {
      if (WIN_MAP[playerPosition].includes(computerPosition)) {
        return { position: playerPosition, result: ENUM_RESULTS.win };
      } else if (playerPosition === computerPosition) {
        result = ENUM_RESULTS.tie;
        position = playerPosition;
      } else {
        position = playerPosition;
      }
    }

    return { position, result };
  }

  public static getCoinValue(value: number): string {
    if (value >= 99000) {
      return '99k+';
    } else if (value >= 1000) {
      const thousands = (value / 1000).toFixed(1);
      const suffix = 'k';
      return `${thousands}${suffix}`;
    } else {
      return value.toString();
    }
  }

  public static getRandomPosition(): ENUM_POSITIONS {
    const randomIndex = Math.floor(Math.random() * COMPUTER_POSITION_CHOICES.length);
    return COMPUTER_POSITION_CHOICES[randomIndex];
  }
}
