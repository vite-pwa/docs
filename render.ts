import type { ApiSymbol, PackageGroup } from './generate.ts'
import { getPackages, KIND_ORDER } from './generate.ts'

// ---- HTML escaping ----
function htmlEscape(text: string): string {
  if (!text) {
    return ''
  }

  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/\r?\n/g, ' ')
    .trim()
}

// ---- comment helpers ----
function renderComment(comment: any): string {
  if (!comment?.summary) {
    return ''
  }
  return comment.summary.map((p: any) => p.text ?? '').join('').trim()
}

function renderCommentShort(comment: any): string {
  const full = renderComment(comment)
  if (!full) {
    return ''
  }
  const firstPara = full.split(/\n\s*\n/)[0]
  return firstPara.replace(/\s*\n\s*/g, ' ').trim()
}

// ---- type rendering ----
function renderType(t: any): string {
  if (!t) {
    return 'unknown'
  }
  switch (t.type) {
    case 'intrinsic': return t.name
    case 'reference': {
      const args = t.typeArguments?.length ? `<${t.typeArguments.map(renderType).join(', ')}>` : ''
      return `${t.name}${args}`
    }
    case 'literal': return typeof t.value === 'string' ? `"${t.value}"` : String(t.value)
    case 'union': return t.types.map(renderType).join(' | ')
    case 'intersection': return t.types.map(renderType).join(' & ')
    case 'array': return `${renderType(t.elementType)}[]`
    case 'reflection': return renderReflection(t.declaration)
    case 'tuple': return `[${(t.elements ?? []).map(renderType).join(', ')}]`
    case 'templateLiteral': return 'string'
    case 'indexedAccess': return `${renderType(t.objectType)}[${renderType(t.indexType)}]`
    case 'typeOperator': return `${t.operator} ${renderType(t.target)}`
    case 'query': return `typeof ${renderType(t.queryType)}`
    case 'predicate': return 'boolean'
    case 'mapped': return 'object'
    case 'conditional': return renderType(t.checkType)
    default: return t.name ?? t.type ?? 'unknown'
  }
}

function renderReflection(decl: any): string {
  if (decl?.signatures?.length) {
    const sig = decl.signatures[0]
    const params = (sig.parameters ?? []).map((p: any) => `${p.name}: ${renderType(p.type)}`).join(', ')
    return `(${params}) => ${renderType(sig.type)}`
  }
  if (decl?.children?.length) {
    return `{ ${decl.children.map((c: any) => `${c.name}${c.flags?.isOptional ? '?' : ''}: ${renderType(c.type)}`).join('; ')} }`
  }
  return 'object'
}

function getDefault(comment: any): string | null {
  const tag = comment?.blockTags?.find((t: any) => t.tag === '@default')
  if (!tag) {
    return null
  }

  return tag.content.map((c: any) => c.text ?? '').join('').replace(/```\w*\n?/g, '').replace(/```/g, '').trim()
}

function sig(name: string, s: any): string {
  const params = (s?.parameters ?? [])
    .map((p: any) => `${p.name}${p.flags?.isOptional ? '?' : ''}: ${renderType(p.type)}`)
    .join(', ')
  return `${name}(${params}): ${renderType(s?.type)}`
}

function pkgLabel(s: ApiSymbol): string {
  return s.module ? `${s.pkg}/${s.module}` : s.pkg
}

export interface PackageOptions {
  title: string
  frontmatter: string
  badge: 'package' | 'subpackage'
}

// ---- render package page ----
export function renderPackageHTML(pkg: PackageGroup, options?: PackageOptions): string {
  const out: string[] = []
  const [urlPrefix, prefix] = pkg.label.startsWith('workbox-')
    ? ['/vite-pwa-workbox', '@vite-pwa/'] as const
    : pkg.label.startsWith('unplugin-pwa-')
      ? ['/unplugin-pwa', '@unplugin-pwa/'] as const
      : ['', '', undefined] as const
  const { title: pkgTitle, frontmatter, badge = 'package' } = options || {}
  const badgeText = badge === 'package' ? 'Package' : 'Subpackage'
  const title = pkgTitle || `${badgeText} ${prefix}${pkg.label}`
  out.push(frontmatter || '--\nprev: true\nnext: true\n---\n\n')
  out.push(`# ${title}`, '')
  // Use default slot instead of 'text' prop
  out.push(`<Badge type="info">${badgeText}</Badge>`, '')
  out.push(`**Declaration:** \`${title}\``, '')

  if (pkg.symbols.length === 0) {
    const allPkgs = getPackages()
    const children = allPkgs.filter(p => p.pkg === pkg.pkg && p.module !== '')
    if (children.length > 0) {
      out.push('', '## Subpackages', '')
      for (const child of children) {
        out.push(`- [${child.module}](${urlPrefix}/api/packages/${child.slug}) - ${child.symbols.length} symbol(s)`)
      }
      out.push('')
    }
    return out.join('\n')
  }

  const byKind = new Map<string, ApiSymbol[]>()
  for (const s of pkg.symbols) {
    if (!byKind.has(s.kindLabel)) {
      byKind.set(s.kindLabel, [])
    }
    byKind.get(s.kindLabel)!.push(s)
  }

  for (const kind of KIND_ORDER) {
    const items = byKind.get(kind)
    if (!items?.length) {
      continue
    }
    out.push(`## ${kind} Summary`, '')

    const desc = (s: ApiSymbol) => {
      const d = renderCommentShort(s.reflection.comment)
      return d ? ` ${htmlEscape(d)}` : ''
    }

    if (kind === 'Enumeration' || kind === 'Interface' || kind === 'Class') {
      out.push('<table class="symbol-table">')
      out.push('<thead><tr><th>Type</th><th>Description</th></tr></thead>')
      out.push('<tbody>')
      for (const s of items) {
        const linkHtml = `<a href="${urlPrefix}/api/symbols/${s.slug}">${htmlEscape(s.name)}</a>`
        out.push(`<tr><td data-label="Type">${linkHtml}</td><td data-label="Description">${desc(s)}</td></tr>`)
      }
      out.push('</tbody></table>')
    }
    else {
      out.push('<table class="symbol-table">')
      out.push('<thead><tr><th>Name</th><th>Description</th></tr></thead>')
      out.push('<tbody>')
      for (const s of items) {
        const linkHtml = `<a href="${urlPrefix}/api/symbols/${s.slug}">${htmlEscape(s.name)}</a>`
        out.push(`<tr><td data-label="Name">${linkHtml}</td><td data-label="Description">${desc(s)}</td></tr>`)
      }
      out.push('</tbody></table>')
    }
    out.push('')
  }
  return out.join('\n')
}

