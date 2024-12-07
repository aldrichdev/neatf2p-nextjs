import { Dispatch, SetStateAction } from 'react'

export type PageTabsProps = {
  tabs: string[]
  activeTab: string
  setActiveTab: Dispatch<SetStateAction<string>>
}
