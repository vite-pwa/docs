import type { DefaultTheme } from 'vitepress'

export interface Integration extends Partial<DefaultTheme.TeamMember> {
  avatar: string
  name: string
  // required to download avatars from GitHub
  github: string
  mastodon?: string
  twitter?: string
  title?: string
  org?: string
  desc?: string
}

const createLinks = (i: Integration): Integration => {
  i.links = [{ icon: 'github', link: `https://github.com/${i.github}` }]
  if (i.mastodon)
    i.links.push({ icon: 'mastodon', link: `https://elk.zone/m.webtoo.ls/@${i.mastodon}` })

  if (i.twitter)
    i.links.push({ icon: 'twitter', link: `https://twitter.com/${i.twitter}` })

  return i
}

const plaingIntegrations = [
  {
    avatar: '/integration-logos/iles.svg',
    name: 'îles',
    github: 'ElMassimo/iles',
    twitter: 'ilesjs',
    title: 'The joyful site generator',
  },
  {
    avatar: '/integration-logos/sveltekit.svg',
    name: 'SvelteKit',
    github: 'sveltejs/kit',
    twitter: 'sveltejs',
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
    twitter: 'astrodotbuild',
    title: 'Build fast websites, faster',
  },
  {
    avatar: '/integration-logos/nuxt.svg',
    name: 'Nuxt 3',
    github: 'nuxt/nuxt',
    mastodon: 'nuxt',
    twitter: '@nuxt_js',
    title: 'The Intuitive Web Framework',
  },
]

const integrations = plaingIntegrations.map(i => createLinks(i))

export { integrations }
