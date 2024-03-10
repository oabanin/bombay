export const INITIAL_BALANCE = 5000;
export const BET_STEP = 500;
export const MAX_POSITIONS = 2;
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
  // test = 'test',
}

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
  //   position: ENUM_POSITIONS.test,
  //   color: 'red' as const,
  // },
];

export const WIN_MAP = {
  rock: [ENUM_POSITIONS.scissors],
  paper: [ENUM_POSITIONS.rock],
  scissors: [ENUM_POSITIONS.paper],
  // test: [ENUM_POSITIONS.paper, ENUM_POSITIONS.rock, ENUM_POSITIONS.paper],
};
export const COMPUTER_POSITION_CHOICES = POSITION_ITEMS.map(({ position }) => position);
