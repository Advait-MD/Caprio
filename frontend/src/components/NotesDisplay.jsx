import React from 'react';

export default function NotesDisplay({ notes }) {
    if (!notes || notes.length === 0) return null;

    return (
        <div className="notes-grid">
            {notes.map((item, index) => (
                <div key={index} className="note-card glass-panel fade-in">
                    <p className="note-text">"{item.text}"</p>
                    <div className="note-analysis">
                        <span className="scent-tag">{item.analysis?.topGenre}</span>
                        <span className="mood-tag">{item.analysis?.mood}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
