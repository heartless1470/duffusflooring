import { createHandler, getCollection, readJsonBody, setCollection, uid } from './_lib/store.js'

export default createHandler(async function handler(req, res) {
  if (req.method === 'GET') {
    const reviews = await getCollection('reviews')
    const ordered = [...reviews].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    return res.status(200).json(ordered)
  }

  if (req.method === 'POST') {
    const body = await readJsonBody(req)
    if (!body.name || !body.text) return res.status(400).json({ error: 'Missing name or text' })

    const review = {
      id: uid('review'),
      name: String(body.name).slice(0, 80),
      rating: Math.max(1, Math.min(5, Number(body.rating) || 5)),
      text: String(body.text).slice(0, 2000),
      image: body.image ? String(body.image) : null,
      createdAt: new Date().toISOString()
    }

    const reviews = await getCollection('reviews')
    reviews.push(review)
    await setCollection('reviews', reviews)
    return res.status(200).json(review)
  }

  return res.status(405).json({ error: 'Method not allowed' })
})
