Check [New Vite Build](/guide/change-log#new-vite-build) section for more details, the error described below has been fixed in `v0.18.0+` and there is no need to use `iife` format to build your service worker.

If your service worker code is being compiled with unexpected `exports` (for example: `export default require_sw();`), you can change the build output format to `iife`, add the following code to your pwa configuration:

```ts
injectManifest: {
  rollupFormat: 'iife'
}
```
