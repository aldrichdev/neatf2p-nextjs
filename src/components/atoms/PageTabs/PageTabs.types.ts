export type Tab = {
  id: number | number[]
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
