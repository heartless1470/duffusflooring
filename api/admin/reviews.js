import { createHandler, getCollection, requireAdmin } from '../_lib/store.js'

export default createHandler(async function handler(req, res) {
  if (!requireAdmin(req, res)) return
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })
  const reviews = await getCollection('reviews')
  const ordered = [...reviews].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
  return res.status(200).json(ordered)
})
