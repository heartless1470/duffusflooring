import { useEffect, useState } from 'react'
import { readFileAsDataUrl, saveLocalReview } from '../lib/reviews'

const REVIEW_ENDPOINT = import.meta.env.VITE_REVIEW_ENDPOINT || 'https://formsubmit.co/ajax/howardduffus@gmail.com'

export default function LeaveReview() {
  const [name, setName] = useState('')
  const [rating, setRating] = useState(5)
  const [text, setText] = useState('')
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [fileError, setFileError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    return () => { if (preview) URL.revokeObjectURL(preview) }
  }, [preview])

  function handleFileChange(file) {
    setFileError('')
    if (!file) { setImage(null); setPreview(null); return }
    const allowed = ['image/jpeg','image/png','image/webp']
    const maxBytes = 3 * 1024 * 1024
    if (!allowed.includes(file.type)) { setFileError('Only JPG, PNG or WEBP images are allowed.'); setImage(null); setPreview(null); return }
    if (file.size > maxBytes) { setFileError('Image too large — max 3MB.'); setImage(null); setPreview(null); return }
    setImage(file)
    setPreview(URL.createObjectURL(file))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!name || !text) return alert('Please provide name and review text.')
    setSubmitting(true)
    try {
      const form = new FormData()
      form.append('name', name)
      form.append('rating', String(rating))
      form.append('text', text)
      form.append('_subject', 'Duffus Flooring New Review')
      if (image) form.append('attachment', image)

      const res = await fetch(REVIEW_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: form
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Unknown' }))
        throw new Error(err.error || 'Failed')
      }
      const imageDataUrl = image ? await readFileAsDataUrl(image) : null
      saveLocalReview({ name, rating, text, image: imageDataUrl })
      alert('Thanks — your review was submitted.')
      window.location.hash = 'home'
    } catch (err) {
      try {
        const imageDataUrl = image ? await readFileAsDataUrl(image) : null
        saveLocalReview({ name, rating, text, image: imageDataUrl })
        alert('Your review was saved on this device and will still appear on the site.')
        window.location.hash = 'home'
      } catch {
        alert('Could not submit review — ' + (err.message || 'check connection and try again'))
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="section-padding container" style={{ color: '#fff' }}>
      <h2 className="section-title">Leave a Review</h2>
      <p style={{ color: '#ddd' }}>Share your experience — you can optionally add a photo of the finished floor.</p>

      <div style={{ maxWidth: 720 }}>
        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', marginTop: 10, color: '#ddd' }}>Name</label>
          <input value={name} onChange={e => setName(e.target.value)} required style={{ width: '100%', padding: 8, borderRadius: 6, border: 'none', marginTop: 6 }} />

          <label style={{ display: 'block', marginTop: 10, color: '#ddd' }}>Rating</label>
          <select value={rating} onChange={e => setRating(Number(e.target.value))} style={{ width: '100%', padding: 8, borderRadius: 6, border: 'none', marginTop: 6 }}>
            {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} star{n>1?'s':''}</option>)}
          </select>

          <label style={{ display: 'block', marginTop: 10, color: '#ddd' }}>Review</label>
          <textarea value={text} onChange={e => setText(e.target.value)} required style={{ width: '100%', padding: 8, borderRadius: 6, border: 'none', marginTop: 6, minHeight: 140 }} />

          <label style={{ display: 'block', marginTop: 10, color: '#ddd' }}>Optional Image</label>
          <input type="file" accept="image/png,image/jpeg,image/webp" onChange={e => handleFileChange(e.target.files?.[0] || null)} style={{ marginTop: 6 }} />
          {fileError && <div style={{color:'#ffb3b3', marginTop:6}}>{fileError}</div>}
          {preview && <div style={{marginTop:10}}><img src={preview} alt="preview" style={{maxWidth:'100%', borderRadius:6}} /></div>}

          <button type="submit" className="btn btn-primary" disabled={submitting} style={{ marginTop: 12 }}>{submitting? 'Submitting...' : 'Submit Review'}</button>
        </form>
      </div>
    </section>
  )
}
