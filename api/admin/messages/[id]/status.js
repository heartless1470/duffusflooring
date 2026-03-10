import { getCollection, readJsonBody, requireAdmin, setCollection } from '../../../_lib/store.js'

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { id } = req.query
  const body = await readJsonBody(req)
  const status = body.status
  if (!['New', 'Contacted', 'Completed'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' })
  }

  const messages = await getCollection('messages')
  const idx = messages.findIndex((m) => m.id === id)
  if (idx < 0) return res.status(404).json({ error: 'Not found' })

  messages[idx] = {
    ...messages[idx],
    status,
    read: status !== 'New'
  }

  await setCollection('messages', messages)
  return res.status(200).json({ ok: true })
}
