import { HiscoreDataRow } from '@globalTypes/Database/HiscoreDataRow'
import { HiscoresSortField } from '@globalTypes/Database/HiscoresSortField'
import { HiscoreType } from '@globalTypes/Hiscores/HiscoreType'
import { getTotalExp } from '@helpers/hiscores/hiscoresUtils'
import axios from 'axios'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

const useHiscores = (hiscoreType: HiscoreType, setIsLoading: Dispatch<SetStateAction<boolean>>) => {
  const [hiscores, setHiscores] = useState<HiscoreDataRow[] | undefined>(undefined)

  const compareHiscores = (playerOne: HiscoreDataRow, playerTwo: HiscoreDataRow) => {
    type HiscoreSortKey = keyof HiscoresSortField
    let fieldName: HiscoreSortKey

    switch (hiscoreType) {
      case 'Overall':
        fieldName = 'skill_total'
        break
      default:
        fieldName = `${hiscoreType.toLowerCase()}xp` as HiscoreSortKey
        break
    }

    if (playerOne[fieldName] > playerTwo[fieldName]) {
      return -1
    }

    if (playerOne[fieldName] < playerTwo[fieldName]) {
      return 1
    }

    return 0
  }

  useEffect(() => {
    setIsLoading(true)

    axios
      .get('/api/queryHiscores')
      .then(response => {
        const sortedHiscores = (response?.data as HiscoreDataRow[])
          .filter(hiscoreRow => {
            // Omit hiscore records with baseline experience
            switch (hiscoreType) {
              case 'Overall':
                return getTotalExp(hiscoreRow) > 4000
              case 'Hits':
                return hiscoreRow.hitsxp > 4000
              default:
                return hiscoreRow[`${hiscoreType.toLowerCase()}xp` as keyof HiscoresSortField] > 0
            }
          })
          .sort(compareHiscores)

        setHiscores(sortedHiscores)
        setIsLoading(false)
      })
      .catch((error: string) => error)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hiscoreType])

  return hiscores
}

export default useHiscores
