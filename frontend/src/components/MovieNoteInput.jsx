import React, { useState } from 'react';

export default function MovieNoteInput({ onAnalyze, isLoading }) {
    const [note, setNote] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (note.trim()) {
            onAnalyze(note);
            setNote('');
        }
    };

    return (
        <div className="note-input-container">
            <form onSubmit={handleSubmit}>
                <textarea
                    className="glass-input"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Tell me about a movie you watched recently... How did it make you feel? What did you like?"
                    rows={4}
                    disabled={isLoading}
                />
                <button type="submit" className="glass-button primary" disabled={isLoading || !note.trim()}>
                    {isLoading ? 'Analyzing...' : 'Analyze Taste'}
                </button>
            </form>
        </div>
    );
}
