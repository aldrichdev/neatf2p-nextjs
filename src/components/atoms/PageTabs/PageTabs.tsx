import { PageTab, TabsContainer } from './PageTabs.styled'
import { PageTabsProps, Tab } from './PageTabs.types'

/** A component displaying tab buttons that can be clicked to change the active tab.
 * Used within page content (below main navigation) as a sub-navigation system.
 *
 * Example usage:
 *    const pageTabs = [{ id: 0, label: 'Skills' }, { id: 1, label: 'NPC Kills' }]
 *
 *    <ContentBlock>
 *      <PageTabs tabs={pageTabs} activeTab={pageTabs[0]} setActiveTab={tab => handleSetActiveTab(tab)} />
 *    </ContentBlock>
 */
const PageTabs = (props: PageTabsProps) => {
  const { tabs, activeTab, setActiveTab, defaultTabColor, activeTabColor, hoverTabColor } = props

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab)
  }

  return (
    <TabsContainer>
      {tabs.map(tab => (
        <PageTab
          key={Array.isArray(tab.id) ? tab.id.join(',') : tab.id}
          onClick={() => handleTabClick(tab)}
          active={tab.label === activeTab.label}
          defaultColor={defaultTabColor}
          activeColor={activeTabColor}
          hoverColor={hoverTabColor}
        >
          {tab.label}
        </PageTab>
      ))}
    </TabsContainer>
  )
}

export default PageTabs
