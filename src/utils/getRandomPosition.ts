import { POSITION_CHOICES } from '../constants/specifications.ts';

export function getRandomPosition() {
  const randomIndex = Math.floor(Math.random() * POSITION_CHOICES.length);
  return POSITION_CHOICES[randomIndex];
}
