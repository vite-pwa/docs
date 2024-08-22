import type { DefaultTheme } from 'vitepress'
import { defineConfig } from 'vitepress'
import { version } from '../../package.json'

const Guide: DefaultTheme.SidebarItem[] = [
  {
    text: '开始',
    link: '/zh/guide/',
  },
  {
    text: 'Register Service Worker',
    link: '/zh/guide/register-service-worker',
  },
  {
    text: 'Service Worker Precache',
    link: '/zh/guide/service-worker-precache',
  },
  {
    text: 'PWA Minimal Requirements',
    link: '/zh/guide/pwa-minimal-requirements',
  },
  {
    text: 'Service Worker Strategies And Behaviors',
    link: '/zh/guide/service-worker-strategies-and-behaviors',
  },
  {
    text: 'Automatic reload',
    link: '/zh/guide/auto-update',
  },
  {
    text: 'Prompt for update',
    link: '/zh/guide/prompt-for-update',
  },
  {
    text: 'Advanced (injectManifest)',
    link: '/zh/guide/inject-manifest',
  },
  {
    text: 'Static assets handling',
    link: '/zh/guide/static-assets',
  },
  {
    text: 'Periodic SW updates',
    link: '/zh/guide/periodic-sw-updates',
  },
  {
    text: 'Development',
    link: '/zh/guide/development',
  },
  {
    text: 'Scaffolding Your First Vite PWA Project <sup class="VPBadgeCustom tip">New</sup>',
    link: '/zh/guide/scaffolding',
  },
  {
    text: 'Service Worker without PWA capabilities',
    link: '/zh/guide/service-worker-without-pwa-capabilities',
  },
  {
    text: 'Unregister Service Worker',
    link: '/zh/guide/unregister-service-worker',
  },
  {
    text: 'Testing Service Worker',
    link: '/zh/guide/testing-service-worker',
  },
  {
    text: 'Vite, Rollup, PWA and Workbox Cookbook',
    link: '/zh/guide/cookbook',
  },
  {
    text: 'Change Log',
    link: '/zh/guide/change-log',
  },
  {
    text: 'FAQ',
    link: '/zh/guide/faq',
  },
]

const Deployment: DefaultTheme.SidebarItem[] = [
  {
    text: '开始',
    link: '/zh/deployment/',
  },
  {
    text: 'Netlify',
    link: '/zh/deployment/netlify',
  },
  {
    text: 'AWS Amplify',
    link: '/zh/deployment/aws',
  },
  {
    text: 'Vercel',
    link: '/zh/deployment/vercel',
  },
  {
    text: 'NGINX',
    link: '/zh/deployment/nginx',
  },
  {
    text: 'Apache Http Server 2.4+',
    link: '/zh/deployment/apache',
  },
]

const AssetsGenerator: DefaultTheme.SidebarItem[] = [
  {
    text: '开始',
    link: '/zh/assets-generator/',
  },
  {
    text: 'CLI',
    link: '/zh/assets-generator/cli',
  },
  {
    text: 'API',
    link: '/zh/assets-generator/api',
  },
  {
    text: 'Integrations <sup class="VPBadgeCustom tip">Experimental</sup>',
    link: '/zh/assets-generator/integrations',
  },
  {
    text: 'Migrations',
    link: '/zh/assets-generator/migrations',
  },
]

const Frameworks: DefaultTheme.SidebarItem[] = [
  {
    text: '开始',
    link: '/zh/frameworks/',
  },
  {
    text: 'Vue',
    link: '/zh/frameworks/vue',
  },
  {
    text: 'React',
    link: '/zh/frameworks/react',
  },
  {
    text: 'Svelte',
    link: '/zh/frameworks/svelte',
  },
  {
    text: 'SolidJS',
    link: '/zh/frameworks/solidjs',
  },
  {
    text: 'Preact',
    link: '/zh/frameworks/preact',
  },
  {
    text: 'îles',
    link: '/zh/frameworks/iles',
  },
  {
    text: 'SvelteKit',
    link: '/zh/frameworks/sveltekit',
  },
  {
    text: 'VitePress',
    link: '/zh/frameworks/vitepress',
  },
  {
    text: 'Astro',
    link: '/zh/frameworks/astro',
  },
  {
    text: 'Nuxt 3',
    link: '/zh/frameworks/nuxt',
  },
  {
    text: 'Qwik',
    link: '/zh/frameworks/qwik',
  },
  {
    text: 'Remix',
    link: '/zh/frameworks/remix',
  },
]

