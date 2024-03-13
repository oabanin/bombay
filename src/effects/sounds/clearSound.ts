import { ENUM_RESULTS } from '@/constants/specifications.ts';

import { sound } from './sound.ts';

export const clearSound = (result: ENUM_RESULTS, positionsCount: number) => {
  switch (result) {
    case ENUM_RESULTS.win:
      sound.play('win');
      break;
    case ENUM_RESULTS.tie:
      sound.play(positionsCount > 1 ? 'lose' : 'tie');
      break;
    case ENUM_RESULTS.lose:
      sound.play('lose');
      break;
    default:
  }
};
