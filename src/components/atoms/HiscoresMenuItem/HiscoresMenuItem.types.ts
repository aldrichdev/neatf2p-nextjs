import { HiscoreType } from '@globalTypes/Hiscores/HiscoreType'

export type HiscoresMenuItemProps = {
  menuItemLabel: HiscoreType
  hiscoreType: HiscoreType
  buttonOnClick: (hiscoreType: HiscoreType) => void
}
