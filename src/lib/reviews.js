import { resolveApiPath } from './api'

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
  try {
    const response = await fetch(resolveApiPath('/api/reviews'), { cache: 'no-store' })
    if (response.ok) {
      const data = await response.json()
      if (Array.isArray(data)) {
        return data.map((item) => normalizeReview(item, 'remote')).filter(Boolean)
      }
    }
  } catch {
    return []
  }

  return []
}
