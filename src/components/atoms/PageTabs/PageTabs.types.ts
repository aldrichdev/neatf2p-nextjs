import { NpcKillsLevelMenuSubType } from '@molecules/NpcKillsLevelMenu/NpcKillsLevelMenu.types'

export type Tab = {
  /** Usually an NPC ID (for NPC hiscore sub-navigation), or a number like 0, 1, etc. */
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
