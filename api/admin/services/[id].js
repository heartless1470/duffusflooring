import { createHandler, getCollection, readJsonBody, requireAdmin, setCollection } from '../../_lib/store.js'

export default createHandler(async function handler(req, res) {
  if (!requireAdmin(req, res)) return

  const { id } = req.query
  const services = await getCollection('services')
  const idx = services.findIndex((s) => s.id === id)
  if (idx < 0) return res.status(404).json({ error: 'Not found' })

  if (req.method === 'PUT') {
    const body = await readJsonBody(req)
    const prev = services[idx]
    services[idx] = {
      ...prev,
      name: body.name ? String(body.name).slice(0, 140) : prev.name,
      description: body.description ? String(body.description).slice(0, 3000) : prev.description,
      image: body.image !== undefined ? body.image : prev.image
    }

    await setCollection('services', services)
    return res.status(200).json(services[idx])
  }

  if (req.method === 'DELETE') {
    await setCollection('services', services.filter((s) => s.id !== id))
    return res.status(200).json({ ok: true })
  }

  return res.status(405).json({ error: 'Method not allowed' })
})
