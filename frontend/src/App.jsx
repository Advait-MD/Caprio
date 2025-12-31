import React, { useState } from 'react'
import MovieBattle from './components/MovieBattle'
import Recommendation from './components/Recommendation'
import './index.css'

export default function App() {
  const [view, setView] = useState('battle'); // battle | rec
  const [history, setHistory] = useState([]);

  const handleBattleFinished = (resultHistory) => {
    setHistory(resultHistory);
    setView('rec');
  };

  const handleRestart = () => {
    setHistory([]);
    setView('battle');
  };

  return (
    <div className="container">
      <header className="app-header">
        <h1>Movie Taste Battle</h1>
      </header>

      <main>
        {view === 'battle' && (
          <MovieBattle onFinished={handleBattleFinished} />
        )}
        {view === 'rec' && (
          <Recommendation history={history} onRestart={handleRestart} />
        )}
      </main>
    </div>
  )
}
