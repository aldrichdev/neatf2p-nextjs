import { NpcHiscoreType } from '@globalTypes/Hiscores/HiscoreType'

export type Tab = {
  /** Usually an NPC ID (for NPC hiscore sub-navigation), or 0. */
  id: NpcHiscoreType
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
