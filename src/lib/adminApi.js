import { readFileAsDataUrl } from './reviews'
import { resolveApiPath } from './api'

export function withAdminKey(path, adminKey) {
  const separator = path.includes('?') ? '&' : '?'
  return `${path}${separator}key=${encodeURIComponent(adminKey)}`
}

export async function adminFetch(path, adminKey, options = {}) {
  return fetch(resolveApiPath(withAdminKey(path, adminKey)), options)
}

export async function filesToDataUrls(files = []) {
  const list = Array.isArray(files) ? files : []
  const settled = await Promise.all(list.map((file) => readFileAsDataUrl(file)))
  return settled.filter(Boolean)
}
