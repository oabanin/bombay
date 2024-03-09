export const INITIAL_BALANCE = 5000;
export const BET_STEP = 500;
export const MAX_POSITIONS = 2;
export const POSITIONS_MULTIPLIERS = {
  1: 14,
  2: 3,
};

export enum EPOSITIONS {
  rock = 'rock',
  paper = 'paper',
  scissors = 'scissors',
}
export enum ERESULTS {
  win = 'win',
  lose = 'lose',
  tie = 'tie',
}

export const POSITION_CHOICES = [EPOSITIONS.rock, EPOSITIONS.paper, EPOSITIONS.scissors];

export const WIN_MAP = {
  rock: [EPOSITIONS.rock],
  paper: [EPOSITIONS.rock],
  scissors: [EPOSITIONS.paper],
};
