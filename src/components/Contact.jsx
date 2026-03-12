import { useState } from 'react'
import { getErrorMessage, parseApiError, resolveApiPath } from '../lib/api'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all required fields')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch(resolveApiPath('/api/contact'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message
        })
      })

      if (res.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '', phone: '', service: '', message: '' })
        setTimeout(() => setSubmitted(false), 8000)
      } else {
        alert(await parseApiError(res, 'Failed to send message. Please try again.'))
      }
    } catch (error) {
      console.error('Failed to send message:', error)
      alert(getErrorMessage(error, 'Failed to send message. Please try again.'))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="section-padding container contact-section" data-aos="fade-up">
      <style>{`
        .contact-section {
          max-width: 900px;
          margin: 0 auto;
        }

        .contact-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .contact-header h2 {
          font-size: 2.5rem;
          margin: 0 0 1rem;
          background: linear-gradient(135deg, #646cff, #ffd880);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .contact-header p {
          color: rgba(255,255,255,0.8);
          font-size: 1.1rem;
          line-height: 1.6;
        }

        .contact-info {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .contact-info-card {
          background: rgba(100,108,255,0.05);
          border: 1px solid rgba(100,108,255,0.2);
          border-radius: 12px;
          padding: 1.5rem;
          text-align: center;
          transition: all 0.3s ease;
        }

        .contact-info-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(100,108,255,0.3);
        }

        .contact-info-card .icon {
          font-size: 2rem;
          margin-bottom: 0.75rem;
        }

        .contact-info-card h3 {
          margin: 0 0 0.5rem;
          font-size: 1rem;
          color: rgba(255,255,255,0.6);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .contact-info-card a,
        .contact-info-card span {
          color: #ffd880;
          text-decoration: none;
          font-size: 1.1rem;
          transition: all 0.3s ease;
        }

        .contact-info-card a:hover {
          color: #fff;
        }

        .contact-form {
          background: rgba(100,108,255,0.05);
          border: 1px solid rgba(100,108,255,0.2);
          border-radius: 16px;
          padding: 2.5rem;
        }

        .contact-form h3 {
          margin: 0 0 2rem;
          font-size: 1.5rem;
          color: #ffd880;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-group label {
          color: rgba(255,255,255,0.8);
          font-weight: 600;
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
        }

        .form-group label .required {
          color: #ff6b6b;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 0.875rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(100,108,255,0.3);
          border-radius: 8px;
          color: #fff;
          font-size: 1rem;
          font-family: inherit;
          transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: rgba(100,108,255,0.6);
          background: rgba(100,108,255,0.1);
        }

        .form-group select option {
          background: #1a1f3a;
          color: #fff;
        }

        .form-group textarea {
          min-height: 150px;
          resize: vertical;
        }

        .submit-btn {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, #646cff, #5b5aff);
          border: none;
          color: #fff;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(100,108,255,0.4);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .success-message {
          background: rgba(52, 211, 153, 0.1);
          border: 1px solid rgba(52, 211, 153, 0.4);
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          text-align: center;
        }

        .success-message h3 {
          margin: 0 0 0.5rem;
          color: #34d399;
          font-size: 1.3rem;
        }

        .success-message p {
          margin: 0;
          color: rgba(255,255,255,0.8);
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
          
          .contact-header h2 {
            font-size: 2rem;
          }
        }
      `}</style>

      <div className="contact-header">
        <h2 data-aos="fade-up">Get in Touch</h2>
        <p data-aos="fade-up" data-aos-delay="100">
          Ready to transform your space? Contact us to see how we can help
        </p>
      </div>

      <div className="contact-info" data-aos="fade-up">
        <div className="contact-info-card">
          <div className="icon">📧</div>
          <h3>Email</h3>
          <span>
            <a href="mailto:duffusflooring@gmail.com" style={{ color: '#fff', textDecoration: 'none' }}>
              duffusflooring@gmail.com
            </a>
          </span>
        </div>
        <div className="contact-info-card">
          <div className="icon">📞</div>
          <h3>Phone</h3>
          <span>+1 (876) 314-1008 / +1 (876) 384-4916</span>
        </div>
      </div>

      {submitted && (
        <div className="success-message" data-aos="fade-up">
          <h3>✓ Message Sent Successfully!</h3>
          <p>Thank you for contacting Duffus Flooring. We've received your message and will reach out to you as soon as possible, usually within 24 hours.</p>
        </div>
      )}

      <form className="contact-form" onSubmit={handleSubmit} data-aos="fade-up" data-aos-delay="200">
        <h3>Contact Us For Assistance</h3>
        
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name">Name <span className="required">*</span></label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(876) 314-1008"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email <span className="required">*</span></label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="service">Service Needed</label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
            >
              <option value="">Select a service...</option>
              <option value="Hardwood Installation">Hardwood Installation</option>
              <option value="Hardwood Refinishing">Hardwood Refinishing</option>
              <option value="Vinyl Flooring">Vinyl Flooring (LVT/LVP)</option>
              <option value="Tile Installation">Tile Installation</option>
              <option value="Deck Installation">Deck Installation</option>
              <option value="Commercial Flooring">Commercial Flooring</option>
              <option value="Subfloor Repair">Subfloor Repair</option>
              <option value="General Inquiry">General Inquiry</option>
            </select>
          </div>

          <div className="form-group full-width">
            <label htmlFor="message">Message <span className="required">*</span></label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your project..."
              required
            />
          </div>
        </div>

        <button type="submit" className="submit-btn" disabled={submitting}>
          {submitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </section>
  )
}
