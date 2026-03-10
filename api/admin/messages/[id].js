import { createHandler, getCollection, readJsonBody, requireAdmin, setCollection } from '../../_lib/store.js'

export default createHandler(async function handler(req, res) {
  if (!requireAdmin(req, res)) return

  const { id } = req.query
  const messages = await getCollection('messages')
  const idx = messages.findIndex((m) => m.id === id)
  if (idx < 0) return res.status(404).json({ error: 'Not found' })

  if (req.method === 'POST') {
    const body = await readJsonBody(req)
    const status = body.status
    if (!['New', 'Contacted', 'Completed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' })
    }

    messages[idx] = {
      ...messages[idx],
      status,
      read: status !== 'New'
    }

    await setCollection('messages', messages)
    return res.status(200).json({ ok: true })
  }

  if (req.method === 'DELETE') {
    await setCollection('messages', messages.filter((m) => m.id !== id))
    return res.status(200).json({ ok: true })
  }

  return res.status(405).json({ error: 'Method not allowed' })
})
