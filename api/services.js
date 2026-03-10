import { createHandler, getCollection } from './_lib/store.js'

export default createHandler(async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })
  const services = await getCollection('services')
  return res.status(200).json(services)
})