const Examples: DefaultTheme.SidebarItem[] = [
  {
    text: '开始',
    link: '/zh/examples/',
  },
  {
    text: 'Vue',
    link: '/zh/examples/vue',
  },
  {
    text: 'React',
    link: '/zh/examples/react',
  },
  {
    text: 'Svelte',
    link: '/zh/examples/svelte',
  },
  {
    text: 'SolidJS',
    link: '/zh/examples/solidjs',
  },
  {
    text: 'Preact',
    link: '/zh/examples/preact',
  },
  {
    text: 'îles',
    link: '/zh/examples/iles',
  },
  {
    text: 'SvelteKit',
    link: '/zh/examples/sveltekit',
  },
  {
    text: 'VitePress',
    link: '/zh/examples/vitepress',
  },
  {
    text: 'Astro',
    link: '/zh/examples/astro',
  },
  {
    text: 'Nuxt 3',
    link: '/zh/examples/nuxt',
  },
  {
    text: 'Qwik',
    link: '/zh/examples/qwik',
  },
  {
    text: 'Remix',
    link: '/zh/examples/remix',
  },
]

const Workbox: DefaultTheme.SidebarItem[] = [
  {
    text: '开始',
    link: '/zh/workbox/',
  },
  {
    text: 'generateSW',
    link: '/zh/workbox/generate-sw',
  },
  {
    text: 'injectManifest',
    link: '/zh/workbox/inject-manifest',
  },
]

function prepareSidebar(idx: number) {
  return [
    {
      text: '指南',
      collapsible: true,
      collapsed: true,
      items: Guide,
    },
    {
      text: 'PWA Assets 生成器',
      collapsible: true,
      collapsed: true,
      items: AssetsGenerator,
    },
    {
      text: '框架',
      collapsible: true,
      collapsed: true,
      items: Frameworks,
    },
    {
      text: '案例',
      collapsible: true,
      collapsed: true,
      items: Examples,
    },
    {
      text: '部署',
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

export const zh = defineConfig({
  lang: 'zh-Hans',
  title: 'Vite PWA',
  description: 'Zero-config PWA Framework-agnostic for Vite and Integrations',
  themeConfig: {
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    outline: {
      label: '页面导航',
    },
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
      },
    },
    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    editLink: {
      pattern: 'https://github.com/vite-pwa/docs/edit/main/:path',
      text: '在 GitHub 上编辑此页面',
    },
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档',
              },
              modal: {
                displayDetails: '显示详细列表',
                resetButtonTitle: '重置搜索',
                backButtonTitle: '关闭搜索',
                noResultsText: '没有结果',
                footer: {
                  selectText: '选择',
                  selectKeyAriaLabel: '输入',
                  navigateText: '导航',
                  navigateUpKeyAriaLabel: '上箭头',
                  navigateDownKeyAriaLabel: '下箭头',
                  closeText: '关闭',
                  closeKeyAriaLabel: 'esc',
                },
              },
            },
          },
        },
      },
    },
    nav: [
      {
        text: '指南',
        items: [
          {
            text: '开始',
            link: '/zh/guide/',
            activeMatch: '^/guide/',
          },
          {
            text: 'PWA Assets 生成器',
            link: '/zh/assets-generator/',
            activeMatch: '^/assets-generator/',
          },
          {
            text: '框架',
            link: '/zh/frameworks/',
            activeMatch: '^/frameworks/',
          },
          {
            text: '案例',
            link: '/zh/examples/',
            activeMatch: '^/examples/',
          },
        ],
        activeMatch: '^/(guide|assets-generator|frameworks|examples)/',
      },
      {
        text: '部署',
        link: '/zh/deployment/',
        activeMatch: '^/deployment/',
      },
      {
        text: 'Workbox',
        link: '/zh/workbox/',
        activeMatch: '^/workbox/',
      },
      {
        text: `v${version}`,
        items: [
          {
            text: 'Vite Plugin PWA',
            items: [
              {
                text: '更新日志',
                link: 'https://github.com/vite-pwa/vite-plugin-pwa/releases',
              },
              {
                text: '参与贡献',
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
                text: '文档',
                link: 'https://iles-docs.netlify.app/guide/pwa',
              },
            ],
          },
          {
            text: '集成',
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
      '/zh/guide/': prepareSidebar(0),
      '/zh/assets-generator/': prepareSidebar(1),
      '/zh/frameworks/': prepareSidebar(2),
      '/zh/examples/': prepareSidebar(3),
      '/zh/deployment/': prepareSidebar(4),
      '/zh/workbox/': prepareSidebar(5),
    },
  },
})
