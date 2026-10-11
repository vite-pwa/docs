<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import HomePage from './components/HomePage.vue'
import ReloadPrompt from './components/ReloadPrompt.vue'
</script>

<template>
  <DefaultTheme.Layout>
    <template #home-features-after>
      <HomePage />
    </template>
    <template #layout-bottom>
      <ReloadPrompt />
    </template>
  </DefaultTheme.Layout>
</template>
