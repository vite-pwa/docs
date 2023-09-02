import { h } from 'vue'
import Theme from 'vitepress/theme'
import PwaLayout from './PwaLayout.vue'

import './styles/main.css'
import './styles/vars.css'

import 'uno.css'

export default {
  ...Theme,
  Layout() {
    return h(PwaLayout)
  },
}
