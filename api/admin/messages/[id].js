import { getCollection, requireAdmin, setCollection } from '../../_lib/store.js'

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return
  if (req.method !== 'DELETE') return res.status(405).json({ error: 'Method not allowed' })

  const { id } = req.query
  const messages = await getCollection('messages')
  const exists = messages.some((m) => m.id === id)
  if (!exists) return res.status(404).json({ error: 'Not found' })

  await setCollection('messages', messages.filter((m) => m.id !== id))
  return res.status(200).json({ ok: true })
}
