---
title: Getting Started | Unplugin PWA
next: true
prev:
  text: Apache Http Server 2.4+ | Deployment
  link: /deployment/apache
---

# Getting Started

Welcome to the **PWA** ecosystem!

`unplugin-pwa` is the next evolution of PWA integration for modern web development. Building upon the robust foundation of `vite-plugin-pwa`, this new universal suite allows you to seamlessly add Progressive Web App capabilities—like offline support, web manifests, and service workers—to your projects, regardless of your chosen bundler.

Before jumping into the installation steps and basic configuration, let's take a look at the core philosophy behind this new architecture.

## Why a Modular Ecosystem?

The new architecture shifts the responsibility away from rigid configurations toward an extensible, programmatic pipeline where integrations and meta-frameworks *know exactly what to do*.

* **Granular and Modular**: Instead of forcing you into a single monolithic config, you can now compose your PWA layer using low-level plugin pieces or stick to the simple application-level wrapper.
* **Universal Bundler Support (`unplugin`)**: By embracing the `unplugin` architecture, the ecosystem breaks free from Vite-only constraints. It now provides native, first-class adapters for **Webpack**, **Rspack**, **Rsbuild**, and **Rolldown**, ensuring a unified and consistent PWA configuration API regardless of your underlying build tool.
* **Next-Gen Meta-Framework Logic**: Meta-framework integrations (Nuxt, SvelteKit, Astro, VitePress, etc.) are getting a massive logic simplification. The underlying core plugins will handle the orchestration natively without complex boilerplate hacks.
* **Vite Environment API Ready**: The new core is built looking forward. It comes with out-of-the-box support for Vite 8 and features on-demand activation for the new **Vite Environment API** (introduced at Vite 6). The underlying framework integrations will automatically tap into these environments when required—only when activated on demand—meaning zero dead weight for standard builds.
* **Smart Dual-Registration & Zero-Overhead DCE**: When Dual Build is active, the generated virtual modules utilize the `esm-sw-detector` to dynamically register the ESM or Classic variant depending on browser capabilities. However, if the consumer configures a single baseline build (pure Classic or pure ESM), the compiler applies aggressive **Tree-Shaking / Dead Code Elimination (DCE)** to entirely purge the `esm-sw-detector` logic from the resulting virtual chunk, guaranteeing zero overhead for standard applications.
* **Native TrustedScriptURL & CSP Compliance**: Legacy virtual modules lacked flexibility when strict Content Security Policies were enforced during Service Worker registration. The new architecture introduces first-class support for `TrustedScriptURL`, including a highly flexible, custom callback option to safely resolve and sanitize the script URL before registration kicks in.

## Architecture & Integrations

`unplugin-pwa` has evolved from a monolithic Vite plugin into a modular, framework-agnostic ecosystem.

If you are a framework maintainer, module author, or just curious about how the inner pieces fit together (Core, Builders, Client types, and Workbox), check out our comprehensive [Architecture & Lifecycle Guide](https://github.com/vite-pwa/unplugin-pwa/blob/main/ARCHITECTURE.md).

