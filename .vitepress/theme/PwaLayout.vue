<script setup lang="ts">
import { useOnline } from '@vueuse/core'
import { inBrowser, useData, useRoute, useRouter } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { onMounted, shallowRef, watch } from 'vue'
import HomePage from './components/HomePage.vue'
import NotFound from './components/NotFound.vue'
import OfflineToast from './components/OfflineToast.vue'
import ReloadPrompt from './components/ReloadPrompt.vue'

const online = useOnline()
const route = useRoute()
const router = useRouter()
const { page } = useData()

const apiPageOffline = shallowRef<string | undefined>()
const apiPageOfflineRetry = shallowRef<boolean>(false)

const failedRetries = new Set<string>()

async function retry() {
  if (!inBrowser) {
    return
  }
  const url = apiPageOffline.value
  if (!url) {
    return
  }
  if (!online.value) {
    const url = apiPageOffline.value
    if (url && !failedRetries.has(url)) {
      failedRetries.add(url)
    }
  }

  await router.go(url)
}

watch(() => [
  route.path,
  route.query,
  route.hash,
  page.value.isNotFound === true,
  online.value,
] as const, ([path, query, hash, is404, isOnline]) => {
  if (!inBrowser) {
    return
  }
  if (isOnline) {
    failedRetries.clear()
    apiPageOfflineRetry.value = false
  }
  if (isOnline || !is404) {
    if (!is404) {
      const url = new URL(path, window.location.origin)
      failedRetries.delete(url.pathname)
    }
    // don't clean up the offline page if we are online or if the page is not a 404
    // if 404 and the client becomes online the 404 page will change the try again button text and link
    return
  }
  let url = new URL(path, window.location.origin)
  url.search = query
  url.hash = hash
  const q = url.searchParams.get('q')
  if (!q) {
    apiPageOfflineRetry.value = false
    apiPageOffline.value = undefined
    return
  }
  url = new URL(q, window.location.origin)
  apiPageOffline.value = url.pathname
  apiPageOfflineRetry.value = !failedRetries.has(url.pathname)
}, { immediate: true })

const needRefresh = shallowRef(false)

let updateServiceWorker: (() => Promise<void>) | undefined

onMounted(async () => {
  const { registerSW } = await import('virtual:pwa-register')
  updateServiceWorker = registerSW({
    immediate: true,
    onNeedRefresh: () => {
      needRefresh.value = true
    },
  })
})
</script>

<template>
  <DefaultTheme.Layout>
    <template #home-features-after>
      <HomePage />
    </template>
    <template #not-found>
      <NotFound
        :online
        :retry="apiPageOfflineRetry"
        :api-page-offline="apiPageOffline"
        @retry="retry"
      />
    </template>
    <template #nav-bar-content-before>
      <ClientOnly>
        <OfflineToast />
      </ClientOnly>
    </template>
    <template #layout-bottom>
      <ClientOnly>
        <ReloadPrompt
          v-if="needRefresh"
          @close="needRefresh = false"
          @reload="updateServiceWorker?.()"
        />
      </ClientOnly>
    </template>
  </DefaultTheme.Layout>
</template>
