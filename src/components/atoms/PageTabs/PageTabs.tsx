import { cn } from '@utils/cn'
import { PageTabsProps, Tab } from './PageTabs.types'
import clsx from 'clsx'

/** A component displaying tab buttons that can be clicked to change the active tab.
 * Used within page content (below main navigation) as a sub-navigation system.
 *
 * Example usage:
 *    const pageTabs = [{ id: 0, label: 'Skills' }, { id: 1, label: 'NPC Kills' }]
 *
 *    <div className={sharedStyles.defaultContainer}>
 *      <PageTabs tabs={pageTabs} activeTab={pageTabs[0]} setActiveTab={tab => handleSetActiveTab(tab)} />
 *    </div>
 */
const PageTabs = (props: PageTabsProps) => {
  const { tabs, activeTab, setActiveTab, fullyRounded, tabClassName, activeTabClassName, fontSize } = props

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab)
  }

  return (
    <div
      className={clsx(
        'box-border flex h-10 w-full flex-nowrap overflow-hidden',
        fullyRounded ? 'rounded-lg' : 'rounded-t-lg',
        '[&_button]:box-content',
      )}
    >
      {tabs.map(tab => {
        const isActive = tab.label === activeTab.label
        return (
          <button
            key={Array.isArray(tab.id) ? tab.id.join(',') : tab.id}
            onClick={() => handleTabClick(tab)}
            style={fontSize ? { fontSize: `${fontSize}px` } : undefined}
            className={clsx(
              'basis-full cursor-pointer p-2 font-sans text-[18px] font-medium',
              'only:cursor-auto',
              isActive
                ? cn('bg-primary-main text-table-header-text', activeTabClassName)
                : cn(
                    'bg-primary-dark text-table-header-text',
                    'hover:bg-primary-main hover:text-table-header-text',
                    tabClassName,
                  ),
            )}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}

export default PageTabs
