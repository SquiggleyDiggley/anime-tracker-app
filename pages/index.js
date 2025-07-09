import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  const searchAnime = async (e) => {
    e.preventDefault()
    if (!query) return

    const res = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&limit=10`)
    const data = await res.json()
    setResults(data.data || [])
  }

  return (
    <div className="container py-5">
      <h1 className="text-center text-primary fw-bold mb-4">🎌 Anime Tracker</h1>

      <form onSubmit={searchAnime} className="d-flex mb-4">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Search anime..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">Search</button>
      </form>

      <div className="row">
        {results.map((anime) => (
          <div className="col-md-4 mb-4" key={anime.mal_id}>
            <div className="card h-100 shadow-sm">
              <img
                src={anime.images.jpg.image_url}
                className="card-img-top"
                alt={anime.title}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{anime.title}</h5>
                <p className="card-text small text-muted mb-2">
                  Score: {anime.score || 'N/A'} | Episodes: {anime.episodes || '??'}
                </p>
                <Link
                  href={`/anime/${anime.mal_id}`}
                  className="btn btn-outline-primary btn-sm mt-auto"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
