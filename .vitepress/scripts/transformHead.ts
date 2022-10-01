import type { HeadConfig, TransformContext } from 'vitepress'

export const transformHead = async ({ pageData }: TransformContext): Promise<HeadConfig[]> => {
  const head: HeadConfig[] = []
  head.push(['link', { rel: 'prefetch', href: '/icon_light.svg' }])
  head.push(['link', { rel: 'prefetch', href: '/icon_dark.svg' }])
  if (pageData.relativePath === 'index.md') {
    head.push(['link', { rel: 'prefetch', href: '/banner_light.svg' }])
    head.push(['link', { rel: 'prefetch', href: '/banner_dark.svg' }])
  }

  if (pageData.relativePath === 'guide/prompt-for-update.md')
    head.push(['link', { rel: 'prefetch', href: '/prompt-update.png' }])

  return head
}
