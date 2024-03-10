import { Provider } from 'react-redux';

import s from './App.module.scss';
import { Draw } from './components/Draw/Draw.tsx';
import { Header } from './components/Header/Header.tsx';
import { PickPositions } from './components/PickPositions/PickPositions.tsx';
import { Play } from './components/Play/Play.tsx';
import { Positions } from './components/Positions/Positions.tsx';
import { Results } from './components/Results/Results.tsx';
import { store } from './store/store.ts';

function App() {
  return (
    <Provider store={store}>
      <Header />
      <main className={s.main}>
        <div className={s.draw}>
          <Draw />
        </div>
        <div className={s.results}>
          <Results />
        </div>
        <div className={s.pickPositions}>
          <PickPositions />
        </div>
        <div className={s.positions}>
          <Positions />
        </div>
        <div className={s.play}>
          <Play />
        </div>
      </main>
    </Provider>
  );
}

export default App;
