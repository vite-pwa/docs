<script setup lang="ts">
import { useData, withBase } from 'vitepress'
import { computed } from 'vue'

const props = defineProps<{
  online: boolean
  apiPageOffline?: string
  retry: boolean
}>()

const emit = defineEmits<{
  (evt: 'retry'): void
}>()

const { theme } = useData()
const isOfflineApi = computed(() => !!props.apiPageOffline)
</script>

<template>
  <div class="NotFound">
    <p class="code">
      {{ isOfflineApi ? 'OFFLINE' : (theme.notFound?.code ?? '404') }}
    </p>
    <h1 class="title">
      <bdi>{{
        isOfflineApi
          ? (retry ? 'CONNECTION LOST' : 'PAGE NOT CACHED')
          : (theme.notFound?.title ?? 'PAGE NOT FOUND')
      }}</bdi>
    </h1>
    <div class="divider" />
    <blockquote class="quote">
      <bdi>{{
        isOfflineApi
          ? (retry
            ? 'You are currently offline. If you visited this API documentation page recently, it might be available in your local cache.'
            : 'You are currently offline and this API documentation page has not been cached yet. Please connect to the internet and try again.')
          : (theme.notFound?.quote ?? "But if you don't change your direction, and if you keep looking, you may end up where you are heading.")
      }}</bdi>
    </blockquote>

    <div class="action">
      <template v-if="isOfflineApi">
        <button
          v-if="retry"
          class="link"
          type="button"
          aria-label="check cache"
          @click="emit('retry')"
        >
          <bdi>Check cache</bdi>
        </button>

        <a
          v-else
          class="link"
          :href="withBase(apiPageOffline!)"
          aria-label="retry navigation"
        >
          <bdi>Try again</bdi>
        </a>
      </template>

      <template v-else>
        <a
          class="link"
          :href="withBase(theme.notFound?.link ?? '/')"
          :aria-label="theme.notFound?.linkLabel ?? 'go to home'"
        >
          <bdi>{{ theme.notFound?.linkText ?? 'Take me home' }}</bdi>
        </a>
      </template>
    </div>
  </div>
</template>

<style scoped>
.NotFound {
  padding: 4rem 1.5rem 6rem;
  text-align: center;
}

@media (min-width: 48rem) {
  .NotFound {
    padding: 6rem 2rem 10.5rem;
  }
}

.code {
  line-height: 1;
  font-size: 4rem;
  font-weight: 600;
}

.title {
  padding-top: 0.75rem;
  letter-spacing: 0.1em;
  line-height: 1;
  font-size: 1.25rem;
  font-weight: 700;
}

.divider {
  margin: 1.5rem auto 1.125rem;
  width: 4rem;
  height: 1px;
  background-color: var(--vp-c-divider);
}

.quote {
  margin: 0 auto;
  max-width: 16rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.action {
  padding-top: 1.25rem;
}

.link {
  display: inline-block;
  background: transparent;
  cursor: pointer;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 1rem;
  padding: 0.1875rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  transition: border-color 0.25s, color 0.25s;
}

.link:hover {
  border-color: var(--vp-c-brand-2);
  color: var(--vp-c-brand-2);
}
</style>
