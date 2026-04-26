import { PageTabs } from '@atoms/PageTabs'
import { Tab } from '@atoms/PageTabs/PageTabs.types'
import { NpcHiscoreType } from '@globalTypes/Hiscores/HiscoreType'
import theme from '@theme/theme'
import { getNpcCombatLevelById } from '@utils/hiscores/hiscoresUtils'
import { LevelMenuContainer } from './NpcKillsLevelMenu.styled'
import { NpcKillsLevelMenuProps } from './NpcKillsLevelMenu.types'

/** A navigation bar of tabs that link to different combat level kill menus of the same NPC.
 * Also displays a context label showing the NPC name and currently selected combat level.
 */
const NpcKillsLevelMenu = (props: NpcKillsLevelMenuProps) => {
  const { npcHiscoreType, npcSubTypes, menuItemOnClick } = props
  const firstId = Array.isArray(npcSubTypes[0]) ? npcSubTypes[0][0] : npcSubTypes[0]
  const firstTabName = `Level ${getNpcCombatLevelById(firstId)}`

  /** Some NPCs have the same name but up to 4 different combat levels.
   * This method generates the tabs needed for the inner navigation, below the heading.
   */
  const getTabsForNpcType = (): Array<Tab> => {
    let secondTabName = ''
    let thirdTabName = ''
    let fourthTabName = '' // Shouldn't be more than 4 (Skele...)

    const tabs: Tab[] = [{ id: npcSubTypes[0], label: firstTabName }]

    if (npcSubTypes.length > 1) {
      const secondId = Array.isArray(npcSubTypes[1]) ? npcSubTypes[1][0] : npcSubTypes[1]
      secondTabName = `Level ${getNpcCombatLevelById(secondId)}`
      tabs.push({ id: npcSubTypes[1], label: secondTabName })

      if (npcSubTypes.length > 2) {
        const thirdId = Array.isArray(npcSubTypes[2]) ? npcSubTypes[2][0] : npcSubTypes[2]
        thirdTabName = `Level ${getNpcCombatLevelById(thirdId)}`
        tabs.push({ id: npcSubTypes[2], label: thirdTabName })

        if (npcSubTypes.length > 3) {
          const fourthId = Array.isArray(npcSubTypes[3]) ? npcSubTypes[3][0] : npcSubTypes[3]
          fourthTabName = `Level ${getNpcCombatLevelById(fourthId)}`
          tabs.push({ id: npcSubTypes[3], label: fourthTabName })
        }
      }
    }

    return tabs
  }

  const handleSetActiveTab = (tab: Tab) => {
    // Example: If they're on the zombie page and they click a tab with a BE ID of 68,
    // and that's not the currently selected tab,
    // then we take them to that NPC
    if (tab.id !== npcHiscoreType) {
      menuItemOnClick(tab.id as NpcHiscoreType)
    }
  }

  const pageTabs = getTabsForNpcType().filter((tab: Tab) => tab.label !== '')
  const activeTab =
    getTabsForNpcType().find((tab: Tab) => JSON.stringify(tab.id) === JSON.stringify(npcHiscoreType)) ??
    getTabsForNpcType()[0]

  return (
    <LevelMenuContainer>
      <PageTabs
        tabs={pageTabs}
        activeTab={activeTab}
        setActiveTab={tab => handleSetActiveTab(tab)}
        fullyRounded
        defaultTabBgColor={theme.palette.custom.sidebarBg}
        defaultTabTextColor={theme.palette.text.secondary}
        hoverTabBgColor={theme.palette.primary.light}
        hoverTabTextColor={theme.palette.primary.dark}
        fontSize={14}
      />
    </LevelMenuContainer>
  )
}

export default NpcKillsLevelMenu
