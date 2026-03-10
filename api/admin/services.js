import { createHandler, getCollection, readJsonBody, requireAdmin, setCollection, uid } from '../_lib/store.js'

export default createHandler(async function handler(req, res) {
  if (!requireAdmin(req, res)) return

  if (req.method === 'GET') {
    const services = await getCollection('services')
    return res.status(200).json(services)
  }

  if (req.method === 'POST') {
    const body = await readJsonBody(req)
    if (!body.name || !body.description) return res.status(400).json({ error: 'Missing required fields' })

    const service = {
      id: uid('service'),
      name: String(body.name).slice(0, 140),
      description: String(body.description).slice(0, 3000),
      image: body.image ? String(body.image) : null,
      createdAt: new Date().toISOString()
    }

    const services = await getCollection('services')
    services.push(service)
    await setCollection('services', services)
    return res.status(200).json(service)
  }

  return res.status(405).json({ error: 'Method not allowed' })
})
