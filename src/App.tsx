import { Provider } from 'react-redux';

import s from './App.module.scss';
import { Draw } from './components/Draw/Draw.tsx';
import { Header } from './components/Header/Header.tsx';
import { PickPositions } from './components/PickPositions/PickPositions.tsx';
import { Play } from './components/Play/Play.tsx';
import { Positions } from './components/Positions/Positions.tsx';
import { Results } from './components/Results/Results.tsx';
import { useInitialAnimation } from './hooks/animations/useInitialAnimation.ts';
import { store } from './store/store.ts';

function App() {
  useInitialAnimation();
  return (
    <Provider store={store}>
      <Header />
      <main className={s.main}>
        <div className={s.drawSpace} />
        <div className={s.draw}>
          <Draw />
        </div>
        <div className={s.resultsSpace} />
        <div className={s.results}>
          <Results />
        </div>
        <div className={s.pickPositionsSpace} />
        <div className={s.pickPositions}>
          <PickPositions />
        </div>
        <div className={s.positionsSpace} />
        <Positions />
        <div className={s.playSpace} />
        <Play />
        <div className={s.bottomSpace} />
      </main>
    </Provider>
  );
}

export default App;
