---
title: Testing Service Worker | 指南
---

# Testing Service Worker

There are quite a few test libraries, `vite-plugin-pwa` uses [Vitest](https://vitest.dev/) for build testing and [Playwright](https://playwright.dev/) for in-browser testing (with the Chromium browser only).

You can check any framework example in the `examples` folder in the corresponding repo:
- [vite-plugin-pwa](https://github.com/vite-pwa/vite-plugin-pwa/tree/main/examples)
- [@vite-pwa/nuxt](https://github.com/vite-pwa/nuxt) (in root folder)
- [@vite-pwa/sveltekit](https://github.com/vite-pwa/sveltekit/tree/main/examples)

and the corresponding contributing guide:
- [running tests in vite-plugin-pwa](https://github.com/vite-pwa/vite-plugin-pwa/blob/main/CONTRIBUTING.md#running-tests)
- [running tests in @vite-pwa/nuxt](https://github.com/vite-pwa/nuxt/blob/main/CONTRIBUTING.md#running-tests)
- [running tests in @vite-pwa/sveltekit](https://github.com/vite-pwa/sveltekit/blob/main/CONTRIBUTING.md#running-tests)

`vite-plugin-pwa` and `@vite-pwa/nuxt` have been added to the [Vite ecosystem-ci](https://github.com/vitejs/vite-ecosystem-ci) and [Nuxt ecosystem-ci](https://github.com/nuxt/ecosystem-ci) respectively to detect possible regressions in new Vite/Nuxt versions:
- [Discord Vite ecosystem-ci](https://discord.com/channels/804011606160703521/928398470086291456)
- [Discord Nuxt ecosystem-ci](https://discord.com/channels/473401852243869706/1098558476483055656)

We're also working to include `@vite-pwa/sveltekit` in the [Svelte ecosystem-ci](https://github.com/sveltejs/svelte-ecosystem-ci).

## Testing build

Check `vitest.config.mts` in the root folder and the `test` folder in each example.

You have a `test` script in each example `package.json` file to run build and in-browser tests.

## Testing in-browser

Check `playwright.config.ts` in the root folder and the `client-test` folder in each example.

You have a `test` script in each example `package.json` file to run build and in-browser tests.

In this case, we also need to start a server to run the tests, check `webServer` in `playwright.config.ts`.
