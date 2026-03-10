const express = require('express')
const cors = require('cors')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const { v4: uuid } = require('uuid')

const app = express()
const PORT = process.env.PORT || 4000

// Default admin key if none provided in environment (convenience for local/dev):
process.env.ADMIN_KEY = process.env.ADMIN_KEY || 'emberveil'

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

const DATA_FILE = path.join(__dirname, 'reviews.json')
const MESSAGES_FILE = path.join(__dirname, 'messages.json')
const PROJECTS_FILE = path.join(__dirname, 'projects.json')
const SERVICES_FILE = path.join(__dirname, 'services.json')
const uploadDir = path.join(__dirname, 'uploads')
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })
if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]')
if (!fs.existsSync(MESSAGES_FILE)) fs.writeFileSync(MESSAGES_FILE, '[]')
if (!fs.existsSync(PROJECTS_FILE)) fs.writeFileSync(PROJECTS_FILE, JSON.stringify([
  {
    id: 'rooftop-deck',
    title: 'Roof Top Deck',
    location: '',
    type: 'Deck',
    description: 'Professional rooftop deck installation with premium materials. Featured multiple images and video documentation.',
    image: null,
    createdAt: '2026-01-15T10:00:00.000Z'
  },
  {
    id: 'bedroom-hardwood',
    title: 'Bedroom Hardwood Installation',
    location: '',
    type: 'Hardwood',
    description: 'Complete bedroom hardwood flooring installation with professional finish.',
    image: null,
    createdAt: '2026-01-20T10:00:00.000Z'
  },
  {
    id: 'deck-projects',
    title: 'Custom Deck Projects',
    location: '',
    type: 'Deck',
    description: 'Multiple custom deck installations featuring quality craftsmanship and attention to detail.',
    image: null,
    createdAt: '2026-01-25T10:00:00.000Z'
  },
  {
    id: 'hardwood-stairs',
    title: 'Hardwood Stairs Installation',
    location: '',
    type: 'Hardwood',
    description: 'Professional hardwood stair installation and refinishing services.',
    image: null,
    createdAt: '2026-02-01T10:00:00.000Z'
  },
  {
    id: 'vinyl-flooring',
    title: 'Vinyl Flooring Projects',
    location: '',
    type: 'Vinyl',
    description: 'High-quality vinyl flooring installations for residential properties.',
    image: null,
    createdAt: '2026-02-10T10:00:00.000Z'
  }
], null, 2))
if (!fs.existsSync(SERVICES_FILE)) fs.writeFileSync(SERVICES_FILE, JSON.stringify([
  { 
    id: 'hardwood', 
    name: 'Hardwood Installation & Refinishing', 
    description: 'Premium hardwood flooring installed and refinished with precision to enhance durability and natural beauty. Includes solid and engineered hardwood installation, sanding and refinishing, custom stain and finish options, and board replacement and repairs.', 
    image: null,
    createdAt: '2026-01-01T10:00:00.000Z'
  },
  { 
    id: 'vinyl', 
    name: 'Luxury Vinyl Tile (LVT) & Luxury Vinyl Plank (LVP)', 
    description: 'Durable, water-resistant flooring solutions that replicate natural wood while offering easy maintenance. Professional LVT & LVP installation for residential and commercial applications with modern, low-maintenance finishes.', 
    image: null,
    createdAt: '2026-01-02T10:00:00.000Z'
  },
  { 
    id: 'tile', 
    name: 'Tile Installation', 
    description: 'Coordinated tile installations completed by trusted trade professionals to meet high workmanship standards. Floor tile installation, bathroom tile flooring, and entryways and high-traffic areas.', 
    image: null,
    createdAt: '2026-01-03T10:00:00.000Z'
  },
  { 
    id: 'commercial', 
    name: 'Commercial Flooring Solutions', 
    description: 'Reliable flooring systems designed to withstand heavy use while maintaining a clean, professional appearance. Office and retail installations, rental property flooring, and multi-unit developments with durable, high-traffic materials.', 
    image: null,
    createdAt: '2026-01-04T10:00:00.000Z'
  },
  { 
    id: 'repairs', 
    name: 'Subfloor Preparation, Leveling & Repairs', 
    description: 'A strong foundation ensures long-term performance — we prepare and inspect every surface before installation. Subfloor inspection and preparation, surface leveling, structural repairs, and maintenance solutions.', 
    image: null,
    createdAt: '2026-01-05T10:00:00.000Z'
  }
], null, 2))

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/[^a-z0-9.]/gi,'')}`)
})

// Limit uploads to images (jpeg/png/webp) and 3MB
const upload = multer({
  storage,
  limits: { fileSize: 3 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ok = ['image/jpeg', 'image/png', 'image/webp']
    if (ok.includes(file.mimetype)) cb(null, true)
    else cb(new Error('Invalid file type'))
  }
})

function readData() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8') || '[]')
  } catch (e) { return [] }
}
function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2))
}

function readMessages() {
  try {
    return JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf8') || '[]')
  } catch (e) { return [] }
}
function writeMessages(data) {
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(data, null, 2))
}

function readProjects() {
  try {
    return JSON.parse(fs.readFileSync(PROJECTS_FILE, 'utf8') || '[]')
  } catch (e) { return [] }
}
function writeProjects(data) {
  fs.writeFileSync(PROJECTS_FILE, JSON.stringify(data, null, 2))
}

function readServices() {
  try {
    return JSON.parse(fs.readFileSync(SERVICES_FILE, 'utf8') || '[]')
  } catch (e) { return [] }
}
function writeServices(data) {
  fs.writeFileSync(SERVICES_FILE, JSON.stringify(data, null, 2))
}

function isAdmin(req) {
  return req.query && req.query.key && req.query.key === process.env.ADMIN_KEY
}

app.get('/api/reviews', (req, res) => {
  const data = readData()
  res.json(data.reverse())
})

app.post('/api/reviews', upload.single('image'), (req, res) => {
  const { name, rating = 5, text } = req.body
  if (!name || !text) return res.status(400).json({ error: 'Missing name or text' })

  const item = {
    id: uuid(),
    name: String(name).slice(0, 80),
    rating: Math.max(1, Math.min(5, Number(rating) || 5)),
    text: String(text).slice(0, 2000),
    image: req.file ? path.join('uploads', path.basename(req.file.path)).replace(/\\/g, '/') : null,
    createdAt: new Date().toISOString()
  }

  const data = readData()
  data.push(item)
  writeData(data)

  res.json(item)
})

// Contact form - store messages to messages.json
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body || {}
  if (!name || !email || !message) return res.status(400).json({ error: 'Missing fields' })

  const msg = {
    id: uuid(),
    name: String(name).slice(0, 100),
    email: String(email).slice(0, 200),
    message: String(message).slice(0, 2000),
    createdAt: new Date().toISOString(),
    read: false
  }

  const msgs = readMessages()
  msgs.push(msg)
  writeMessages(msgs)
  res.json({ ok: true })
})

// Public API endpoints (no auth required)
app.get('/api/services', (req, res) => {
  const services = readServices()
  res.json(services)
})

app.get('/api/projects', (req, res) => {
  const projects = readProjects()
  res.json(projects)
})

// Admin pages and APIs (require key as query param ?key=...)
app.get('/admin', (req, res) => {
  if (isAdmin(req)) {
    return res.sendFile(path.join(__dirname, 'admin.html'))
  }
  res.status(403).send('Forbidden')
})

app.get('/admin/api/reviews', (req, res) => {
  if (!isAdmin(req)) return res.status(403).json({ error: 'Forbidden' })
  const data = readData()
  res.json(data.reverse())
})

app.delete('/admin/api/reviews/:id', (req, res) => {
  if (!isAdmin(req)) return res.status(403).json({ error: 'Forbidden' })
  const id = req.params.id
  let data = readData()
  const exists = data.find(d => d.id === id)
  if (!exists) return res.status(404).json({ error: 'Not found' })
  data = data.filter(d => d.id !== id)
  writeData(data)
  res.json({ ok: true })
})

app.get('/admin/api/messages', (req, res) => {
  if (!isAdmin(req)) return res.status(403).json({ error: 'Forbidden' })
  const msgs = readMessages().reverse()
  res.json(msgs)
})

app.delete('/admin/api/messages/:id', (req, res) => {
  if (!isAdmin(req)) return res.status(403).json({ error: 'Forbidden' })
  const id = req.params.id
  let msgs = readMessages()
  const exists = msgs.find(m => m.id === id)
  if (!exists) return res.status(404).json({ error: 'Not found' })
  msgs = msgs.filter(m => m.id !== id)
  writeMessages(msgs)
  res.json({ ok: true })
})

// Update message status — matches what the React admin panel sends (POST /api/admin/messages/:id)
app.post('/admin/api/messages/:id', (req, res) => {
  if (!isAdmin(req)) return res.status(403).json({ error: 'Forbidden' })
  const { status } = req.body || {}
  if (!['New', 'Contacted', 'Completed'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' })
  }
  const msgs = readMessages()
  const idx = msgs.findIndex(m => m.id === req.params.id)
  if (idx < 0) return res.status(404).json({ error: 'Not found' })
  msgs[idx] = { ...msgs[idx], status, read: status !== 'New' }
  writeMessages(msgs)
  res.json({ ok: true })
})

// Projects API
app.get('/admin/api/projects', (req, res) => {
  if (!isAdmin(req)) return res.status(403).json({ error: 'Forbidden' })
  const projects = readProjects()
  res.json(projects)
})

app.post('/admin/api/projects', upload.any(), (req, res) => {
  if (!isAdmin(req)) return res.status(403).json({ error: 'Forbidden' })
  const { title, location, type, description } = req.body
  if (!title || !description) return res.status(400).json({ error: 'Missing required fields' })

  // Get all image files (from 'images' field for gallery) and cover image
  const imageFiles = req.files ? req.files.filter(f => f.fieldname === 'images') : []
  const coverImageFile = req.files ? req.files.find(f => f.fieldname === 'coverImage') : null

  const project = {
    id: uuid(),
    title,
    location: location || '',
    type: type || '',
    description,
    // Store gallery images
    images: imageFiles.map(f => `/uploads/${path.basename(f.path)}`),
    // Store cover image separately if provided, otherwise use first gallery image
    coverImage: coverImageFile ? `/uploads/${path.basename(coverImageFile.path)}` : (imageFiles.length > 0 ? `/uploads/${path.basename(imageFiles[0].path)}` : null),
    createdAt: new Date().toISOString()
  }

  const projects = readProjects()
  projects.push(project)
  writeProjects(projects)
  res.json(project)
})

app.put('/admin/api/projects/:id', upload.any(), (req, res) => {
  if (!isAdmin(req)) return res.status(403).json({ error: 'Forbidden' })
  const projects = readProjects()
  const project = projects.find(p => p.id === req.params.id)
  if (!project) return res.status(404).json({ error: 'Not found' })

  const { title, location, type, description } = req.body
  if (title) project.title = title
  if (location !== undefined) project.location = location
  if (type) project.type = type
  if (description) project.description = description

  // Handle image updates
  const imageFiles = req.files ? req.files.filter(f => f.fieldname === 'images') : []
  const coverImageFile = req.files ? req.files.find(f => f.fieldname === 'coverImage') : null

  // Only update images if new ones were uploaded
  if (imageFiles.length > 0) {
    project.images = imageFiles.map(f => `/uploads/${path.basename(f.path)}`)
  }
  if (coverImageFile) {
    project.coverImage = `/uploads/${path.basename(coverImageFile.path)}`
  }

  writeProjects(projects)
  res.json(project)
})

app.delete('/admin/api/projects/:id', (req, res) => {
  if (!isAdmin(req)) return res.status(403).json({ error: 'Forbidden' })
  let projects = readProjects()
  const exists = projects.find(p => p.id === req.params.id)
  if (!exists) return res.status(404).json({ error: 'Not found' })
  projects = projects.filter(p => p.id !== req.params.id)
  writeProjects(projects)
  res.json({ ok: true })
})

// Services API
app.get('/admin/api/services', (req, res) => {
  if (!isAdmin(req)) return res.status(403).json({ error: 'Forbidden' })
  const services = readServices()
  res.json(services)
})

app.post('/admin/api/services', upload.single('image'), (req, res) => {
  if (!isAdmin(req)) return res.status(403).json({ error: 'Forbidden' })
  const { name, description } = req.body
  if (!name || !description) return res.status(400).json({ error: 'Missing required fields' })

  const service = {
    id: uuid(),
    name,
    description,
    image: req.file ? `/uploads/${path.basename(req.file.path)}` : null,
    createdAt: new Date().toISOString()
  }

  const services = readServices()
  services.push(service)
  writeServices(services)
  res.json(service)
})

app.put('/admin/api/services/:id', upload.single('image'), (req, res) => {
  if (!isAdmin(req)) return res.status(403).json({ error: 'Forbidden' })
  const services = readServices()
  const service = services.find(s => s.id === req.params.id)
  if (!service) return res.status(404).json({ error: 'Not found' })

  const { name, description } = req.body
  if (name) service.name = name
  if (description) service.description = description
  if (req.file) service.image = `/uploads/${path.basename(req.file.path)}`

  writeServices(services)
  res.json(service)
})

app.delete('/admin/api/services/:id', (req, res) => {
  if (!isAdmin(req)) return res.status(403).json({ error: 'Forbidden' })
  let services = readServices()
  const exists = services.find(s => s.id === req.params.id)
  if (!exists) return res.status(404).json({ error: 'Not found' })
  services = services.filter(s => s.id !== req.params.id)
  writeServices(services)
  res.json({ ok: true })
})

// Public contact form endpoint
app.post('/api/contact', (req, res) => {
  const { name, email, phone, service, message } = req.body
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' })
  }

  const newMessage = {
    id: uuid(),
    name,
    email,
    phone: phone || '',
    service: service || '',
    message,
    status: 'New',
    read: false,
    createdAt: new Date().toISOString()
  }

  const msgs = readMessages()
  msgs.push(newMessage)
  writeMessages(msgs)

  res.json({ ok: true, message: 'Message received successfully' })
})

// Update message status
app.post('/admin/api/messages/:id/read', (req, res) => {
  if (!isAdmin(req)) return res.status(403).json({ error: 'Forbidden' })
  const msgs = readMessages()
  const msg = msgs.find(m => m.id === req.params.id)
  if (!msg) return res.status(404).json({ error: 'Not found' })
  msg.read = true
  writeMessages(msgs)
  res.json({ ok: true })
})

// Update message status (New/Contacted/Completed)
app.post('/admin/api/messages/:id/status', (req, res) => {
  if (!isAdmin(req)) return res.status(403).json({ error: 'Forbidden' })
  const { status } = req.body
  if (!['New', 'Contacted', 'Completed'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' })
  }
  
  const msgs = readMessages()
  const msg = msgs.find(m => m.id === req.params.id)
  if (!msg) return res.status(404).json({ error: 'Not found' })
  
  msg.status = status
  writeMessages(msgs)
  res.json({ ok: true })
})

// Basic error handler for upload errors
app.use((err, req, res, next) => {
  if (err) {
    if (err.message && (err.message.includes('Invalid file type') || err.code === 'LIMIT_FILE_SIZE')) {
      return res.status(400).json({ error: err.message || 'File too large' })
    }
    console.error(err)
    return res.status(500).json({ error: 'Server error' })
  }
  next()
})

app.listen(PORT, () => console.log(`Reviews API running on http://localhost:${PORT}`))
