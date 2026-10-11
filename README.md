<p align='center'>
    <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/vite-pwa/.github/main/unplugin-pwa-docs-hero-dark.svg" />
        <img src="https://raw.githubusercontent.com/vite-pwa/.github/main/unplugin-pwa-docs-hero.svg" alt="Inspector UI for unplugin-pwa logo">
    </picture>
</p>

<h1 align="center">PWA Ecosystem Documentation</h1>

<p align='center'>
<a href="https://vite-pwa-org.netlify.app/" target="__blank">
    <img src="https://img.shields.io/static/v1?label=&message=docs%20%26%20guides&color=2e859c" alt="Documentation & Guides">
</a>
<br>
<a href="https://github.com/antfu/vite-plugin-pwa" target="__blank">
<img alt="GitHub stars" src="https://img.shields.io/github/stars/vite-pwa/vite-pwa-docs?style=social">
</a>
</p>

<br>

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg'/>
  </a>
</p>

## 🚀 Features

- 📖 [**Documentation & guides**](https://vite-pwa-org.netlify.app/)
- 👌 **Zero-Config**: sensible built-in default configs for common use cases
- 🔩 **Extensible**: expose the full ability to customize the behavior of the plugin
- 🦾 **Type Strong**: written in [TypeScript](https://www.typescriptlang.org/)
- 🔌 **Offline Support**: generate service worker with offline support (via Workbox)
- ⚡ **Fully tree shakable**: client virtual modules are strictly optimized for Dead Code Elimination.
- 📄 **Web Manifest**: auto-inject Web App Manifest and PWA assets seamlessly.
- 💬 **Prompt for new content**: built-in support for Vanilla JavaScript, Vue 3, React, Svelte, SolidJS and Preact
- ⚙️ **Stale-while-revalidate**: automatic reload when new content is available
- ✨ **Static assets handling**: configure static assets for offline support
- 🐞 **Development Support**: debug your custom service worker logic as you develop your application
- 🔍 **Inspector**: visually inspect your resolved configuration, web manifest and service worker during development, via middleware or [DevFrame](https://github.com/devframes/devframe)
- 🧩 **Modular**: use the ready-to-use plugins or compose your own integration from the building blocks in `@unplugin-pwa/core` and `@unplugin-pwa/vite`
- 📦 **Universal Bundlers**: native integration with Vite, Rolldown, Webpack (WIP), Rspack (WIP), and Rsbuild (WIP).
- 🛠️ **Meta-Frameworks**: seamless integration with [îles](https://github.com/ElMassimo/iles), [SvelteKit](https://github.com/sveltejs/kit), [VitePress](https://github.com/vuejs/vitepress), [Astro](https://github.com/withastro/astro), [Nuxt 3/4/5](https://github.com/nuxt/nuxt), [React Router](https://github.com/remix-run/react-router/), [TanStack](https://github.com/TanStack) and [Next](https://github.com/vercel/next.js/) (WIP).
- 💥 **PWA Assets Generator**: generate all the PWA assets from a single command and a single source image
- 🚀 **PWA Assets Integration**: serving, generating and injecting PWA Assets on the fly in your application

> [!WARNING]
> **Work In Progress (WIP)**
> While the Vite ecosystem and its associated meta-frameworks are fully operational, adapters for **Webpack, Rspack, Rsbuild**, and the **Next.js** integration are currently under active development. They are provided as previews and are not yet ready for production use.

## 📦 Integrations

- [îles](https://github.com/ElMassimo/iles/tree/main/packages/pwa): documentation can be found [here](https://iles-docs.netlify.app/guide/pwa)
- [SvelteKit](https://github.com/vite-pwa/sveltekit)
- [VitePress](https://github.com/vite-pwa/vitepress)
- [Astro](https://github.com/vite-pwa/astro)
- [Nuxt](https://github.com/vite-pwa/nuxt)
- [React Router](https://github.com/vite-pwa/react-router)
- [TanStack](https://github.com/vite-pwa/tanstack)
- [Remix (deprecated)](https://github.com/remix-run/remix)

## 🏗️ Architecture & Integrations

`unplugin-pwa` has evolved from a monolithic Vite plugin into a modular, framework-agnostic ecosystem.

If you are a framework maintainer, module author, or just curious about how the inner pieces fit together (Core, Builders, Client types, and Workbox), check out our comprehensive [Architecture & Lifecycle Guide](https://github.com/vite-pwa/unplugin-pwa/blob/main/ARCHITECTURE.md).

## 📄 License

[MIT](./LICENSE) License &copy; 2021-PRESENT [Anthony Fu](https://github.com/antfu)
