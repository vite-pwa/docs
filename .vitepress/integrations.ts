export interface SocialEntry {
  icon: string
  link: string
}
export interface Integration {
  avatar: string
  name: string
  // required to download avatars from GitHub
  github: string
  twitter?: string
  title?: string
  org?: string
  desc?: string
  links?: SocialEntry[]
}

const createLinks = (i: Integration): Integration => {
  i.links = [{ icon: 'github', link: `https://github.com/${i.github}` }]
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
    // desc: 'Islands of interactivity with Vue, Preact, Svelte, Solid, and more',
  },
  {
    avatar: '/integration-logos/sveltekit.svg',
    name: 'SvelteKit',
    github: 'sveltejs/kit',
    twitter: 'sveltejs',
    title: 'The fastest way to build svelte apps',
    // desc: 'SvelteKit is a framework for building web applications of all sizes, with a beautiful development experience and flexible filesystem-based routing.',
  },
  {
    avatar: '/integration-logos/vitepress.svg',
    name: 'VitePress',
    github: 'vuejs/vitepress',
    // twitter: 'sveltejs',
    title: 'Vite & Vue Powered Static Site Generator',
    // desc: 'Simple, powerful, and performant. Meet the modern SSG framework you\'ve always wanted.',
  },
  {
    avatar: '/integration-logos/astro.svg',
    name: 'Astro',
    github: 'withastro/astro',
    twitter: 'astrodotbuild',
    title: 'Build fast websites, faster',
    // desc: 'Astro is a new kind of static site generator that uses components to build your pages.',
  },
]

const integrations = plaingIntegrations.map(i => createLinks(i))

export { integrations }
