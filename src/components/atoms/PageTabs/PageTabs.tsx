import { PageTab, TabsContainer } from './PageTabs.styled'
import { PageTabsProps } from './PageTabs.types'

/** A component displaying tab buttons that can be clicked to change the active tab.
 * Used within page content (below main navigation) as a sub-navigation system.
 * Example usage:
 *       const [activeTab, setActiveTab] = useState<string>('News')
 *       ...
 *       <ContentBlock>
 *         <PageTabs tabs={['News', 'Events']} activeTab={activeTab} setActiveTab={setActiveTab} />
 *       </ContentBlock>
 */
const PageTabs = (props: PageTabsProps) => {
  const { tabs, activeTab, setActiveTab } = props

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
  }

  return (
    <TabsContainer>
      {tabs.map(tab => (
        <PageTab key={tab} onClick={() => handleTabClick(tab)} active={tab === activeTab}>
          {tab}
        </PageTab>
      ))}
    </TabsContainer>
  )
}

export default PageTabs
