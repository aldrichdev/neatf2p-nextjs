/** A navigation link that appears under a main navigation item.
 * For now, we will not have more than one level of nesting links.
 */
export type SubNavigationItem = {
  path: string
  text: string
}

export type NavigationItem = {
  path?: string
  text: string
  subItems?: SubNavigationItem[]
}
