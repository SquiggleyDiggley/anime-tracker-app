import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function MyList() {
  const [watching, setWatching] = useState([])
  const [completed, setCompleted] = useState([])
  const [plan, setPlan] = useState([])

  useEffect(() => {
    loadLists()
  }, [])

  const loadLists = () => {
    setWatching(JSON.parse(localStorage.getItem('watching')) || [])
    setCompleted(JSON.parse(localStorage.getItem('completed')) || [])
    setPlan(JSON.parse(localStorage.getItem('plan')) || [])
  }

  const removeFromList = (listName, id) => {
    const list = JSON.parse(localStorage.getItem(listName)) || []
    const updated = list.filter((anime) => anime.mal_id !== id)
    localStorage.setItem(listName, JSON.stringify(updated))
    loadLists()
  }

  const renderList = (list, title, color, listKey) => (
    <div className="mb-5">
      <h3 className={`text-${color} fw-bold`}>{title}</h3>
      <div className="row">
        {list.length === 0 ? (
          <p className="text-muted">No anime in this list.</p>
        ) : (
          list.map((anime) => (
            <div className="col-md-4 mb-4" key={anime.mal_id}>
              <div className="card h-100 shadow-sm">
                <img src={anime.image} className="card-img-top" alt={anime.title} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{anime.title}</h5>
                  <p className="text-muted small">Score: {anime.score || 'N/A'}</p>
                  <div className="mt-auto d-flex justify-content-between gap-2">
                    <Link
                      href={`/anime/${anime.mal_id}`}
                      className="btn btn-outline-primary btn-sm"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => removeFromList(listKey, anime.mal_id)}
                      className="btn btn-outline-danger btn-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )

  return (
    <div className="container py-5">
      <h1 className="text-center fw-bold mb-5 text-primary">🎌 My Anime Lists</h1>
      {renderList(watching, '📺 Watching', 'primary', 'watching')}
      {renderList(completed, '✅ Completed', 'success', 'completed')}
      {renderList(plan, '📌 Plan to Watch', 'warning', 'plan')}

      <div className="text-center mt-4">
        <Link href="/" className="btn btn-outline-secondary">
          ← Back to Search
        </Link>
      </div>
    </div>
  )
}
