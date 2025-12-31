import React, { useState, useEffect } from 'react';
import '../index.css';

const API_BASE = 'http://localhost:4000/api';

export default function MovieBattle({ onFinished }) {
  const [pair, setPair] = useState(null);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [round, setRound] = useState(1);
  const TOTAL_ROUNDS = 5;

  const fetchPair = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/compare/pair`);
      if (!res.ok) throw new Error("API Error");

      const data = await res.json();
      // Ensure data is an array and filter out any invalid items just in case
      if (Array.isArray(data)) {
        setPair(data.filter(m => m && m.imdbID));
      } else {
        console.error("Invalid data format:", data);
        setPair(null);
      }
    } catch (err) {
      console.error("Failed to fetch pair", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPair();
  }, []);

  const handleChoose = (movie) => {
    const newHistory = [...history, movie];
    setHistory(newHistory);

    if (round < TOTAL_ROUNDS) {
      setRound(round + 1);
      fetchPair();
    } else {
      onFinished(newHistory);
    }
  };

  if (loading) return <div className="loading">Loading Battle...</div>;
  if (!pair || pair.length < 2) return (
    <div className="error">
      <p>Failed to load a valid movie pair.</p>
      <button className="btn-secondary" onClick={fetchPair}>Retry</button>
    </div>
  );

  return (
    <div className="battle-container fade-in">
      <h2>Round {round} / {TOTAL_ROUNDS}</h2>
      <p style={{ marginBottom: '2rem', opacity: 0.8 }}>Which movie do you prefer?</p>

      <div className="battle-arena">
        {pair.map((movie) => {
          if (!movie) return null; // Defensive check
          return (
            <div key={movie.imdbID} className="movie-card glass-panel" onClick={() => handleChoose(movie)}>
              <div className="poster-wrapper">
                <img src={movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450'} alt={movie.Title} />
                <div className="overlay">
                  <span>Select</span>
                </div>
              </div>
              <h3>{movie.Title}</h3>
              <p className="year">{movie.Year}</p>
            </div>
          );
        })}
      </div>

      <style>{`
        .battle-container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .battle-arena {
          display: flex;
          gap: 2rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        .movie-card {
          width: 300px;
          padding: 1rem;
          transition: transform 0.3s ease, border-color 0.3s ease;
          cursor: pointer;
        }
        .movie-card:hover {
          transform: scale(1.05);
          border-color: var(--accent-color);
        }
        .poster-wrapper {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 1rem;
          height: 400px;
        }
        .poster-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .overlay span {
          border: 1px solid white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          color: white;
          font-weight: 600;
        }
        .movie-card:hover .overlay {
          opacity: 1;
        }
        h3 {
          margin-bottom: 0.5rem;
          font-size: 1.2rem;
        }
        .year {
          opacity: 0.6;
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
}
