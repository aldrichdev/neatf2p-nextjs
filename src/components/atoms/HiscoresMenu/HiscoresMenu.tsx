import { HiscoresMenuItemList } from '@styledPages/hiscores.styled'
import { HiscoreType } from '@globalTypes/Hiscores/HiscoreType'
import { HiscoresMenuItem } from '@atoms/HiscoresMenuItem'

type HiscoresMenuProps = {
  hiscoreType: HiscoreType
  buttonOnClick: (hiscoreType: HiscoreType) => void
}

const HiscoresMenu = (props: HiscoresMenuProps) => {
  const { hiscoreType, buttonOnClick } = props

  return (
    <HiscoresMenuItemList>
      <HiscoresMenuItem menuItemLabel='Overall' hiscoreType={hiscoreType} buttonOnClick={buttonOnClick} />
      <HiscoresMenuItem menuItemLabel='Attack' hiscoreType={hiscoreType} buttonOnClick={buttonOnClick} />
      <HiscoresMenuItem menuItemLabel='Defense' hiscoreType={hiscoreType} buttonOnClick={buttonOnClick} />
      <HiscoresMenuItem menuItemLabel='Strength' hiscoreType={hiscoreType} buttonOnClick={buttonOnClick} />
      <HiscoresMenuItem menuItemLabel='Hits' hiscoreType={hiscoreType} buttonOnClick={buttonOnClick} />
      <HiscoresMenuItem menuItemLabel='Ranged' hiscoreType={hiscoreType} buttonOnClick={buttonOnClick} />
      <HiscoresMenuItem menuItemLabel='Prayer' hiscoreType={hiscoreType} buttonOnClick={buttonOnClick} />
      <HiscoresMenuItem menuItemLabel='Magic' hiscoreType={hiscoreType} buttonOnClick={buttonOnClick} />
      <HiscoresMenuItem menuItemLabel='Cooking' hiscoreType={hiscoreType} buttonOnClick={buttonOnClick} />
      <HiscoresMenuItem menuItemLabel='Woodcut' hiscoreType={hiscoreType} buttonOnClick={buttonOnClick} />
      <HiscoresMenuItem menuItemLabel='Fishing' hiscoreType={hiscoreType} buttonOnClick={buttonOnClick} />
      <HiscoresMenuItem menuItemLabel='Firemaking' hiscoreType={hiscoreType} buttonOnClick={buttonOnClick} />
      <HiscoresMenuItem menuItemLabel='Crafting' hiscoreType={hiscoreType} buttonOnClick={buttonOnClick} />
      <HiscoresMenuItem menuItemLabel='Smithing' hiscoreType={hiscoreType} buttonOnClick={buttonOnClick} />
      <HiscoresMenuItem menuItemLabel='Mining' hiscoreType={hiscoreType} buttonOnClick={buttonOnClick} />
    </HiscoresMenuItemList>
  )
}

export default HiscoresMenu
