import { memo, useRef } from 'react';
import { useSelector } from 'react-redux';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

import { ENUM_GAME_STATE, ENUM_RESULTS, POSITION_RESULT_COLORS } from '../../constants/specifications.ts';
import { selectComputerPosition, selectGameState, selectPlayerPosition } from '../../store/selectors.ts';
import { PositionTitle } from '../../UI/PositionTitle/PositionTitle.tsx';
import { Typography } from '../../UI/Typography/Typography.tsx';
import s from './Draw.module.scss';

export const Draw = memo(() => {
  const gameState = useSelector(selectGameState);
  if (gameState === ENUM_GAME_STATE.game) return <DrawTitle />;
  if (gameState === ENUM_GAME_STATE.result) return <DrawResult />;
  return null;
});

const DrawTitle = () => {
  const computerPosition = useSelector(selectComputerPosition);
  const { position } = useSelector(selectPlayerPosition);
  const computerRef = useRef(null);
  const vsRef = useRef(null);
  const playerRef = useRef(null);

  useGSAP(() => {
    if (!computerPosition) return;

    gsap
      .timeline()
      .fromTo(computerRef.current, { yPercent: -200, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.5 })
      .fromTo(vsRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 })
      .fromTo(playerRef.current, { yPercent: 200, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.5 });
  }, [computerPosition, position]);
  // useEffect(() => {
  //   let array = [9, 8, 7, 6, 5, 4, 3, 2, 1],
  //     interval = 1400,
  //     p = 0;
  //
  //   array.forEach((v, i) =>
  //     setTimeout(
  //       () => {
  //         document.getElementById('out').innerHTML = v;
  //       },
  //       ((interval /= 1.5), (p += interval)),
  //     ),
  //   );
  // }, []);
  if (!computerPosition) return null;

  return (
    <div className={s.draw}>
      <div ref={computerRef}>
        <PositionTitle className={s.computerPosition} text={computerPosition} />
      </div>
      <div ref={vsRef}>
        <Typography className={s.vs} size="4xl" color="brown">
          vs
        </Typography>
      </div>
      <div ref={playerRef}>
        <PositionTitle className={s.playerPosition} text={position} />
      </div>
    </div>
  );
};

const DrawResult = () => {
  const { position, result } = useSelector(selectPlayerPosition);
  const resultRef = useRef(null);

  let text = '';
  switch (result) {
    case ENUM_RESULTS.lose:
      text = 'lost';
      break;
    case ENUM_RESULTS.win:
      text = 'won';
      break;
    case ENUM_RESULTS.tie:
      text = 'tie';
      break;
  }
  useGSAP(() => {
    gsap.fromTo(
      resultRef.current,
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'sine.inOut' },
    );
  }, []);

  return (
    <div ref={resultRef}>
      <Typography color={POSITION_RESULT_COLORS[result]} size="4xl">
        {position} {text}
      </Typography>
    </div>
  );
};
