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
}
export const POSITION_CHOICES = [ENUM_POSITIONS.rock, ENUM_POSITIONS.paper, ENUM_POSITIONS.scissors];

export const POSITION_ITEMS = [
  {
    text: ENUM_POSITIONS.rock,
    color: 'blue' as const,
  },
  {
    text: ENUM_POSITIONS.paper,
    color: 'green' as const,
  },
  {
    text: ENUM_POSITIONS.scissors,
    color: 'red' as const,
  },
];
export const WIN_MAP = {
  rock: [ENUM_POSITIONS.scissors],
  paper: [ENUM_POSITIONS.rock],
  scissors: [ENUM_POSITIONS.paper],
};
