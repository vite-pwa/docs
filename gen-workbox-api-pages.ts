/* eslint-disable no-console */
import { mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import workboxSubpackageExports from '@vite-pwa/workbox-types/subpackages-exports' with { type: 'json' }
import { getPackages, getSymbols } from './generate.ts'
import { renderPackageHTML, renderSymbolPage } from './render.ts'

mkdirSync(resolve('vite-pwa-workbox/api/packages'), { recursive: true })

console.log(workboxSubpackageExports)
const packages = getPackages()
const titleSuffix = ' | API Reference | Vite PWA Workbox'
for (let i = 0; i < packages.length; i++) {
  const pkg = packages[i]
  const title = `@vite-pwa/${pkg.label}`
  const html = renderPackageHTML(pkg, {
    title,
    badge: 'package',
    frontmatter: i === packages.length - 1
      ? `---
title: '${title}${titleSuffix}'
prev: true
next:
  text: Getting Started | Workbox
  link: /workbox/
---

`
      : `---
title: '${title}${titleSuffix}' 
prev: true
next: true
---

`,
  })
  const outPath = resolve(`vite-pwa-workbox/api/packages/${pkg.slug}.md`)
  writeFileSync(outPath, html, 'utf-8')
  console.log(`✅ Generated package page: ${outPath}`)
}

// Wipe and recreate so stale files from old flat layout don't linger.
rmSync(resolve('vite-pwa-workbox/api/symbols'), { recursive: true, force: true })
mkdirSync(resolve('vite-pwa-workbox/api/symbols'), { recursive: true })

const symbols = getSymbols()
for (const s of symbols) {
  const page = renderSymbolPage(s)
  const outPath = resolve(`vite-pwa-workbox/api/symbols/${s.slug}.md`)
  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, page, 'utf-8')
}
console.log(`✅ Generated ${symbols.length} symbol pages`)
