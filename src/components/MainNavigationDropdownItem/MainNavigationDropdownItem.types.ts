import { SubNavigationItem } from '@atoms/MainNavigation/MainNavigation.types'

export type MainNavigationDropdownItemProps = {
  /** Title which appears on the button. */
  title: string
  /** Sub navigation items to show on hover. */
  subItems: SubNavigationItem[]
  isItemActive: (itemPath: string) => boolean
}
