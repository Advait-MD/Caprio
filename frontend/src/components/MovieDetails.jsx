import React from 'react'

export default function MovieDetails({ movie }) {
  if (!movie) return null
  const providers = (movie['watch/providers'] && movie['watch/providers'].results && movie['watch/providers'].results.US) || null
  return (
    <div>
      <h3>{movie.title}</h3>
      <p>{movie.overview}</p>
      <div>
        <strong>Genres:</strong> {movie.genres && movie.genres.map(g => g.name).join(', ')}
      </div>
      <div>
        <strong>Where to watch (US):</strong>
        {providers ? (
          <div>
            {providers.flatrate && <div>Flatrate: {providers.flatrate.map(p=>p.provider_name).join(', ')}</div>}
            {providers.rent && <div>Rent: {providers.rent.map(p=>p.provider_name).join(', ')}</div>}
            {providers.buy && <div>Buy: {providers.buy.map(p=>p.provider_name).join(', ')}</div>}
          </div>
        ) : (
          <span> Not available</span>
        )}
      </div>
    </div>
  )
}
