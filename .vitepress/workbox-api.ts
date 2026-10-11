import type { PackageGroup } from '../generate.ts'
import { getPackages, slugify } from '../generate.ts'

/**
 * Build a JavaDoc-style sidebar tree.
 * First level = top-level packages (swkit, build, window, unplugin).
 * Second level = subpackages (background-sync, core, build/vite, config, ...).
 * Third level = individual symbols.
 *
 * The root module (module === "") is NOT shown as a separate subpackage item
 * because the top-level link already points to the package index page.
 */
export function sidebar() {
  const packages = getPackages()

  // Group packages by top-level name
  const topLevel = new Map<string, PackageGroup[]>()
  for (const p of packages) {
    if (!topLevel.has(p.pkg)) {
      topLevel.set(p.pkg, [])
    }
    topLevel.get(p.pkg)!.push(p)
  }

  // const link = (s: ApiSymbol) => ({ text: s.name, link: `/api/symbols/${s.slug}` })

  return [...topLevel.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([pkgName, subPackages]) => ({
      text: pkgName,
      link: `/vite-pwa-workbox/api/packages/${slugify(pkgName, 'index')}`,
      collapsed: true,
      // Exclude root (module="") from subpackage items — the top-level link
      // already goes to the root index page. Only show non-root subpackages.
      items: subPackages
        .filter(sp => sp.module !== '')
        .map(sp => ({
          text: sp.module,
          link: `/vite-pwa-workbox/api/packages/${sp.slug}`,
          collapsed: true,
          // items: sp.symbols
          //   .sort((a, b) => a.kindLabel.localeCompare(b.kindLabel) || a.name.localeCompare(b.name))
          //   .map(link),
        })),
    }))
}
