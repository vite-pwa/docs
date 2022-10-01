# Contributing Guide

Hi! We are really excited that you are interested in contributing to `vite-pwa-docs`. Before submitting your contribution, please make sure to take a moment and read through the following guide.

Refer also to https://github.com/antfu/contribute.

## Set up your local development environment

The package manager used to install must be [pnpm](https://pnpm.io/).

To develop and test the `vite-pwa-docs` package:

1. Fork the `vite-pwa-docs` repository to your own GitHub account and then clone it to your local device.

2. Ensure using the latest Node.js (16.x)

3. `vite-pwa-docs` uses pnpm v7. If you are working on multiple projects with different versions of pnpm, it's recommend to enable [Corepack](https://github.com/nodejs/corepack) by running `corepack enable`.

4. Check out a branch where you can work and commit your changes:
```shell
git checkout -b my-new-branch
```

5. Run `pnpm i` in `vite-pwa-docs`'s root folder

## Testing website docs changes

`vite-pwa-docs` uses `Vitepress` for the documentation website. 

Once you made the changes to the documentation, you can test them running `pnpm run dev` from the root folder.

To check the website build, you can:
- run `pnpm run preview` from the root folder.
- run `pnpm run https` from the root folder (to test it using `https`).
