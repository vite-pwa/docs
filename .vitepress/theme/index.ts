import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import PwaLayout from './PwaLayout.vue'

import './styles/main.css'
import './styles/vars.css'

import 'uno.css'
import 'virtual:group-icons.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(PwaLayout)
  },
} satisfies Theme
