---
title: VitePress | Frameworks
outline: deep
---

# VitePress

<ChangeLog />

::: warning
We recommend you use the latest version of VitePress. The latest versions will also require you to update your application to use Vite ^3.1.0.
:::

::: info
For `Type declarations`, `Prompt for update` and `Periodic SW Updates` go to [Vue 3](/frameworks/vue#vue-3) entry.
:::

## VitePress PWA Module

`vite-plugin-pwa` provides the new `withPwa` module augmentation that will allow you to use `vite-plugin-pwa` in your VitePress applications.

You will need to install `@vite-pwa/vitepress` using:
::: code-group
  ```bash [pnpm]
  pnpm add -D @vite-pwa/vitepress
  ```
  ```bash [yarn]
  yarn add -D @vite-pwa/vitepress
  ```
  ```bash [npm]
  npm install -D @vite-pwa/vitepress
  ```
:::

To update your project to use the new `vite-plugin-pwa` for VitePress, you only need to wrap your VitePress config with `withPwa` (you don't need oldest `pwa` and `pwa-configuration` modules):
```ts
// .vitepress/config.ts
import { defineConfig } from 'vitepress'
import { withPwa } from '@vite-pwa/vitepress'

export default withPwa(defineConfig({
  /* your VitePress options */
  /* Vite PWA Options */
  pwa: {}
}))
```

## Import Virtual Modules

Since VitePress uses SSR/SSG, we need to call the `vite-plugin-pwa` virtual module using a dynamic `import`. This can be done in the [theme](https://vitepress.vuejs.org/guide/theme-introduction). You can either configure the plugin to auto update or prompt for update. Refer below for examples.

### Auto Update

::: details .vitepress/theme/index.ts
```ts
import { h } from 'vue'
import Theme from 'vitepress/theme'

import RegisterSW from './components/RegisterSW.vue'

export default {
  ...Theme,
  Layout() {
    return h(Theme.Layout, null, {
      'layout-bottom': () => h(RegisterSW)
    })
  }
}
```
:::

::: details  .vitepress/theme/components/RegisterSW.vue
```vue
<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'

const offlineReady = ref(false)
function onOfflineReady() {
  offlineReady.value = true
}
async function close() {
  offlineReady.value = false
}

onBeforeMount(async () => {
  const { registerSW } = await import('virtual:pwa-register')
  registerSW({
    immediate: true,
    onOfflineReady,
    onRegistered() {
      console.info('Service Worker registered')
    },
    onRegisterError(e) {
      console.error('Service Worker registration error!', e)
    },
  })
})
</script>

<template>
  <template v-if="offlineReady">
    <div
      class="pwa-toast"
      role="alertdialog"
      aria-labelledby="pwa-message"
    >
      <div id="pwa-message" class="mb-3">
        App ready to work offline
      </div>
      <button
        type="button"
        class="pwa-cancel"
        @click="close"
      >
        Close
      </button>
    </div>
  </template>
</template>

<style>
    .pwa-toast {
        position: fixed;
        right: 0;
        bottom: 0;
        margin: 16px;
        padding: 12px;
        border: 1px solid #8885;
        border-radius: 4px;
        z-index: 100;
        text-align: left;
        box-shadow: 3px 4px 5px 0 #8885;
        background-color: white;
    }
    .pwa-toast #pwa-message {
        margin-bottom: 8px;
    }
    .pwa-toast button {
        border: 1px solid #8885;
        outline: none;
        margin-right: 5px;
        border-radius: 2px;
        padding: 3px 10px;
    }
</style>
```
:::

### Prompt for update

::: details .vitepress/theme/index.ts
```ts
import { h } from 'vue'
import Theme from 'vitepress/theme'

import ReloadPrompt from './components/ReloadPrompt.vue'

export default {
  ...Theme,
  Layout() {
    return h(Theme.Layout, null, {
      'layout-bottom': () => h(ReloadPrompt)
    })
  }
}
```
:::

::: details  .vitepress/theme/components/ReloadPrompt.vue
```vue
<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'

const offlineReady = ref(false)
const needRefresh = ref(false)

let updateServiceWorker: (() => Promise<void>) | undefined

function onOfflineReady() {
  offlineReady.value = true
}
function onNeedRefresh() {
  needRefresh.value = true
}
async function close() {
  offlineReady.value = false
  needRefresh.value = false
}

onBeforeMount(async () => {
  const { registerSW } = await import('virtual:pwa-register')
  updateServiceWorker = registerSW({
    immediate: true,
    onOfflineReady,
    onNeedRefresh,
    onRegistered() {
      console.info('Service Worker registered')
    },
    onRegisterError(e) {
      console.error('Service Worker registration error!', e)
    },
  })
})
</script>

<template>
  <template v-if="offlineReady || needRefresh">
    <div
      class="pwa-toast"
      role="alertdialog"
      aria-labelledby="pwa-message"
    >
      <div id="pwa-message" class="mb-3">
        {{ offlineReady ? 'App ready to work offline' : 'New content available, click the reload button to update.' }}
      </div>
      <button
        v-if="needRefresh"
        type="button"
        class="pwa-refresh"
        @click="updateServiceWorker?.()"
      >
        Reload
      </button>
      <button
        type="button"
        class="pwa-cancel"
        @click="close"
      >
        Close
      </button>
    </div>
  </template>
</template>

<style>
    .pwa-toast {
        position: fixed;
        right: 0;
        bottom: 0;
        margin: 16px;
        padding: 12px;
        border: 1px solid #8885;
        border-radius: 4px;
        z-index: 100;
        text-align: left;
        box-shadow: 3px 4px 5px 0 #8885;
        background-color: white;
    }
    .pwa-toast #pwa-message {
        margin-bottom: 8px;
    }
    .pwa-toast button {
        border: 1px solid #8885;
        outline: none;
        margin-right: 5px;
        border-radius: 2px;
        padding: 3px 10px;
    }
</style>
```
:::

## Experimental

### includeAllowlist

To prevent breaking Vitepress layout when the user visits a page that does not exist, you can enable the new experimental option `includeAllowlist`, requires VitePress `1.0.0-rc.14+`. 

Check the problem in the following issue: https://github.com/vite-pwa/vitepress/issues/22.

You also need to force your server to return response with status code 404 when the requested page doesn't exist.

This option is only available for the `generateSW` strategy, to enable it, you need to add the following configuration:
```ts
// .vitepress/config.ts
import { defineConfig } from 'vitepress'
import { withPwa } from '@vite-pwa/vitepress'

export default withPwa(defineConfig({
  /* your VitePress options */
  /* Vite PWA Options */
  pwa: {
    strategies: 'generateSW', // <== if omitted, defaults to `generateSW`  
    workbox: { /* your workbox configuration if any */ },
    experimental: {
      includeAllowlist: true
    }
  }
}))
```

If you're using `injectManifest` strategy, you can find the required logic in the following [experimiental service worker](https://github.com/vite-pwa/vitepress/blob/main/examples/pwa-simple-sw/.vitepress/sw.ts).

## PWA Assets <Badge text="Experimental" type="tip"/> <Badge type="tip" text="from v0.4.0" />

`@vite-pwa/vitepress` plugin will configure `integration` option properly. VitePress dev server will be restarted when changing the configuration (inlined or using external file).
