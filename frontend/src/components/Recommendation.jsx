import React, { useState } from 'react';
import '../index.css';

const API_BASE = 'http://localhost:4000/api';

export default function Recommendation({ history, onRestart }) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [watchedIds, setWatchedIds] = useState(history.map(m => m.imdbID));

  const getRecommendation = async () => {
    setLoading(true);
    setShowDetails(false);
    try {
      const res = await fetch(`${API_BASE}/recommend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history, watchedIds })
      });
      if (!res.ok) throw new Error('No rec found');
      const data = await res.json();
      setMovie(data);
      // Add this new movie to watchedIds so we don't suggest it again immediately if they click "Already Watched"
      setWatchedIds(prev => [...prev, data.imdbID]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  React.useEffect(() => {
    if (!movie) getRecommendation();
  }, []);

  if (loading) return <div className="loading">Analyzing your taste...</div>;
  if (!movie) return (
    <div className="error glass-panel" style={{ padding: '2rem' }}>
      <h3>No more recommendations!</h3>
      <button className="btn-secondary" onClick={onRestart} style={{ marginTop: '1rem' }}>
        Start Over
      </button>
    </div>
  );

  return (
    <div className="rec-container fade-in">
      {!showDetails ? (
        <div className="rec-content">
          <h1>We Recommend</h1>
          <div className="glass-panel main-card">
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450'}
              alt={movie.Title}
            />
            <div className="info">
              <h2>{movie.Title}</h2>
              <p>{movie.Year} • {movie.Genre}</p>
              <div className="actions">
                <button className="btn-secondary" onClick={getRecommendation}>
                  Already Watched
                </button>
                <button className="btn-primary" onClick={() => setShowDetails(true)}>
                  Let's Watch
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="details-view glass-panel fade-in">
          <div className="details-header">
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450'}
              alt={movie.Title}
              className="details-poster"
            />
            <div className="details-meta">
              <h1>{movie.Title}</h1>
              <div className="pills">
                <span className="pill">{movie.Rated}</span>
                <span className="pill">{movie.Runtime}</span>
                <span className="pill">⭐ {movie.imdbRating}</span>
              </div>
              <p className="plot">{movie.Plot}</p>
              <p><strong>Director:</strong> {movie.Director}</p>
              <p><strong>Actors:</strong> {movie.Actors}</p>

              <div className="details-actions">
                <a
                  href={`https://www.google.com/search?q=watch+${movie.Title.replace(/\s/g, '+')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                >
                  Find where to watch
                </a>
                <button className="btn-secondary" onClick={() => setShowDetails(false)}>
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .rec-container {
            max-width: 800px;
            margin: 0 auto;
            width: 100%;
        }
        .main-card {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 2rem;
            margin-top: 2rem;
            text-align: center;
        }
        .main-card img {
            max-width: 300px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            margin-bottom: 1.5rem;
        }
        .actions {
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin-top: 1.5rem;
        }
        
        .details-view {
          padding: 3rem;
          max-width: 900px;
        }
        .details-header {
           display: flex;
           gap: 2rem;
           align-items: flex-start;
           text-align: left; 
        }
        .details-poster {
           width: 250px;
           border-radius: 12px;
        }
        .pills {
            display: flex;
            gap: 0.8rem;
            margin: 1rem 0;
        }
        .pill {
            background: rgba(255,255,255,0.1);
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.85rem;
        }
        .plot {
            font-size: 1.1rem;
            line-height: 1.6;
            margin-bottom: 1.5rem;
            opacity: 0.9;
        }
        .details-actions {
            margin-top: 2rem;
            display: flex;
            gap: 1rem;
        }
        @media(max-width: 768px) {
            .details-header { flex-direction: column; align-items: center; text-align: center; }
        }
      `}</style>
    </div>
  );
}
