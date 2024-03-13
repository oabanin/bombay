import { ENUM_POSITIONS, ENUM_RESULTS, WIN_MAP } from '../../constants/specifications.ts';

export const comparePositions = (playerPositions: Array<ENUM_POSITIONS>, computerPosition: ENUM_POSITIONS | null) => {
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
};
