<script setup lang="ts">
import { useMediaQuery, useOnline } from '@vueuse/core'
import { onUnmounted, ref, watch } from 'vue'

const online = useOnline()
// Detect system preference for reduced motion
const isReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

// Animation phases
const isVisible = ref(false)
const isShaking = ref(false)
const isExpanded = ref(false)
const isInverted = ref(false)

let timer: ReturnType<typeof setTimeout>

const clearTimeouts = () => clearTimeout(timer)

watch([online, isReducedMotion] as const, ([isOnline, reduceMotion]) => {
  clearTimeouts()

  if (!isOnline) {
    // If the user prefers reduced motion, skip animations and jump to final state
    if (reduceMotion) {
      isVisible.value = true
      isShaking.value = false
      isExpanded.value = false
      isInverted.value = true
      return
    }

    // Ensure solid colors on start
    isInverted.value = false
    // Pop (Appears and grows)
    isVisible.value = true

    timer = setTimeout(() => {
      // Shake
      isShaking.value = true

      timer = setTimeout(() => {
        // Stretch (Reveals the text)
        isShaking.value = false
        isExpanded.value = true

        timer = setTimeout(() => {
          // Shrink (Hides the text and remains as an icon)
          isExpanded.value = false

          // Invert colors once the shrink animation completes (0.4s)
          timer = setTimeout(() => {
            isInverted.value = true
          }, 400)
        }, 2500)
      }, 500) // Duration of the shake
    }, 400) // Time for the initial Pop to finish
  }
  else {
    // Instant hide for reduced motion
    if (reduceMotion) {
      isVisible.value = false
      isShaking.value = false
      isExpanded.value = false
      isInverted.value = false
      return
    }

    // Internet is back: we pick up the cable and disappear
    isExpanded.value = false
    isShaking.value = false
    // don't revert colors for the fade out
    // isInverted.value = false

    // We give it a breather to shrink before hiding it completely
    timer = setTimeout(() => {
      isVisible.value = false
    }, 300)
  }
}, { immediate: true })

onUnmounted(clearTimeouts)
</script>

<template>
  <div class="relative w-[34px] h-[34px] flex items-center justify-center">
    <div
      class="offline-indicator absolute z-100 flex items-center dark:shadow-md"
      :class="[
        isInverted
          ? 'bg-white text-red-600 dark:bg-gray-800 dark:text-red-400'
          : 'bg-red-600 text-white dark:bg-red-400 dark:text-red-950',
        {
          'is-visible': isVisible,
          'is-shaking': isShaking,
          'is-expanded': isExpanded,
          'no-motion': isReducedMotion,
        },
      ]"
      role="alert"
      aria-live="assertive"
    >
      <div aria-hidden="true" class="icon-wrapper flex-shrink-0 flex justify-center items-center h-full w-[28px] md:w-[30px]">
        <svg class="w-4 h-4" viewBox="0 0 24 24" role="img" aria-labelledby="offline-title">
          <title id="offline-title">You're offline</title>
          <path fill="currentColor" d="m19.75 22.6l-9.4-9.45q-1.175.275-2.187.825T6.35 15.35l-2.1-2.15q.8-.8 1.725-1.4t1.975-1.05L5.7 8.5q-1.025.525-1.913 1.163T2.1 11.1L0 8.95q.8-.8 1.663-1.437T3.5 6.3L1.4 4.2l1.4-1.4l18.4 18.4zm-1.85-7.55l-.725-.725l-.725-.725l-3.6-3.6q2.025.2 3.787 1.025T19.75 13.2zm4-3.95q-1.925-1.925-4.462-3.012T12 7q-.525 0-1.012.038T10 7.15L7.45 4.6q1.1-.3 2.238-.45T12 4q3.55 0 6.625 1.325T24 8.95zM12 21l-3.525-3.55q.7-.7 1.613-1.075T12 16t1.913.375t1.612 1.075z" />
        </svg>
      </div>
      <span
        class="text-xs font-semibold whitespace-nowrap overflow-hidden transition-all duration-300"
        :class="[
          isExpanded ? 'opacity-100 pl-1 pr-4' : 'opacity-0 pl-0 pr-0',
          { '!duration-0 !transition-none': isReducedMotion },
        ]"
      >
        You're offline
      </span>
    </div>
  </div>
</template>

<style scoped>
.offline-indicator {
  height: 28px;
  width: 28px;
  border-radius: 9999px;

  /* The Pop is done from the center of the 28px circle (radius 14px) */
  transform-origin: 14px center;
  transform: scale(0);
  opacity: 0;
  pointer-events: none;

  /* Fixed positioning anchored to the left. Without right: 0, the width stretches to the right.
     Since the wrapper is 34px and the icon is 28px, 3px centers it perfectly (28+6=34) */
  top: 3px;
  left: 3px;

  transition: width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
  transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
  opacity 0.3s ease,
  background-color 0.4s ease,
  color 0.4s ease;
}

.offline-indicator.is-visible {
  transform: scale(1);
  opacity: 1;
}

.offline-indicator.is-expanded {
  width: 122px;
}

@media (min-width: 769px) {
  .offline-indicator {
    height: 30px;
    width: 30px;

    /* For the 30px icon in the 34px wrapper, 2px centers it (30+4=34) */
    top: 2px;
    left: 2px;
    transform-origin: 15px center;
  }
  .offline-indicator.is-expanded {
    width: 130px;
  }
}

@keyframes shake-indicator {
  0%, 100% { transform: scale(1) translateX(0); }
  20% { transform: scale(1) translateX(-2px) rotate(-4deg); }
  40% { transform: scale(1) translateX(2px) rotate(4deg); }
  60% { transform: scale(1) translateX(-2px) rotate(-4deg); }
  80% { transform: scale(1) translateX(2px) rotate(4deg); }
}

.offline-indicator.is-shaking {
  animation: shake-indicator 0.5s ease-in-out forwards;
}

/* Force CSS transition bypass if reduced motion is active */
.offline-indicator.no-motion {
  transition: none !important;
  animation: none !important;
}

@media (prefers-reduced-motion: reduce) {
  .offline-indicator {
    transition: none !important;
    animation: none !important;
  }
}
</style>
