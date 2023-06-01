---
title: Testing Service Worker | Guide
---

# Testing Service Worker

There are quite a few test libraries, `vite-plugin-pwa` uses [Vitest](https://vitest.dev/) for build testing and [Playwright](https://playwright.dev/) for in-browser testing (with the Chromium browser only).

You can check any framework example in the `examples` folder in the repo and the [contributing guide](https://github.com/vite-pwa/vite-plugin-pwa/blob/main/CONTRIBUTING.md#running-tests).

## Testing build

Check `vitest.config.mts` in the root folder and the `test` folder in each example.

You have a `test` script in each example `package.json` file to run build and in-browser tests.

## Testing in-browser

Check `playwright.config.ts` in the root folder and the `client-test` folder in each example.

You have a `test` script in each example `package.json` file to run build and in-browser tests.

In this case, we also need to start a server to run the tests, check `webServer` in `playwright.config.ts`.
