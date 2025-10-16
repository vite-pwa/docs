# Contributing Guide

Hi! We are really excited that you are interested in contributing to `vite-pwa-docs`. Before submitting your contribution, please make sure to take a moment and read through the following guide.

Refer also to https://github.com/antfu/contribute.

## Set up your local development environment

The package manager used to install must be [pnpm](https://pnpm.io/).

To develop and test the `vite-pwa-docs` package:

1. Fork the `vite-pwa-docs` repository to your own GitHub account and then clone it to your local device.

2. Ensure using the latest Node.js (16.x)

3. `vite-pwa-docs` uses pnpm v8. If you are working on multiple projects with different versions of pnpm, it's recommend to enable [Corepack](https://github.com/nodejs/corepack) by running `corepack enable`.

4. Check out a branch where you can work and commit your changes:
```shell
git checkout -b my-new-branch
```

5. Run `pnpm i` in `vite-pwa-docs`'s root folder

## Testing website docs changes

`vite-pwa-docs` uses `Vitepress` for the documentation website.

Once you made the changes to the documentation, you can test them running `nr dev` from the root folder.

To check the website build, you can:
- run `nr preview` from the root folder.
- run `nr https` from the root folder (to test it using `https`).

## Excalidraw diagram and Cookbook page

Open `public/vite-plugin-pwa.excalidraw` file in [Excalidraw](https://excalidraw.com/).

Apply your changes in the diagram: all images are grouped, you can remove the group to change the diagram, don't forget to group it once changes are done.

Save your changes, don't forget to save it to local: `public/vite-plugin-pwa.excalidraw`.

Save the diagram using `Export link`: copy the link and paste it in the `guide/cookbook.md` file link.

Export each changed image as SVG: click on the image to select it, click on the `...` button, click on `Export as SVG`, save the file in `assets` folder using `Only Selected` and `Scale 3x` options (uncheck background, dark mode and embed scene if checked).

Save each image changed to the `assets` folder:
- vite-build-cli.svg
- vite-config-file.svg
- close-bundle-hook.svg
- inject-manifest.svg

Once all SVG image saved in `assets` folder, you need to remove the `height`, update the `width`, add `preserveAspectRatio` and change the `font-face src` to be local:
- remove `height` attribute
- change `width` attribute to `100%`
- add `preserveAspectRatio` attribute with `xMidYMid meet` value
- change `@font-face src` attribute to `url("/Virgil.woff2");` for and `url("/Cascadia.woff2");` for Virgil and Cascadia fonts in the style tag
