import { fileURLToPath } from 'node:url'
import { presetAttributify, presetWind3 } from 'unocss'
import Unocss from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  logLevel: 'info',
  optimizeDeps: {
    exclude: [
      '@vueuse/core',
      'vitepress',
    ],
  },
  experimental: {
    enableNativePlugin: true,
  },
  server: {
    hmr: {
      overlay: false,
    },
  },
  resolve: {
    alias: [
      {
        find: /^.*\/VPNavBarTitle\.vue$/,
        replacement: fileURLToPath(
          new URL('./.vitepress/theme/components/vp/NavBarTitle.vue', import.meta.url),
        ),
      },
      {
        find: /^.*\/VPTeamMembersItem\.vue$/,
        replacement: fileURLToPath(
          new URL('./.vitepress/theme/components/vp/TeamMembersItem.vue', import.meta.url),
        ),
      },
    ],
  },
  plugins: [
    // https://github.com/antfu/vite-plugin-components
    Components({
      dirs: [
        '.vitepress/theme/components',
      ],
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],

      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],

      // generate `components.d.ts` for ts support with Volar
      dts: '.vitepress/components.d.ts',
    }),

    // https://github.com/unocss/unocss
    Unocss({
      presets: [presetWind3(), presetAttributify()],
    }),
  ],
})
