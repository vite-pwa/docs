<script setup lang="ts">
const emit = defineEmits<{
  (evt: 'close'): void
  (evt: 'reload'): void
}>()
</script>

<template>
  <div
    class="pwa-toast z-100 bg-$vp-c-bg b b-solid b-1px b-color-$pwa-border fixed right-0 bottom-0 m-6 px-6 py-4 rounded-2 shadow-xl"
    role="alertdialog"
    aria-labelledby="pwa-message"
  >
    <div id="pwa-message" class="mb-3">
      New content available, click the reload button to update.
    </div>
    <button
      type="button"
      class="pwa-refresh mr-2 px-3 py-1 rounded"
      @click="emit('reload')"
    >
      Reload
    </button>
    <button
      type="button"
      class="pwa-cancel b b-solid b-1px !b-color-$pwa-border mr-2 px-3 py-1 rounded"
      @click="emit('close')"
    >
      Close
    </button>
  </div>
</template>