// ---- render symbol page ----
export function renderSymbolPage(s: ApiSymbol): string {
  return `---\nprev: true\nnext: true\n---\n\n${renderSymbolHTML(s)}\n`
}

export function renderSymbolHTML(s: ApiSymbol): string {
  const r = s.reflection
  const out: string[] = []

  // Use a markdown heading, not <h1>. Block-level HTML tags (h1, p, h2…) open
  // an HTML block in markdown-it that swallows everything until the next blank
  // line — including code fences, which then render as plain text instead of
  // highlighted blocks. Markdown headings don't trigger HTML block mode.
  out.push(`# ${s.name}`, '')
  out.push(`<Badge type="tip">${htmlEscape(s.kindLabel)}</Badge> <Badge type="info">${htmlEscape(pkgLabel(s))}</Badge>`, '')

  const desc = renderComment(r.comment)
  if (desc) {
    out.push(desc, '')
  }

  switch (s.kind) {
    case 2097152: // Type Alias
      out.push(`\`\`\`ts\ntype ${s.name} = ${renderType(r.type)}\n\`\`\``, '')
      break
    case 32: // Variable
      out.push(`\`\`\`ts\nconst ${s.name}: ${renderType(r.type)}\n\`\`\``, '')
      break
    case 256: // Interface
      out.push(renderProperties(r.children ?? []), '')
      break
    case 8: { // Enum
      const members = (r.children ?? []).filter((c: any) => c.kind === 16)
      if (members.length) {
        out.push('<h2>Members</h2>', '')
        const rows = members.map((m: any) =>
          `<tr><td data-label="Member"><code>${htmlEscape(m.name)}</code></td><td data-label="Value"><code>${htmlEscape(m.type?.value ?? '')}</code></td></tr>`,
        ).join('\n')
        out.push(`<table class="symbol-table"><thead><tr><th>Member</th><th>Value</th></tr></thead><tbody>\n${rows}\n</tbody></table>`, '')
      }
      break
    }
    case 64: { // Function
      const sigs = r.signatures ?? []
      if (sigs.length === 0) {
        out.push('<p><em>No signature found</em></p>', '')
      }
      else {
        for (const s2 of sigs) {
          out.push(`\`\`\`ts\n${sig(s.name, s2)}\n\`\`\``, '')
          const sd = renderComment(s2.comment)
          if (sd) {
            out.push(sd, '')
          }
          const ps = (s2.parameters ?? []).filter((p: any) => p.comment)
          if (ps.length) {
            const items = ps.map((p: any) => `<li><code>${htmlEscape(p.name)}</code> – ${htmlEscape(renderComment(p.comment))}</li>`).join('\n')
            out.push('**Parameters**', '')
            out.push(`<ul>\n${items}\n</ul>`, '')
          }
        }
      }
      break
    }
    case 128: { // Class
      out.push(renderProperties(r.children ?? []), '')
      const methods = (r.children ?? []).filter((c: any) => c.kind === 2048)
      if (methods.length) {
        out.push('<h2>Methods</h2>', '')
        for (const m of methods) {
          out.push(`<h3>${htmlEscape(m.name)}()</h3>`, '')
          out.push(`\`\`\`ts\n${sig(m.name, m.signatures?.[0])}\n\`\`\``, '')
          const md = renderComment(m.signatures?.[0]?.comment ?? m.comment)
          if (md) {
            out.push(md, '')
          }
        }
      }
      break
    }
  }
  return out.join('\n')
}

// Helper: render properties table
function renderProperties(children: any[]): string {
  const props = children.filter(c => c.kind === 1024)
  if (!props.length) {
    return ''
  }

  const out: string[] = []
  out.push('<h2>Properties</h2>')
  out.push('<table class="symbol-table"><thead><tr><th>Property</th><th>Type</th><th>Default</th><th>Description</th></tr></thead><tbody>')
  for (const p of props) {
    const opt = p.flags?.isOptional ? '?' : ''
    const def = getDefault(p.comment)
    const typeStr = renderType(p.type)
    const descText = renderComment(p.comment)
    out.push(`<tr><td data-label="Property"><code>${htmlEscape(p.name)}${opt}</code></td><td data-label="Type"><code>${htmlEscape(typeStr)}</code></td><td data-label="Default">${def ? `<code>${htmlEscape(def)}</code>` : ''}</td><td data-label="Description">${htmlEscape(descText)}</td></tr>`)
  }
  out.push('</tbody></table>')
  return out.join('\n')
}
