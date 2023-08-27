---
title: Vite, Rollup, PWA and Workbox cookbook | Guide
outline: deep
---

<script setup>
const images = Object.entries(
  import.meta.glob('/assets/*.svg', { as: 'raw', eager: true })
).reduce((acc, [image, content]) => {
  const name = image.replace('/assets/', '')
  acc[name.replace('.svg', '')] = content
  return acc
}, {})

</script>

# Vite, Rollup, PWA and Workbox cookbook

In this page we're going to explain how `vite-plugin-pwa` build the service worker.

You can <a href="/vite-plugin-pwa.excalidraw" download="vite-plugin-pwa.excalidraw">download Excalidraw source diagram</a> for the SVG images and [open it in Excalidraw website](https://excalidraw.com).

## Vite Build CLI

<div v-html="images['vite-build-cli']"></div>

## Vite config file

<div v-html="images['vite-config-file']"></div>

## closeBundle hook

<div v-html="images['close-bundle-hook']"></div>
