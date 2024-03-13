import { ENUM_RESULTS } from 'constants/specifications.ts';

import { sound } from './sound.ts';

export const resultSound = (result: ENUM_RESULTS, positionsCount: number) => {
  switch (result) {
    case ENUM_RESULTS.win:
      sound.play('drawWin');
      break;
    case ENUM_RESULTS.tie:
      positionsCount < 2 && sound.play('drawTie');
      break;
    default:
  }
};
