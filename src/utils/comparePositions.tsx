import { EPOSITIONS, ERESULTS } from '../constants/specifications.ts';

export const comparePositions = (playerPositions: Array<EPOSITIONS>, computerPosition: EPOSITIONS) => {
  let result = ERESULTS.lose;
  let position = playerPositions[0];
  for (const playerPosition of playerPositions) {
    if (EPOSITIONS[playerPosition].includes(computerPosition)) {
      return { position: playerPosition, result: ERESULTS.win };
    } else if (playerPosition === computerPosition) {
      result = ERESULTS.tie;
      position = playerPosition;
    } else {
      position = playerPosition;
    }
  }
  return { position, result };
};
