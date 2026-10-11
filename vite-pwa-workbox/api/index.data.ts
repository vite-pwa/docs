import { getSymbols, slugify } from '../../generate.ts'

const loader = {
  load() {
    const symbols = getSymbols()
    const groupMap = new Map<string, { pkg: string, id: string, packageSlug: string, items: { slug: string, name: string, kind: string }[] }>()
    for (const s of symbols) {
      if (!groupMap.has(s.pkg)) {
        groupMap.set(s.pkg, {
          pkg: s.pkg,
          id: s.pkg.replace(/[^a-z0-9]/gi, '-'),
          packageSlug: slugify(s.pkg, 'index'),
          items: [],
        })
      }
      groupMap.get(s.pkg)!.items.push({ slug: s.slug, name: s.name, kind: s.kindLabel })
    }
    return { total: symbols.length, groups: [...groupMap.values()] }
  },
}

export default loader
export declare const data: ReturnType<typeof loader.load>
