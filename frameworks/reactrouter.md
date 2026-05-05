---
title: React Router (Framework Mode) | Frameworks
outline: deep
---

# React Router (Framework Mode)

This guide explains how to use vite-plugin-pwa with React Router in framework mode (using @react-router/dev and root.tsx).

## Setup

1. Create a new Vite project:

    `pnpm create vite`

    Select:
    - React
    - then React Router V7.
    - initialize a git project

    Install dependencies:

    `pnpm install`

    Check that the dev server starts:
    `pnpm run dev`

2. Install Vite PWA plugin:

    `pnpm add vite-plugin-pwa -D`

3. Configure Vite

    Add the Vite PWA plugin to `vite.config.ts`:

    ```ts
    import { reactRouter } from '@react-router/dev/vite';
    import { defineConfig } from 'vite';
    import { VitePWA } from 'vite-plugin-pwa'

    export default defineConfig({
    plugins: [reactRouter(), VitePWA()],
    });
    ```

## Assets

To provide installable PWA icons, you can generate assets using @vite-pwa/assets-generator:

`pnpm add -D @vite-pwa/assets-generator`.

You can also use your own images.

[Refer to the official documentation for advanced configuration.](https://vite-pwa-org.netlify.app/assets-generator/)

## Manifest

Configure the manifest into `vite.config.ts`

Example:

```ts
import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    server: {
        host: true,
    },
    plugins: [
        reactRouter(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
            manifest: {
                name: 'My React Router PWA App',
                short_name: 'My App',
                description:
                    'An application with React Router and Vite PWA',
                theme_color: '#ffffff',
                icons: [
                    {
                        src: 'pwa-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: 'pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                ],
            },
        }),
    ],
});
```

## Injecting PWA metadata

React Router does not use a static `index.html` file, you must inject PWA meta tags and links inside your root layout component.
Also add the link to the manifest in the `<head>` section.

### Root layout example

In your `root.tsx`:

```tsx
export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
            <meta charSet="utf-8" />
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />

                {/* PWA */}
                <link rel="manifest" href="/manifest.webmanifest" />
                <meta name="theme-color" content="#ffffff" />
                <link rel="apple-touch-icon" href="/apple-touch-icon-180x180.png" />
                <Links />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}
```

This replaces the usual index.html configuration used in standard Vite apps.

## Preview

Service workers are only enabled in production.

To test PWA features, build the application, then run a preview.

Add a preview script in your `package.json`:

```json
"scripts": {
    "preview": "vite preview",
}
```

Then run:

`pnpm run build`

`pnpm run preview`

Vite preview serves a static build and may not work correctly with SSR setups.
If you encounter issues, use the React Router server instead (`pnpm run start`).

## Clearing previous PWA registrations

When developing a new PWA, browsers may reuse cached Service Workers, manifests, or installation data from previous projects running on the same origin (for example localhost). This can lead to unexpected behavior such as:

- displaying an old app name or icon
- showing “Open in app” instead of an install prompt
- serving outdated cached assets
- ignoring manifest changes

### Recommended steps

- unregister Service Workers (via browser devtools)
- clear storage (Cache, IndexedDB, LocalStorage)
- uninstall previously installed PWAs
