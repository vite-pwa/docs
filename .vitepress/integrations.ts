import type { DefaultTheme } from 'vitepress'

export interface Integration extends Partial<DefaultTheme.TeamMember> {
  avatar: string
  name: string
  // required to download avatars from GitHub
  github: string
  mastodon?: string
  x?: string
  bluesky?: string
  title?: string
  org?: string
  desc?: string
}

function createLinks(i: Integration): Integration {
  i.links = [{ icon: 'github', link: `https://github.com/${i.github}` }]
  if (i.mastodon)
    i.links.push({ icon: 'mastodon', link: `https://elk.zone/m.webtoo.ls/@${i.mastodon}` })

  if (i.bluesky)
    i.links.push({ icon: 'bluesky', link: `https://bsky.app/profile/${i.bluesky}` })

  if (i.x)
    i.links.push({ icon: 'x', link: `https://x.com/${i.x}` })

  return i
}

const plainIntegrations = [
  {
    avatar: '/integration-logos/iles.svg',
    name: 'îles',
    github: 'ElMassimo/iles',
    x: 'ilesjs',
    title: 'The joyful site generator',
  },
  {
    avatar: '/integration-logos/sveltekit.svg',
    name: 'SvelteKit',
    github: 'sveltejs/kit',
    bluesky: 'svelte.dev',
    title: 'The fastest way to build svelte apps',
  },
  {
    avatar: '/integration-logos/vitepress.svg',
    name: 'VitePress',
    github: 'vuejs/vitepress',
    title: 'Vite & Vue Powered Static Site Generator',
  },
  {
    avatar: '/integration-logos/astro.svg',
    name: 'Astro',
    github: 'withastro/astro',
    mastodon: 'astro',
    x: 'astrodotbuild',
    bluesky: 'astro.build',
    title: 'Build fast websites, faster',
  },
  {
    avatar: '/integration-logos/nuxt.svg',
    name: 'Nuxt 3',
    github: 'nuxt/nuxt',
    mastodon: 'nuxt',
    x: '@nuxt_js',
    bluesky: 'nuxt.com',
    title: 'The Intuitive Web Framework',
  },
  {
    avatar: '/integration-logos/remix.svg',
    name: 'Remix',
    github: 'remix-run/remix',
    x: 'remix_run',
    title: 'Build better websites with Remix and React Router',
  },
]

const integrations = plainIntegrations.map(i => createLinks(i))

export { integrations }
