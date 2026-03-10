import { getCollection, readJsonBody, setCollection, uid } from './_lib/store.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const body = await readJsonBody(req)
  if (!body.name || !body.email || !body.message) {
    return res.status(400).json({ error: 'Name, email, and message are required' })
  }

  const messages = await getCollection('messages')
  messages.push({
    id: uid('message'),
    name: String(body.name).slice(0, 100),
    email: String(body.email).slice(0, 200),
    phone: String(body.phone || '').slice(0, 60),
    service: String(body.service || '').slice(0, 120),
    message: String(body.message).slice(0, 2000),
    status: 'New',
    read: false,
    createdAt: new Date().toISOString()
  })

  await setCollection('messages', messages)
  return res.status(200).json({ ok: true })
}
