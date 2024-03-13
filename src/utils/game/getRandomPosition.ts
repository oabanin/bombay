import { COMPUTER_POSITION_CHOICES } from 'constants/specifications.ts';

export function getRandomPosition() {
  const randomIndex = Math.floor(Math.random() * COMPUTER_POSITION_CHOICES.length);
  return COMPUTER_POSITION_CHOICES[randomIndex];
}
