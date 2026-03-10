import { createHandler, getCollection, requireAdmin, setCollection } from '../../_lib/store.js'

export default createHandler(async function handler(req, res) {
  if (!requireAdmin(req, res)) return
  if (req.method !== 'DELETE') return res.status(405).json({ error: 'Method not allowed' })

  const { id } = req.query
  const reviews = await getCollection('reviews')
  const exists = reviews.some((r) => r.id === id)
  if (!exists) return res.status(404).json({ error: 'Not found' })

  await setCollection('reviews', reviews.filter((r) => r.id !== id))
  return res.status(200).json({ ok: true })
})
