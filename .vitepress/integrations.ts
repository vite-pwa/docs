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
    name: 'SvelteKit 2 and 3',
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
    name: 'Nuxt 3, 4 and 5',
    github: 'nuxt/nuxt',
    mastodon: 'nuxt',
    x: '@nuxt_js',
    bluesky: 'nuxt.com',
    title: 'The Intuitive Web Framework',
  },
  {
    avatar: '/integration-logos/remix.svg',
    name: 'React Router',
    github: 'remix-run/react-router',
    x: 'ReactRouter',
    bluesky: 'reactrouter.com',
    title: 'Declarative routing for React',
  },
  {
    avatar: '/integration-logos/tanstack.svg',
    name: 'TanStack',
    github: 'TanStack',
    x: 'tan_stack',
    bluesky: 'tanstack.com',
    title: 'The open source application stack for the web',
  },
  {
    avatar: '/integration-logos/remix.svg',
    name: 'Remix (deprecated)',
    github: 'remix-run/remix',
    x: 'remix_run',
    title: 'Build better websites with Remix',
  },
]

const integrations = plainIntegrations.map(i => createLinks(i))

export { integrations }
