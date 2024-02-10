From `v0.18.0`, `vite-plugin-pwa` adds five new options to `injectManifest` option to allow customizing the service worker build output:
- `target`: you can change the `target` build, the plugin will use the Vite's [build.target](https://vitejs.dev/config/build-options.html#build-target) option if not configured
- `minify`: you can change the `minify` build, the plugin will use the Vite's [build.minify](https://vitejs.dev/config/build-options.html#build-minify) option if not configured
- `sourcemap`: you can change the `sourcemap` build, the plugin will use the Vite's [build.sourcemap](https://vitejs.dev/config/build-options.html#build-sourcemap) option if not configured
- `enableWorkboxModulesLogs`: you can enable/disable the `workbox` modules log for a development or production build, by default, the plugin will use `process.env.NODE_ENV` (Workbox modules logs logic will be removed from the service worker in `production` build: dead code elimination)
- `buildPlugins`: you can add custom Rollup and/or Vite plugins to the service worker build

The new Vite build will allow you to use [.env Files](https://vitejs.dev/guide/env-and-mode.html#env-files), the `mode` option in your PWA configuration will not be used when using `injectManifest` strategy, the plugin will use the Vite's [mode](https://vitejs.dev/config/#mode) option instead:
- use `import.meta.env.MODE` to access the Vite mode inside your service worker.
- use `import.meta.env.DEV` or `import.meta.env.PROD` to check if the service worker is running on development or production (equivalent to `process.env.NODE_ENV`), check Vite [NODE_ENV and Modes](https://vitejs.dev/guide/env-and-mode#node-env-and-modes) docs.

::: tip
If you are using TypeScript in your service worker accessing `import.meta.env` variables, if TypeScript complains, add the following reference to the beginning of your service worker code:
```ts
/// <reference types="vite/client" />
```
:::
