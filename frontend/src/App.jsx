import React, { useState } from 'react'
import MovieNoteInput from './components/MovieNoteInput'
import NotesDisplay from './components/NotesDisplay'
import './index.css'

export default function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState(null);

  const handleAnalyze = async (noteText) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:4000/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: noteText }),
      });
      const data = await response.json();

      const newNote = {
        text: noteText,
        analysis: data.taste
      };

      setNotes([newNote, ...notes]);
      setRecommendations(data.recommendation);
    } catch (error) {
      console.error("Error analyzing note:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header className="app-header">
        <h1>Movie Notes</h1>
      </header>

      <main>
        <MovieNoteInput onAnalyze={handleAnalyze} isLoading={loading} />

        {recommendations && (
          <div className="recommendation-result fade-in" style={{ marginBottom: '3rem' }}>
            <h2 style={{ color: '#fff' }}>Recommended For You</h2>
            <div className="note-card glass-panel" style={{ background: 'rgba(100, 255, 100, 0.1)' }}>
              <h3>{recommendations.Title} ({recommendations.Year})</h3>
              <p>{recommendations.Plot}</p>
              <p style={{ fontSize: '0.9rem', color: '#aaa' }}>{recommendations.Genre}</p>
            </div>
          </div>
        )}

        <NotesDisplay notes={notes} />
      </main>
    </div>
  )
}
