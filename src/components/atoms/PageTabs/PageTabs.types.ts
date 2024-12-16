import { NpcKillsLevelMenuSubType } from '@molecules/NpcKillsLevelMenu/NpcKillsLevelMenu.types'

export type Tab = {
  /** Usually an NPC ID (for NPC hiscore sub-navigation), or 0.
   * TODO: Can we change the type to `NpcHiscoreType`? Then we can
   * remove the `as` in `NpcKillsLevelMenu.tsx` */
  id: NpcKillsLevelMenuSubType
  label: string
}

export type PageTabsProps = {
  tabs: Tab[]
  activeTab: Tab
  setActiveTab: (tab: Tab) => void
  defaultTabColor?: string
  activeTabColor?: string
  hoverTabColor?: string
}
