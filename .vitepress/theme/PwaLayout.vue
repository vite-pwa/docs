<script setup lang="ts">
import { useData } from 'vitepress'
import DefaultTheme, { VPHomeHero, VPImage } from 'vitepress/theme'
import type { DefaultTheme as DTheme } from 'vitepress/theme'
import { nextTick, provide } from 'vue'
import HomePage from './components/HomePage.vue'
import ReloadPrompt from './components/ReloadPrompt.vue'

const { isDark } = useData()

const image: DTheme.ThemeableImage = {
  light: '/icon_light.svg',
  dark: '/icon_dark.svg',
  alt: 'Vite PWA Logo',
}

function enableTransitions() {
  return 'startViewTransition' in document
    && window.matchMedia('(prefers-reduced-motion: no-preference)').matches
}

provide('toggle-appearance', async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value
    return
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y),
    )}px at ${x}px ${y}px)`,
  ]

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  }).ready

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: 'ease-in',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`,
    },
  )
})
</script>

<template>
  <DefaultTheme.Layout>
    <template #home-hero>
      <VPHomeHero>
        <template #home-hero-image>
          <VPImage :image="image" />
        </template>
      </VPHomeHero>
    </template>
    <template #home-features-after>
      <HomePage />
    </template>
    <template #layout-bottom>
      <ReloadPrompt />
    </template>
  </DefaultTheme.Layout>
</template>
