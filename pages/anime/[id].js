import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function AnimeDetail() {
  const router = useRouter()
  const { id } = router.query
  const [anime, setAnime] = useState(null)

  useEffect(() => {
    if (!id) return

    const fetchAnime = async () => {
      const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`)
      const data = await res.json()
      setAnime(data.data)
    }

    fetchAnime()
  }, [id])

  const saveToList = (listName) => {
    const stored = localStorage.getItem(listName)
    const currentList = stored ? JSON.parse(stored) : []

    const exists = currentList.some((item) => item.mal_id === anime.mal_id)
    if (exists) {
      alert(`Already in ${listName} list!`)
      return
    }

    currentList.push({
      mal_id: anime.mal_id,
      title: anime.title,
      image: anime.images.jpg.image_url,
      score: anime.score
    })

    localStorage.setItem(listName, JSON.stringify(currentList))
    alert(`Added to ${listName} list! ✅`)
  }

  if (!anime) {
    return (
      <div className="container py-5 text-center">
        <p className="text-muted">Loading anime details...</p>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8">
          <div className="card shadow-sm p-4 bg-light">
            <div className="text-center mb-4">
              <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
                className="img-fluid rounded"
                style={{ maxHeight: '400px' }}
              />
            </div>

            <h2 className="text-primary fw-bold">{anime.title}</h2>
            <h5 className="text-muted mb-3">{anime.title_japanese}</h5>

            <p><strong>Episodes:</strong> {anime.episodes || 'Unknown'}</p>
            <p><strong>Status:</strong> {anime.status}</p>
            <p><strong>Score:</strong> {anime.score || 'N/A'}</p>
            <p><strong>Rating:</strong> {anime.rating}</p>

            <p className="mt-4"><strong>Synopsis:</strong></p>
            <p>{anime.synopsis}</p>

            <div className="d-flex gap-2 mt-4 flex-wrap">
              <button onClick={() => saveToList('watching')} className="btn btn-primary">
                📺 Add to Watching
              </button>
              <button onClick={() => saveToList('completed')} className="btn btn-success">
                ✅ Mark as Completed
              </button>
              <button onClick={() => saveToList('plan')} className="btn btn-warning">
                📌 Plan to Watch
              </button>
            </div>

            <Link href="/" className="btn btn-outline-secondary mt-4">
              ← Back to Search
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
