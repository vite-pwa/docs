---
title: Laravel | Frameworks
outline: deep
---

# Laravel

## Introduction

Using `vite-plugin-pwa` in a Laravel project is made complex by Laravel being a mix of backend and frontend concepts. For example,

- Laravel has its own public dir inside the webserver's webroot. This means Vite builds to `/path/to/webroot/public/build/assets`. This different to the usual frontend layout, where `/build/assets` would be in the webroot.
- There isn't a default static HTML entrypoint for the PWA. Laravel builds this server-side. The resulting HTML has a `<div id="app"></div>` into which the Vue app is instantiated.
- Laravel will put other things (like [Telescope](https://laravel.com/docs/12.x/telescope)) in the public dir that you do not want offline.
- Laravel has its own [plugin for Vite](https://github.com/laravel/vite-plugin) for builds, which adds an extra layer of configuration that vite-pwa does not normally encounter.

To make it work, you need to configure vite-plugin-pwa to work around these issues:

- configure buildBase and outDir in vite.config.ts to make vite-pwa build to the same place as laravel/vite-plugin.
- create a Blade file to act as an HTML entrypoint and add config for this to vite.config.ts.
- Add a Service-Worker-Allowed header to your web server to work around the restrictions imposed by the build directory being in a subdir of the webroot.
- Configuring caching in vite.config.ts to work around other assets being in the public dir that you do not want to be offline.

## History

There's a detailed GitHub issue exploring this problem here:

https://github.com/vite-pwa/vite-plugin-pwa/issues/431

The accumulated knowledge within it lead to a Laravel, Vite, Vue3 and TypeScript app working as a PWA with offline support and app install prompts. The issue was asking for a demonstration repository so a repo above was created to share it. It is available here:

https://github.com/sfreytag/laravel-vite-pwa

## What's Included

The repo above demonstrates a working PWA with install prompts and offline support within Laravel using Vue3, Vite and Typescript. The useful things are:

- A [vite.config.ts](https://github.com/sfreytag/vite-pwa-docs/blob/main/vite.config.ts) with settings for `vite-plugin-pwa` that work with Laravel's directory layout
- A [Blade template](https://github.com/sfreytag/laravel-vite-pwa/blob/main/resources/views/welcome.blade.php) that works as the entrypoint for the PWA
- A [generator for the PWA icons](https://github.com/sfreytag/laravel-vite-pwa/blob/main/package.json#L7)
- A [server.php](https://github.com/sfreytag/laravel-vite-pwa/blob/main/server.php) file that supplies the sw.js and the Service-Worker-Allowed header for `php artisan serve` for local development (see [lines 18:23](https://github.com/sfreytag/laravel-vite-pwa/blob/main/server.php#L18-L23))
- A composable [usePwa](https://github.com/sfreytag/laravel-vite-pwa/blob/main/resources/js/composables/usePwa/index.ts) that demonstrates how to access the `vite-plugin-pwa` functionality within Vue3 and TypeScript (eg install and update hooks, online/offline status)
- A [PwaStatus component](https://github.com/sfreytag/laravel-vite-pwa/blob/main/resources/js/components/PwaStatus.vue) that shows how it all works
- TypeScript [types for the install event](https://github.com/sfreytag/laravel-vite-pwa/blob/main/resources/js/composables/usePwa/types.ts)

## Setup

The repo has been built on a vanilla install of Laravel 10 using composer from `composer create-project laravel/laravel`.

To add the PWA to your own Laravel project you can review the changes required to set up `vite-plugin-pwa`:

- Work through the commit history, which builds it up step-by-step
- Or view the entire diff of the HEAD against the vanilla Laravel install: https://github.com/sfreytag/laravel-vite-pwa/compare/a59497..HEAD

Or just fork the repo and start from there.

## Build

To build the repo, follow the usual Laravel steps. Nothing extra is required for `vite-plugin-pwa`. Assuming you have PHP, NPM and Composer:

```
git clone git@github.com:sfreytag/laravel-vite-pwa.git
cd laravel-vite-pwa
composer install
cp .env.example .env
php artisan key:generate
npm install
npm run build
```

## Run 

Before you run it, bear in mind that the PWA installs a service worker and fills a cache. This can conflict with other service workers and caches from your other localhost projects. So it is recommended to use a port unique to each PWA project. To use eg 8082 for Laravel:

```
php artisan serve --port=8082
```

The app should now be running on http://localhost:8082. It should immediately work as a PWA. If you check the dev tools, the service worker should be running. If your browser supports it there will be an intall prompt in the address bar. It should then be installable. And if you use dev tools to take either the network or service worker offline, it should continue working if you reload the page.

## Working on the PWA

The PWA is configured to only work with prod builds, rather than dev. This is straightforward to work with and helps stop the PWA offline cache get in the way of refreshing your build during the dev cycle. However this might not suit everyone. It would be a good PR to submit to this repo to get the PWA working with a dev build. In the meantime, before running the PWA and when making changes, to be sure you have the latest version of it, ensure you use:

```
npm run build
```

## PWA Icons

The repo uses [@vite-pwa/assets-generator](https://github.com/vite-pwa/assets-generator) for its icons.

The canonical icon should be an SVG file. This is useful for the PWA anyway, so it can be saved in `public/favicon.svg`. Then build the other icons from it by running:

```
npm run pwa-icons
```

This generates a set of icons defined by the minimal preset described [here](/assets-generator/cli.html#presets).

They are automatically packaged in the public folder so they are web readable. They are also included in the repo so this process only needs repeating if you change the canonical `favicon.svg` icon.

## Screenshot

This screenshot demonstrates the useful features of `vite-plugin-pwa` runing within Laravel:

![image](https://github.com/sfreytag/laravel-vite-pwa/assets/1155275/f98383dd-93e8-4d6d-abb0-06a6ddd55022)