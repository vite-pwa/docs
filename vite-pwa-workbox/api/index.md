---
title: API Reference | Vite PWA Workbox
next: true
prev: true
---

# API Reference

<script setup>
import { data } from './index.data';
const useGroups = data.groups.map(pkg => {
  const prefix = pkg.pkg.startsWith('workbox-')
    ? '@vite-pwa/'
    : pkg.pkg.startsWith('unplugin-pwa-')
      ? '@unplugin-pwa/'
      : '';

  return {
    ...pkg,
    pkgName: `${prefix}${pkg.pkg}`
  }
});
</script>

<p>{{ data.total }} symbols across {{ data.groups.length }} packages, generated at build time from the published per-package JSON.</p>

<template v-for="g in useGroups" :key="g.pkg">
  <h2 :id="g.id">
    <a :href="'/vite-pwa-workbox/api/packages/' + g.packageSlug">{{ g.pkgName }}</a>
  </h2>
  <p>{{ g.items.length }} symbol(s)</p>
  <ul class="api">
    <li v-for="s in g.items" :key="s.slug">
      <a :href="'/vite-pwa-workbox/api/symbols/' + s.slug">{{ s.name }}</a>
      &nbsp;<Badge type="info" :text="s.kind" />
    </li>
  </ul>
</template>
