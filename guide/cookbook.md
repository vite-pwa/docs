---
title: Vite, Rollup, PWA and Workbox cookbook | Guide
outline: deep
---

<script setup>
import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue'

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

You can download Excalidraw source diagram for the SVG images and open it in Excalidraw website using the following links:

<VPButton href="/vite-plugin-pwa.excalidraw" download="vite-plugin-pwa.excalidraw" text="Download the source code"></VPButton>
<br/>
<br/>
<VPButton href="https://excalidraw.com" text="Open Excalidraw"></VPButton>

## Vite Build CLI

<div v-html="images['vite-build-cli']"></div>

## Vite config file

<div v-html="images['vite-config-file']"></div>

## closeBundle hook

<div v-html="images['close-bundle-hook']"></div>
