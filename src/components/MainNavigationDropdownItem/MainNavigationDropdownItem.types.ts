import { SubNavigationItem } from '@atoms/MainNavigation/MainNavigation.types'

export type MainNavigationDropdownItemProps = {
  /** Title which appears on the button. */
  title: string
  /** Sub navigation items to show on hover. */
  subItems: SubNavigationItem[]
  /** True if the user is currently on that page, a sub-page, or a related page. */
  isItemActive: (itemPath: string) => boolean
  /** The nav item's path */
  path: string | undefined
}
