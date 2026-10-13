export const API_CACHE_NAME = 'api-cache'
export const API_PAGE_REGEX = /^\/(?:vite-pwa-workbox|unplugin-pwa)\/api\/(?:packages|symbols)\//i

export function prepareApiPages(): Map<string, string> {
  const indexPages = new Map<string, string>()
  for (const p of ['build', 'cli', 'swkit', 'window']) {
    const base = `/vite-pwa-workbox/api/packages/workbox-${p}-index`
    const k = `${base}.html`
    indexPages.set(base, k)
    indexPages.set(k, k)
  }
  for (const p of ['core', 'vite']) {
    const base = `/unplugin-pwa/api/packages/unplugin-pwa-${p}-index`
    const k = `${base}.html`
    indexPages.set(base, k)
    indexPages.set(k, k)
  }

  return indexPages
}
