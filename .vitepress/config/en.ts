import type { DefaultTheme } from 'vitepress'
import { defineConfig } from 'vitepress'
import { version } from '../../package.json'

const Guide: DefaultTheme.SidebarItem[] = [
  {
    text: 'Getting Started',
    link: '/guide/',
  },
  {
    text: 'Register Service Worker',
    link: '/guide/register-service-worker',
  },
  {
    text: 'Service Worker Precache',
    link: '/guide/service-worker-precache',
  },
  {
    text: 'PWA Minimal Requirements',
    link: '/guide/pwa-minimal-requirements',
  },
  {
    text: 'Service Worker Strategies And Behaviors',
    link: '/guide/service-worker-strategies-and-behaviors',
  },
  {
    text: 'Automatic reload',
    link: '/guide/auto-update',
  },
  {
    text: 'Prompt for update',
    link: '/guide/prompt-for-update',
  },
  {
    text: 'Advanced (injectManifest)',
    link: '/guide/inject-manifest',
  },
  {
    text: 'Static assets handling',
    link: '/guide/static-assets',
  },
  {
    text: 'Periodic SW updates',
    link: '/guide/periodic-sw-updates',
  },
  {
    text: 'Development',
    link: '/guide/development',
  },
  {
    text: 'Scaffolding Your First Vite PWA Project <sup class="VPBadgeCustom tip">New</sup>',
    link: '/guide/scaffolding',
  },
  {
    text: 'Service Worker without PWA capabilities',
    link: '/guide/service-worker-without-pwa-capabilities',
  },
  {
    text: 'Unregister Service Worker',
    link: '/guide/unregister-service-worker',
  },
  {
    text: 'Testing Service Worker',
    link: '/guide/testing-service-worker',
  },
  {
    text: 'Vite, Rollup, PWA and Workbox Cookbook',
    link: '/guide/cookbook',
  },
  {
    text: 'Change Log',
    link: '/guide/change-log',
  },
  {
    text: 'FAQ',
    link: '/guide/faq',
  },
]

const Deployment: DefaultTheme.SidebarItem[] = [
  {
    text: 'Getting Started',
    link: '/deployment/',
  },
  {
    text: 'Netlify',
    link: '/deployment/netlify',
  },
  {
    text: 'AWS Amplify',
    link: '/deployment/aws',
  },
  {
    text: 'Vercel',
    link: '/deployment/vercel',
  },
  {
    text: 'NGINX',
    link: '/deployment/nginx',
  },
  {
    text: 'Apache Http Server 2.4+',
    link: '/deployment/apache',
  },
]

const AssetsGenerator: DefaultTheme.SidebarItem[] = [
  {
    text: 'Getting Started',
    link: '/assets-generator/',
  },
  {
    text: 'CLI',
    link: '/assets-generator/cli',
  },
  {
    text: 'API',
    link: '/assets-generator/api',
  },
  {
    text: 'Integrations <sup class="VPBadgeCustom tip">Experimental</sup>',
    link: '/assets-generator/integrations',
  },
  {
    text: 'Migrations',
    link: '/assets-generator/migrations',
  },
]

const Frameworks: DefaultTheme.SidebarItem[] = [
  {
    text: 'Getting Started',
    link: '/frameworks/',
  },
  {
    text: 'Vue',
    link: '/frameworks/vue',
  },
  {
    text: 'React',
    link: '/frameworks/react',
  },
  {
    text: 'Svelte',
    link: '/frameworks/svelte',
  },
  {
    text: 'SolidJS',
    link: '/frameworks/solidjs',
  },
  {
    text: 'Preact',
    link: '/frameworks/preact',
  },
  {
    text: 'îles',
    link: '/frameworks/iles',
  },
  {
    text: 'SvelteKit',
    link: '/frameworks/sveltekit',
  },
  {
    text: 'VitePress',
    link: '/frameworks/vitepress',
  },
  {
    text: 'Astro',
    link: '/frameworks/astro',
  },
  {
    text: 'Nuxt 3',
    link: '/frameworks/nuxt',
  },
  {
    text: 'Qwik',
    link: '/frameworks/qwik',
  },
  {
    text: 'Remix',
    link: '/frameworks/remix',
  },
]

