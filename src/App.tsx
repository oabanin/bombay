import { Header } from './UI/Header/Header.tsx';
import { Positions } from './components/Positions/Positions.tsx';
import s from './App.module.scss';
import { Results } from './components/Results/Results.tsx';
import { Play } from './components/Play/Play.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

function App() {
  return (
    <Provider store={store}>
      <Header />
      <main className={s.main}>
        <Results />
        <Positions />
        <Play />
      </main>
    </Provider>
  );
}

export default App;
