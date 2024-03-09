import { Header } from './UI/Header/Header.tsx';
import { Positions } from './components/Positions/Positions.tsx';
import s from './App.module.scss';
import { Results } from './components/Results/Results.tsx';
import { Play } from './components/Play/Play.tsx';
function App() {
  return (
    <>
      <Header />
      <main className={s.main}>
        <Results />
        <Positions />
        <Play />
      </main>
    </>
  );
}

export default App;
