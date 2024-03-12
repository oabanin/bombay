import * as Howler from 'howler';

export const sound = new Howler.Howl({
  src: ['/bombay/assets/sounds.mp3'],
  sprite: {
    bet: [3000, 500],
    notAllowed: [7000, 500],
    play: [5000, 500],
    tie: [20000, 500],
    win: [21000, 500],
    lose: [17000, 500],
  },
  preload: true,
});
