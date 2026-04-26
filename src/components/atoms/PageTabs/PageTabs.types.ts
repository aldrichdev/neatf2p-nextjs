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
  defaultTabBgColor?: string
  defaultTabTextColor?: string
  activeTabBgColor?: string
  activeTabTextColor?: string
  hoverTabBgColor?: string
  hoverTabTextColor?: string
  /** Font size to use in PX */
  fontSize?: number
}
