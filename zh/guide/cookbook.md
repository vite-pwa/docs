---
title: Vite, Rollup, PWA and Workbox Cookbook | 指南
outline: deep
---

<script setup>
const images = Object.entries(
  import.meta.glob('/assets/*.svg', { query: '?raw', eager: true, import: 'default' })
).reduce((acc, [image, content]) => {
  const name = image.replace('/assets/', '')
  acc[name.replace('.svg', '')] = content
  return acc
}, {})
</script>

# Vite, Rollup, PWA and Workbox cookbook

In this page we're going to explain how `vite-plugin-pwa` builds the service worker.

You can <a href="https://excalidraw.com/#json=TwI1I_rRXYcGFINLH-Yrw,JRavRIdQuT-uvqjTi6S3Qg">open Excalidraw source diagram</a> for the SVG images.

## Vite config file

<div v-html="images['vite-config-file']"></div>

## Vite Build CLI

<div v-html="images['vite-build-cli']"></div>

## vite-plugin-pwa closeBundle hook

<div v-html="images['close-bundle-hook']"></div>

## workbox-build injectManifest

<div v-html="images['inject-manifest']"></div>
