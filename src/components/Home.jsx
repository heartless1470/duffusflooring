import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000'

export default function Home() {
  const [featured, setFeatured] = useState([])
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    let mounted = true
    fetch(`${API_BASE}/api/reviews`).then(r => r.json()).then(list => {
      if (!mounted) return
      const high = (list || []).filter(x => Number(x.rating) >= 4)
      setFeatured(high)
      setCurrent(0)
    }).catch(() => {})
    return () => { mounted = false }
  }, [])

  useEffect(() => {
    if (paused || featured.length <= 1) return
    const id = setInterval(() => setCurrent(c => (c + 1) % featured.length), 4000)
    return () => clearInterval(id)
  }, [featured, paused])

  return (
    <>
      <section id="home" className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content container" data-aos="fade-up" data-aos-duration="1000">
          <h1>Elevate Your Space with <span className="highlight-text">Premium Flooring</span></h1>
          <p>Expert craftsmanship in Hardwood, Tile, and Luxury Vinyl. Transforming homes with timeless elegance and modern durability.</p>
          <div className="hero-buttons">
            <a href="#portfolio" className="btn btn-primary">View Our Work</a>
            <a href="#contact" className="btn btn-outline">Get a Quote</a>
          </div>
        </div>
        <div className="scroll-down">
          <i className="fas fa-chevron-down"></i>
        </div>
      </section>

      <section id="services" className="services-preview section-padding">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">Our Expertise</h2>
          <div className="services-grid">
            <div className="service-card" data-aos="fade-up" data-aos-delay="100">
              <div className="icon-box">
                <i className="fas fa-tree service-icon"></i>
              </div>
              <h3>Hardwood Flooring</h3>
              <p>Timeless elegance and durability. We specialize in installation, refinishing, and repairs of all hardwood types.</p>
            </div>
            <div className="service-card" data-aos="fade-up" data-aos-delay="200">
              <div className="icon-box">
                <i className="fas fa-layer-group service-icon"></i>
              </div>
              <h3>Luxury Vinyl</h3>
              <p>Modern, waterproof, and stylish. Perfect for high-traffic areas without compromising on aesthetics.</p>
            </div>
            <div className="service-card" data-aos="fade-up" data-aos-delay="300">
              <div className="icon-box">
                <i className="fas fa-th service-icon"></i>
              </div>
              <h3>Tile &amp; Stone</h3>
              <p>Custom tile work for kitchens, bathrooms, and entryways. Precision installation for a flawless finish.</p>
            </div>
          </div>
          <div className="text-center mt-5" data-aos="fade-up">
            <a href="#services" className="btn btn-secondary">View All Services</a>
          </div>
        </div>
      </section>

      <section id="about" className="about-preview section-padding">
        <div className="container">
          <div className="about-content" data-aos="fade-right">
            <h2 className="section-title text-left">Why Choose Us?</h2>
            <p>With years of experience and a passion for perfection, Duffus Flooring delivers superior quality and customer satisfaction. We treat every home as if it were our own, ensuring meticulous attention to detail from the first plank to the final polish.</p>
            <ul className="feature-list">
              <li><i className="fas fa-check-circle"></i> Licensed Professionals</li>
              <li><i className="fas fa-check-circle"></i> Premium Materials Only</li>
              <li><i className="fas fa-check-circle"></i> Satisfaction Guaranteed</li>
            </ul>
            <a href="#about" className="btn btn-primary mt-4">Learn More</a>
          </div>
          <div className="about-image" data-aos="fade-left">
            <div className="image-wrapper">
              <i className="fas fa-drafting-compass"></i>
            </div>
          </div>
        </div>
      </section>

      <section id="portfolio" className="featured-projects section-padding">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">Featured Projects</h2>
          <div className="project-grid">
            <a href="#portfolio/roof%20top%20deck" className="project-item project-link always-show" data-aos="zoom-in" data-aos-delay="100">
              <img src="/hero.jpg" alt="Roof Top Deck" />
              <div className="project-overlay">
                <h3>Roof Top Deck</h3>
                <p>Rooftop Deck Installation</p>
                <span className="view-project-btn" aria-hidden="true"><i className="fas fa-arrow-right"></i></span>
              </div>
            </a>
            <a href="#portfolio/bedroom%20hardwood" className="project-item project-link always-show" data-aos="zoom-in" data-aos-delay="200">
              <img src="/bedroom hardwood/621140552_17924151783069573_2879626915241593870_n.webp" alt="Classic Hardwood Living Room" />
              <div className="project-overlay">
                <h3>Living Room</h3>
                <p>Classic Hardwood Refinishing</p>
                <span className="view-project-btn" aria-hidden="true"><i className="fas fa-arrow-right"></i></span>
              </div>
            </a>
          </div>
          <div className="text-center mt-5" data-aos="fade-up">
            <a href="#portfolio" className="btn btn-outline-dark">View Portfolio</a>
          </div>
        </div>
      </section>

      <section id="testimonials" className="section-padding">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">What Our Clients Say</h2>

          <div
            style={{ position: 'relative', maxWidth: 900, margin: '0 auto', padding: 20 }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            data-aos="fade-up"
          >
            {featured.length === 0 && <p style={{color:'#ddd'}}>No testimonials yet.</p>}

            {featured.length > 0 && (
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: 24, borderRadius: 12 }}>
                {featured.map((r, idx) => (
                  <div key={r.id} style={{ display: idx === current ? 'block' : 'none' }}>
                    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                      <div>
                        <strong style={{ color: '#fff', fontSize: '1.15rem' }}>{r.name}</strong>
                        <div style={{ color: '#ffd880' }}>{'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}</div>
                      </div>
                    </div>
                    <p style={{ color: '#ddd', marginTop: 12 }}>{r.text}</p>
                    {r.image && (
                      <div style={{ marginTop: 12, textAlign: 'center' }}>
                        <img
                          src={`${API_BASE}/${r.image}`}
                          alt="review"
                          style={{ width: '100%', maxWidth: 360, height: 220, objectFit: 'cover', borderRadius: 8, cursor: 'zoom-in' }}
                          onClick={() => window.dispatchEvent(new CustomEvent('open-lightbox', { detail: { src: `${API_BASE}/${r.image}` } }))}
                        />
                      </div>
                    )}
                  </div>
                ))}

                {featured.length > 1 && (
                  <>
                    <button onClick={() => setCurrent(c => (c - 1 + featured.length) % featured.length)} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: '#fff', fontSize: 24, cursor: 'pointer' }} aria-label="Previous">‹</button>
                    <button onClick={() => setCurrent(c => (c + 1) % featured.length)} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: '#fff', fontSize: 24, cursor: 'pointer' }} aria-label="Next">›</button>
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 12 }}>
                      {featured.map((_, i) => (
                        <button key={i} onClick={() => setCurrent(i)} style={{ width: 10, height: 10, borderRadius: '50%', background: i === current ? '#ffd880' : 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer' }} aria-label={`Show testimonial ${i+1}`} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

          </div>

          <div className="text-center mt-4"><a href="#leave-review" className="btn btn-secondary">Leave a Review</a></div>
        </div>
      </section>
    </>
  )
}
