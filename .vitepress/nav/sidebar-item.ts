import type { DefaultTheme } from 'vitepress'

export interface SidebarItem extends DefaultTheme.SidebarItem {
  hidden?: boolean
  items?: SidebarItem[]
}
