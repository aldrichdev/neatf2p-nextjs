export type Tab = {
  id: number | number[]
  label: string
}

export type PageTabsProps = {
  tabs: Tab[]
  activeTab: Tab
  setActiveTab: (tab: Tab) => void
  /** Whether the tabs container is rounded on all sides. */
  fullyRounded?: boolean
  /** Font size to use in PX */
  fontSize?: number
  tabClassName?: string
  activeTabClassName?: string
}
