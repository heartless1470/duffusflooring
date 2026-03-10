const STATIC_REVIEWS_URL = '/data/reviews.json'
const REVIEW_STORAGE_KEY = 'duffus-flooring-local-reviews-v1'

function safeJsonParse(value, fallback) {
  try {
    return JSON.parse(value)
  } catch {
    return fallback
  }
}

export function resolveAssetUrl(path) {
  if (!path) return null
  if (/^https?:\/\//i.test(path) || path.startsWith('data:')) return path
  const normalized = String(path).replace(/^\.?\//, '')
  return `/${encodeURI(normalized)}`
}

function normalizeReview(item, source = 'remote') {
  if (!item) return null
  const rating = Math.max(1, Math.min(5, Number(item.rating) || 5))
  const image = resolveAssetUrl(item.image)

  return {
    id: item.id || `${source}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name: String(item.name || 'Anonymous').slice(0, 80),
    rating,
    text: String(item.text || '').slice(0, 2000),
    image,
    createdAt: item.createdAt || new Date().toISOString(),
    source
  }
}

export async function loadStaticReviews() {
  try {
    const response = await fetch(STATIC_REVIEWS_URL, { cache: 'no-store' })
    if (!response.ok) return []
    const data = await response.json()
    if (!Array.isArray(data)) return []
    return data.map((item) => normalizeReview(item, 'static')).filter(Boolean)
  } catch {
    return []
  }
}

export function loadLocalReviews() {
  if (typeof window === 'undefined') return []
  const raw = window.localStorage.getItem(REVIEW_STORAGE_KEY)
  const data = safeJsonParse(raw, [])
  if (!Array.isArray(data)) return []
  return data.map((item) => normalizeReview(item, 'local')).filter(Boolean)
}

export function saveLocalReview(reviewInput) {
  if (typeof window === 'undefined') return null
  const existing = loadLocalReviews()
  const review = normalizeReview(
    {
      ...reviewInput,
      id: `local-${Date.now()}`,
      createdAt: new Date().toISOString()
    },
    'local'
  )
  if (!review) return null

  const next = [review, ...existing].slice(0, 50)
  window.localStorage.setItem(REVIEW_STORAGE_KEY, JSON.stringify(next))
  return review
}

export async function readFileAsDataUrl(file) {
  if (!file) return null
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(typeof reader.result === 'string' ? reader.result : null)
    reader.onerror = () => reject(new Error('Could not read image file'))
    reader.readAsDataURL(file)
  })
}

export async function getAllReviews() {
  const [staticReviews, localReviews] = await Promise.all([
    loadStaticReviews(),
    Promise.resolve(loadLocalReviews())
  ])

  return [...localReviews, ...staticReviews].sort((a, b) => {
    const left = new Date(a.createdAt || 0).getTime()
    const right = new Date(b.createdAt || 0).getTime()
    return right - left
  })
}
