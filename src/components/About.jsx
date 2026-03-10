import { useEffect, useState } from 'react'
import { getAllReviews, resolveAssetUrl } from '../lib/reviews'

export default function About() {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    getAllReviews().then(setReviews).catch(() => setReviews([]))
  }, [])

  return (
    <section className="section-padding container" style={{ color: '#fff' }}>
      <h2 className="section-title">About Us</h2>

      <p style={{ color: '#fff', lineHeight: 1.8 }}>
        Duffus Flooring began as a small, family-operated trade business built on craftsmanship, integrity, and attention to detail. Over the years, it has grown into a trusted full-service flooring company known for delivering exceptional results across residential and commercial projects.
      </p>

      <p style={{ color: '#fff', lineHeight: 1.8 }}>
        With over 25 years of hands-on industry experience, Duffus Flooring combines traditional workmanship with modern materials and installation techniques. Every project is approached with precision, professionalism, and a commitment to long-term durability — because flooring is not just a surface, it is the foundation of every space.
      </p>

      <p style={{ color: '#fff', lineHeight: 1.8 }}>
        We believe quality flooring should enhance both the beauty and functionality of your home or business. That’s why we prioritize premium materials, meticulous installation, and clear communication from consultation to completion.
      </p>

      <h3 style={{ color: '#fff', marginTop: 20 }}>Our Mission</h3>
      <p style={{ color: '#fff', lineHeight: 1.6 }}>
        To provide beautiful, durable flooring solutions through honest pricing, expert craftsmanship, and dependable service — ensuring every client feels confident and proud of their space.
      </p>

      <h3 style={{ color: '#fff', marginTop: 20 }}>Meet the Founder</h3>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 8 }}>
        <img src="https://placehold.co/64x64/e0e0e0/333?text=HD" alt="Howard Duffus" style={{ borderRadius: '50%' }} />
        <div>
          <strong>Howard Duffus</strong>
          <div style={{ color: '#ddd' }}>Founder & Lead Installer — 25+ Years of Experience</div>
          <div style={{ color: '#ddd', marginTop: 6, maxWidth: 740 }}>
            Howard Duffus brings over two decades of professional flooring expertise to every project. His extensive experience spans residential renovations, new construction, and commercial installations. Known for precision workmanship and reliability, Howard personally oversees each job to ensure it meets the highest standards of quality and client satisfaction.
          </div>
          <div style={{ color: '#ddd', marginTop: 8, maxWidth: 740 }}>
            His dedication to craftsmanship and customer service is the foundation upon which Duffus Flooring continues to grow.
          </div>
        </div>
      </div>

      

      <hr style={{ margin: '40px 0 30px', borderColor: 'rgba(255,255,255,0.08)' }} />

      <h3 style={{ color: '#fff' }}>Customer Reviews</h3>

      <div style={{ marginTop: 20 }}>
        {reviews.length === 0 && <p style={{ color: '#ddd' }}>No reviews yet — be the first to leave feedback.</p>}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
          {reviews.slice(0, 6).map(r => (
            <div key={r.id} style={{ background: 'rgba(255,255,255,0.03)', padding: 12, borderRadius: 10 }} data-aos="fade-up">
              <div>
                <strong style={{ color: '#fff' }}>{r.name}</strong>
                <div style={{ color: '#ffd880' }}>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</div>
                <p style={{ color: '#ddd', marginTop: 8, fontSize: '0.95rem' }}>{r.text.length > 140 ? r.text.slice(0, 137) + '...' : r.text}</p>
                {r.image && (
                  <div style={{ marginTop: 8 }}>
                    <img
                      src={resolveAssetUrl(r.image)} alt="review"
                      style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 8, cursor: 'zoom-in' }}
                      onClick={() => window.dispatchEvent(new CustomEvent('open-lightbox', { detail: { src: resolveAssetUrl(r.image) } }))}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <a href="#reviews" className="btn btn-secondary">View more reviews</a>
        </div>
      </div>
    </section>
  )
}
