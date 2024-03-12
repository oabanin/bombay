export const INITIAL_BALANCE = 5000;
export const BET_STEP = 500;
export const POSITIONS_MULTIPLIERS = {
  1: 14,
  2: 3,
};
export enum ENUM_RESULTS {
  win = 'win',
  lose = 'lose',
  tie = 'tie',
}
export enum ENUM_GAME_STATE {
  placeBet = 'placeBet',
  game = 'game',
  result = 'result',
}
export enum ENUM_POSITIONS {
  rock = 'rock',
  paper = 'paper',
  scissors = 'scissors',
  // superhand = 'superhand',
}

export const POSITION_RESULT_COLORS = {
  [ENUM_RESULTS.win]: 'green' as const,
  [ENUM_RESULTS.lose]: 'red' as const,
  [ENUM_RESULTS.tie]: 'brown' as const,
};

export const POSITION_ITEMS = [
  {
    position: ENUM_POSITIONS.rock,
    color: 'blue' as const,
  },
  {
    position: ENUM_POSITIONS.paper,
    color: 'green' as const,
  },
  {
    position: ENUM_POSITIONS.scissors,
    color: 'red' as const,
  },
  // {
  //   position: ENUM_POSITIONS.superhand,
  //   color: 'red' as const,
  // },
];

export const MAX_POSITIONS = POSITION_ITEMS.length - 1;

export const WIN_MAP = {
  rock: [ENUM_POSITIONS.scissors],
  paper: [ENUM_POSITIONS.rock],
  scissors: [ENUM_POSITIONS.paper],
  // superhand: [ENUM_POSITIONS.paper, ENUM_POSITIONS.rock, ENUM_POSITIONS.paper],
};
export const COMPUTER_POSITION_CHOICES = POSITION_ITEMS.map(({ position }) => position);
