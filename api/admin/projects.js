import { getCollection, readJsonBody, requireAdmin, setCollection, uid } from '../_lib/store.js'

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return

  if (req.method === 'GET') {
    const projects = await getCollection('projects')
    return res.status(200).json(projects)
  }

  if (req.method === 'POST') {
    const body = await readJsonBody(req)
    if (!body.title || !body.description) return res.status(400).json({ error: 'Missing required fields' })

    const project = {
      id: uid('project'),
      title: String(body.title).slice(0, 120),
      location: String(body.location || '').slice(0, 160),
      type: String(body.type || '').slice(0, 80),
      description: String(body.description).slice(0, 2000),
      images: Array.isArray(body.images) ? body.images.filter(Boolean) : [],
      coverImage: body.coverImage ? String(body.coverImage) : null,
      createdAt: new Date().toISOString()
    }

    const projects = await getCollection('projects')
    projects.push(project)
    await setCollection('projects', projects)
    return res.status(200).json(project)
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
