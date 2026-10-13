import type { DefaultTheme } from 'vitepress'
import { defineConfig } from 'vitepress'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'
import llmsVitePlugin, { copyOrDownloadAsMarkdownButtons } from 'vitepress-plugin-llms'
import packageJSON from '../package.json' with { type: 'json' }
import { pwa } from './scripts/pwa.ts'
import { transformHead } from './scripts/transformHead.ts'
import { withPwa } from './with-pwa/index.ts'
import { sidebar as workboxApiSidebar } from './workbox-api.ts'

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
    text: 'Scaffolding Your First Vite PWA Project',
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
    text: 'Nuxt',
    link: '/frameworks/nuxt',
  },
  {
    text: 'Qwik',
    link: '/frameworks/qwik',
  },
  {
    text: 'Laravel',
    link: '/frameworks/laravel',
  },
  {
    text: 'React Router',
    link: '/frameworks/react-router',
  },
  {
    text: 'TanStack',
    link: '/frameworks/tanstack',
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
    text: 'Nuxt',
    link: '/examples/nuxt',
  },
  {
    text: 'Qwik',
    link: '/examples/qwik',
  },
  {
    text: 'React Router',
    link: '/examples/react-router',
  },
  {
    text: 'TanStack',
    link: '/examples/tanstack',
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

const UnpluginPWA: DefaultTheme.SidebarItem[] = [
  {
    text: 'Getting Started',
    link: '/unplugin-pwa/',
  },
  {
    text: 'Core Package',
    link: '/unplugin-pwa/core',
  },
  {
    text: 'Vite Package',
    link: '/unplugin-pwa/vite',
  },
  {
    text: 'Inspector Package',
    link: '/unplugin-pwa/inspector',
  },
  {
    text: 'API Reference',
    collapsed: true,
    link: '/unplugin-pwa/api/',
    // items: workboxApiSidebar(),
  },
]
const VitePWAWorkbox: DefaultTheme.SidebarItem[] = [
  {
    text: 'Getting Started',
    link: '/vite-pwa-workbox/',
  },
  {
    text: 'generateSW',
    link: '/vite-pwa-workbox/generate-sw',
  },
  {
    text: 'buildSW',
    link: '/vite-pwa-workbox/build-sw',
  },
  {
    text: 'injectManifest',
    link: '/vite-pwa-workbox/inject-manifest',
  },
  {
    text: 'API Reference',
    collapsed: true,
    link: '/vite-pwa-workbox/api/',
    items: workboxApiSidebar(),
  },
]

function prepareSidebar(idx: number) {
  return [
    {
      text: 'Guide',
      collapsible: true,
      collapsed: true,
      link: '/guide/',
      items: Guide,
    },
    {
      text: 'PWA Assets Generator',
      collapsible: true,
      collapsed: true,
      link: '/assets-generator/',
      items: AssetsGenerator,
    },
    {
      text: 'Frameworks',
      collapsible: true,
      collapsed: true,
      link: '/frameworks/',
      items: Frameworks,
    },
    {
      text: 'Examples',
      collapsible: true,
      collapsed: true,
      link: '/examples/',
      items: Examples,
    },
    {
      text: 'Deploy',
      collapsible: true,
      collapsed: true,
      link: '/deployment/',
      items: Deployment,
    },
    {
      text: 'Unplugin PWA',
      collapsible: true,
      collapsed: true,
      link: '/unplugin-pwa/',
      activeMatch: '^/unplugin-pwa/',
      items: UnpluginPWA,
    },
    {
      text: 'Vite PWA Workbox',
      collapsible: true,
      collapsed: true,
      link: '/vite-pwa-workbox/',
      activeMatch: '^/vite-pwa-workbox/',
      items: VitePWAWorkbox,
    },
    {
      text: 'Workbox',
      collapsible: true,
      collapsed: true,
      link: '/workbox/',
      items: Workbox,
    },
  ].map<DefaultTheme.SidebarItem>((entry, i) => {
    if (idx === i) {
      entry.collapsed = false
    }

    return entry
  })
}

const ogUrl = 'https://vite-pwa-org.netlify.app/'
const ogImage = `${ogUrl}og-image.png`
const description = 'PWA Ecosystem, Modular PWA integrations for modern web frameworks'

export default withPwa(defineConfig({
  lang: 'en-US',
  title: 'PWA Ecosystem',
  description,
  head: [
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['link', { rel: 'icon', href: '/favicon.ico', sizes: '48x48' }],
    ['link', { rel: 'icon', href: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' }],
    ['link', { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#ffffff' }],
    ['meta', { name: 'author', content: 'Anthony Fu, Joaquín Sánchez' }],
    ['meta', {
      name: 'keywords',
      content: 'PWA, React, Vue, VitePress, Preact, Svelte, SvelteKit, workbox, SolidJS, Vite, vite-plugin, íles, Astro, Nuxt 3, Nuxt module, React router, TanStack, Remix',
    }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'PWA Ecosystem' }],
    ['meta', { property: 'og:image', content: ogImage }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { property: 'og:url', content: ogUrl }],
    ['meta', { name: 'twitter:description', content: description }],
    ['meta', { name: 'twitter:title', content: 'PWA Ecosystem' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: ogImage }],
    ['meta', { name: 'twitter:site', content: '@antfu7' }],
    ['meta', { name: 'twitter:url', content: ogUrl }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' }],
  ],
  srcExclude: ['README.md', 'CONTRIBUTING.md'],
  // TODO: fix workbox dead links at workbox GH repo
  ignoreDeadLinks: ['/web/tools/workbox/guides/configure-workbox'],
  lastUpdated: true,
  markdown: {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
    config(md) {
      md.use(groupIconMdPlugin)
      md.use(copyOrDownloadAsMarkdownButtons)
    },
  },
  locales: {
    root: { label: 'English' },
    zh: { label: '简体中文', link: 'https://vite-pwa-org-zh.netlify.app/' },
  },
  themeConfig: {
    // logo: '/favicon.svg',
    editLink: {
      pattern: 'https://github.com/vite-pwa/docs/edit/main/:path',
      text: 'Suggest changes to this page',
    },
    search: {
      provider: 'local',
      /*
      provider: 'algolia',
      options: {
        appId: 'TTO9T0AE3F',
        apiKey: '71bd3d3c7274205843267bb1ccb6b1a8',
        indexName: 'vite-plugin-pwa',
      },
       */
    },
    socialLinks: [
      { icon: 'discord', link: 'https://discord.gg/uccDuWkScq' },
      { icon: 'github', link: 'https://github.com/vite-pwa/unplugin-pwa' },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2021-PRESENT Anthony Fu, Joaquín Sánchez',
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
        text: 'Vite PWA Workbox',
        link: '/vite-pwa-workbox/',
        activeMatch: '^/vite-pwa-workbox/',
      },
      {
        text: `v${packageJSON.version}`,
        items: [
          {
            text: 'Unplugin PWA',
            items: [
              {
                text: 'Release Notes',
                link: 'https://github.com/vite-pwa/unplugin-pwa/releases',
              },
              {
                text: 'Contributing',
                link: 'https://github.com/vite-pwa/unplugin-pwa/blob/main/CONTRIBUTING.md',
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
                text: 'Nuxt',
                link: 'https://github.com/vite-pwa/nuxt',
              },
              {
                text: 'Qwik',
                link: 'https://github.com/QwikDev/pwa',
              },
              {
                text: 'React Router',
                link: 'https://github.com/vite-pwa/react-router',
              },
              {
                text: 'TanStack',
                link: 'https://github.com/vite-pwa/tanstack',
              },
              {
                text: 'Remix (deprecated)',
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
      '/unplugin-pwa/': prepareSidebar(5),
      '/vite-pwa-workbox/': prepareSidebar(6),
      '/workbox/': prepareSidebar(7),
    },
  },
  vite: {
    logLevel: 'info',
    plugins: [
      groupIconVitePlugin(),
      llmsVitePlugin({
        title: 'PWA Ecosystem Documentation',
      }),
    ],
  },
  pwa,
  transformHead,
}))