const Examples: DefaultTheme.SidebarItem[] = [
  {
    text: 'Getting Started',
    link: '/examples/',
  },
  {
    text: 'Vue',
    link: '/examples/vue',
  },
  {
    text: 'React',
    link: '/examples/react',
  },
  {
    text: 'Svelte',
    link: '/examples/svelte',
  },
  {
    text: 'SolidJS',
    link: '/examples/solidjs',
  },
  {
    text: 'Preact',
    link: '/examples/preact',
  },
  {
    text: 'îles',
    link: '/examples/iles',
  },
  {
    text: 'SvelteKit',
    link: '/examples/sveltekit',
  },
  {
    text: 'VitePress',
    link: '/examples/vitepress',
  },
  {
    text: 'Astro',
    link: '/examples/astro',
  },
  {
    text: 'Nuxt 3',
    link: '/examples/nuxt',
  },
  {
    text: 'Qwik',
    link: '/examples/qwik',
  },
  {
    text: 'Remix',
    link: '/examples/remix',
  },
]

const Workbox: DefaultTheme.SidebarItem[] = [
  {
    text: 'Getting Started',
    link: '/workbox/',
  },
  {
    text: 'generateSW',
    link: '/workbox/generate-sw',
  },
  {
    text: 'injectManifest',
    link: '/workbox/inject-manifest',
  },
]

function prepareSidebar(idx: number) {
  return [
    {
      text: 'Guide',
      collapsible: true,
      collapsed: true,
      items: Guide,
    },
    {
      text: 'PWA Assets Generator',
      collapsible: true,
      collapsed: true,
      items: AssetsGenerator,
    },
    {
      text: 'Frameworks',
      collapsible: true,
      collapsed: true,
      items: Frameworks,
    },
    {
      text: 'Examples',
      collapsible: true,
      collapsed: true,
      items: Examples,
    },
    {
      text: 'Deploy',
      collapsible: true,
      collapsed: true,
      items: Deployment,
    },
    {
      text: 'Workbox',
      collapsible: true,
      collapsed: true,
      items: Workbox,
    },
  ].map<DefaultTheme.SidebarItem>((entry, i) => {
    if (idx === i)
      entry.collapsed = false

    return entry
  })
}

export const en = defineConfig({
  lang: 'en-US',
  description: 'Zero-config PWA Framework-agnostic for Vite and Integrations',
  themeConfig: {
    editLink: {
      pattern: 'https://github.com/vite-pwa/docs/edit/main/:path',
      text: 'Suggest changes to this page',
    },
    search: {
      provider: 'local',
    },
    nav: [
      {
        text: 'Guide',
        items: [
          {
            text: 'Getting Started',
            link: '/guide/',
            activeMatch: '^/guide/',
          },
          {
            text: 'PWA Assets Generator',
            link: '/assets-generator/',
            activeMatch: '^/assets-generator/',
          },
          {
            text: 'Frameworks',
            link: '/frameworks/',
            activeMatch: '^/frameworks/',
          },
          {
            text: 'Examples',
            link: '/examples/',
            activeMatch: '^/examples/',
          },
        ],
        activeMatch: '^/(guide|assets-generator|frameworks|examples)/',
      },
      {
        text: 'Deploy',
        link: '/deployment/',
        activeMatch: '^/deployment/',
      },
      {
        text: 'Workbox',
        link: '/workbox/',
        activeMatch: '^/workbox/',
      },
      {
        text: `v${version}`,
        items: [
          {
            text: 'Vite Plugin PWA',
            items: [
              {
                text: 'Release Notes',
                link: 'https://github.com/vite-pwa/vite-plugin-pwa/releases',
              },
              {
                text: 'Contributing',
                link: 'https://github.com/vite-pwa/vite-plugin-pwa/blob/main/CONTRIBUTING.md',
              },
            ],
          },
          {
            text: 'îles Module',
            items: [
              {
                text: 'Github',
                link: 'https://github.com/ElMassimo/iles/tree/main/packages/pwa',
              },
              {
                text: 'Documentation',
                link: 'https://iles-docs.netlify.app/guide/pwa',
              },
            ],
          },
          {
            text: 'Integrations',
            items: [
              {
                text: 'SvelteKit',
                link: 'https://github.com/vite-pwa/sveltekit',
              },
              {
                text: 'VitePress',
                link: 'https://github.com/vite-pwa/vitepress',
              },
              {
                text: 'Astro',
                link: 'https://github.com/vite-pwa/astro',
              },
              {
                text: 'Nuxt 3',
                link: 'https://github.com/vite-pwa/nuxt',
              },
              {
                text: 'Qwik',
                link: 'https://github.com/QwikDev/pwa',
              },
              {
                text: 'Remix',
                link: 'https://github.com/vite-pwa/remix',
              },
            ],
          },
        ],
      },
    ],
    sidebar: {
      '/guide/': prepareSidebar(0),
      '/assets-generator/': prepareSidebar(1),
      '/frameworks/': prepareSidebar(2),
      '/examples/': prepareSidebar(3),
      '/deployment/': prepareSidebar(4),
      '/workbox/': prepareSidebar(5),
    },
  },
})
