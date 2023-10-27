---
title: Nuxt 3 | Examples
next: Getting Started | Deploy
---

# Nuxt 3

You need to stop the dev server once started and then to see the PWA in action run:
- `nr dev:preview:build`: Nuxt build command + start server
- `nr dev:preview:generate`: Nuxt generate command + start server

<table>
<thead>
<tr>
<th>Example</th>
<th>Source</th>
<th>Playground</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>Auto Update PWA</code></td>
<td>
<a href="https://github.com/vite-pwa/nuxt/tree/main/playground" target="_blank" rel="noopener noreferrer">GitHub</a>
</td>
<td>
<a href="https://stackblitz.com/fork/github/vite-pwa/nuxt" target="_blank" rel="noopener noreferrer">
  <img src="https://developer.stackblitz.com/img/open_in_stackblitz.svg" alt="Open in StackBlitz" width="162" height="32">
</a>
</td>
</tr>
</tbody>
</table>

::: info WIP
You can also check [Elk repo](https://github.com/elk-zone/elk) for a real world example: we're working to update the repo.

Elk repo is using `Push Notifications` and `Web Share Target API` PWA capabilities and `Prompt for update` register type via `injectManifest` strategy.
:::
