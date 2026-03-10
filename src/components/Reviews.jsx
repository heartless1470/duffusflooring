import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000'

export default function Reviews() {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    fetch(`${API_BASE}/api/reviews`).then(r => r.json()).then(setReviews).catch(() => setReviews([]))
  }, [])

  return (
    <section className="section-padding container" style={{ color: '#fff' }}>
      <h2 className="section-title">All Reviews</h2>
      <p style={{ color: '#ddd' }}>Browse reviews from our customers. Click images to view larger.</p>

      <div style={{ display: 'grid', gap: 18, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', marginTop: 20 }}>
        {reviews.length === 0 && <p style={{ color: '#ddd' }}>No reviews yet.</p>}
        {reviews.map(r => (
          <div key={r.id} style={{ background: 'rgba(255,255,255,0.03)', padding: 14, borderRadius: 10 }} data-aos="fade-up">
            <div>
              <strong style={{ color: '#fff' }}>{r.name}</strong>
              <div style={{ color: '#ffd880' }}>{'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}</div>
            </div>
            <p style={{ color: '#ddd', marginTop: 8 }}>{r.text}</p>
            {r.image && (
              <div style={{ marginTop: 10 }}>
                <img
                  src={`${API_BASE}/${r.image}`} alt="review"
                  style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 8, cursor: 'zoom-in' }}
                  onClick={() => window.dispatchEvent(new CustomEvent('open-lightbox', { detail: { src: `${API_BASE}/${r.image}` } }))}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
