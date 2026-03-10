import { createHandler, getCollection, readJsonBody, requireAdmin, setCollection } from '../../_lib/store.js'

export default createHandler(async function handler(req, res) {
  if (!requireAdmin(req, res)) return

  const { id } = req.query
  const projects = await getCollection('projects')
  const idx = projects.findIndex((p) => p.id === id)
  if (idx < 0) return res.status(404).json({ error: 'Not found' })

  if (req.method === 'PUT') {
    const body = await readJsonBody(req)
    const prev = projects[idx]
    projects[idx] = {
      ...prev,
      title: body.title ? String(body.title).slice(0, 120) : prev.title,
      location: body.location !== undefined ? String(body.location).slice(0, 160) : prev.location,
      type: body.type ? String(body.type).slice(0, 80) : prev.type,
      description: body.description ? String(body.description).slice(0, 2000) : prev.description,
      images: Array.isArray(body.images) && body.images.length > 0 ? body.images.filter(Boolean) : prev.images,
      coverImage: body.coverImage !== undefined ? body.coverImage : prev.coverImage
    }
    await setCollection('projects', projects)
    return res.status(200).json(projects[idx])
  }

  if (req.method === 'DELETE') {
    await setCollection('projects', projects.filter((p) => p.id !== id))
    return res.status(200).json({ ok: true })
  }

  return res.status(405).json({ error: 'Method not allowed' })
})
