::: info
From `v0.18.0+` you can use `minify`, `sourcemap` and `enableWorkboxModulesLogs` in your `injectManifest` configuration option, check [New Vite Build](/guide/change-log#new-vite-build) section for more details.
:::

Since you are building your own service worker, this plugin will use Vite's `build.sourcemap` configuration option, which default value is `false`, to generate the source map.

If you want to generate the source map for your service worker, you will need to generate the source map for the entire application.
