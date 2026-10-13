<script setup lang="ts">
import { useData } from 'vitepress'
import { useLayout } from 'vitepress/theme'
import { onMounted, shallowRef, watchEffect } from 'vue'

const { site } = useData()
const { hasSidebar } = useLayout()
const hasSidebarClass = shallowRef(false)

onMounted(() => {
  watchEffect(() => {
    hasSidebarClass.value = hasSidebar.value
  })
})
</script>

<template>
  <div class="VPNavBarTitle" :class="{ 'has-sidebar': hasSidebarClass }">
    <a class="title" :href="site.base">
      <img dark-logo class="logo" src="/unplugin-pwa-hero-dark.svg" alt="Unplugin PWA dark logo" width="136" height="50">
      <img light-logo class="logo" src="/unplugin-pwa-hero.svg" alt="Unplugin PWA light logo" width="136" height="50">
    </a>
  </div>
</template>

<style scoped>
.VPNavBarTitle {
  flex-shrink: 0;
  border-bottom: 1px solid transparent;
}

@media (min-width: 960px) {
  .VPNavBarTitle.has-sidebar {
    margin-right: 32px;
    width: calc(var(--vp-sidebar-width) - 64px);
    border-bottom-color: var(--vp-c-divider-light);
    background-color: var(--vp-c-bg-alt);
  }
}

.title {
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--vp-nav-height);
  font-size: 1.3rem;
  line-height: 2rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  transition: opacity 0.25s;
}

@media (min-width: 960px) {
  .title {
    flex-shrink: 0;
  }
}

.logo {
  width: 136px;
  height: 50px;
}
</style>
