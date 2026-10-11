import type { Plugin } from 'vite'

function assertExists(code: string, match: string, file: string, start = 0): number {
  const index = code.indexOf(match, start)
  if (index === -1)
    throw new Error(`Cannot find match for "${match}" in "${file}"`)
  return index
}

function replace(code: string, match: string, replace: string, file: string): string {
  assertExists(code, match, file)
  return code.replace(match, replace)
}

function append(code: string, match: string, append: string, file: string): string {
  return replace(code, match, match + append, file)
}

function prepend(code: string, match: string, prepend: string, file: string): string {
  return replace(code, match, prepend + match, file)
}

export default function SidebarFix(): Plugin {
  return {
    name: 'vitepress-sidebar-item',
    enforce: 'pre',
    async transform(code, id) {
      // Change VPSidebarItem.vue
      if (id.includes('VPSidebarItem.vue') && !id.endsWith('.css') && !id.includes('&setup=')) {
        const file = 'VPSidebarItem.vue'

        // Do not allow active item to collapse
        code = replace(code, '{ collapsed: collapsed.value },', '{ collapsed: collapsed.value && !isActiveLink.value && !hasActiveLink.value },', file)

        // Extend theme
        assertExists(code, 'DefaultTheme.SidebarItem', file)
        code = code.replaceAll('DefaultTheme.SidebarItem', 'SidebarItem')

        code = prepend(code, 'const props = defineProps<{', `
interface SidebarItem extends DefaultTheme.SidebarItem {
  hidden?: boolean
}
`, file)

        // Visibility
        code = prepend(code, 'const classes =', `
const visible = computed(() => !props.item.hidden || isActiveLink.value || hasActiveLink.value)
`, file)

        // Hide it
        code = append(code, '<component :is="sectionTag"', ' v-if="visible"', file)

        return code
      }

      // Change sidebar.js to include hidden items in flattened data
      if (id.includes('client/theme-default/support/sidebar.js')) {
        const file = 'sidebar.js'

        // Add hidden parameter to getFlatSideBarLinks() result, using sidebar item as `hidden` prop
        // Add depth parameter, to show prev link on same depth
        code = append(code, 'recursivelyExtractLinks(items', ', depth, parentHidden', file)
        code = append(code, 'for (const item of items) {', ' const hidden = item.hidden ? item : parentHidden;', file)
        code = append(code, 'docFooterText: item.docFooterText', ', depth, hidden', file)
        code = append(code, 'recursivelyExtractLinks(item.items', ', depth + 1, hidden', file)
        code = append(code, 'recursivelyExtractLinks(sidebar', ', 0, null', file)
        return code
      }

      /* if (id.includes('theme-default/composables/prev-next.js')) {
        const file = 'prev-next.js'

        const search1 = 'return {'
        const search2 = '});'
        const index1 = assertExists(code, search1, file)
        const index2 = assertExists(code, search2, file, index1)

        // Replace content between those items
        const replacement = `
if (index < 0) {
    return {};
}
const item = candidates[index];

let prevIndex = index - 1;
while (prevIndex >= 0 && (
    candidates[prevIndex].depth > item.depth ||
        (candidates[prevIndex].hidden && candidates[prevIndex].hidden !== item.hidden)
    )
) {
    prevIndex --;
}
const prevItem = prevIndex >= 0 ? candidates[prevIndex] : undefined;

let nextIndex = index + 1;
while (candidates[nextIndex] && candidates[nextIndex].hidden && candidates[nextIndex].hidden !== item.hidden) {
    nextIndex ++;
}
const nextItem = candidates[nextIndex];

return {
    prev: prevItem,
    next: nextItem,
};
          `

        code = code.slice(0, index1) + replacement + code.slice(index2)
        return code
      } */
    },
  }
}
