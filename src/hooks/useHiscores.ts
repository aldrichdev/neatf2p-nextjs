import { HiscoreDataRow } from '@globalTypes/Database/HiscoreDataRow'
import { HiscoreType } from '@globalTypes/Hiscores/HiscoreType'
import axios from 'axios'
import { useEffect, useState } from 'react'

const useHiscores = (hiscoreType: HiscoreType) => {
  const [hiscores, setHiscores] = useState<HiscoreDataRow[] | undefined>(undefined)

  const compareHiscores = (a: HiscoreDataRow, b: HiscoreDataRow) => {
    type HiscoreDataRowKey = keyof typeof a
    let fieldName: HiscoreDataRowKey

    switch (hiscoreType) {
      case 'Overall':
        fieldName = 'skill_total'
        break
      default:
        fieldName = hiscoreType.toLowerCase() as HiscoreDataRowKey
        break
    }

    if (a[fieldName] > b[fieldName]) {
      return -1
    }

    if (a[fieldName] < b[fieldName]) {
      return 1
    }

    return 0
  }

  useEffect(() => {
    axios
      .get('/api/queryHiscores')
      .then(response => {
        const sortedHiscores = (response?.data as HiscoreDataRow[]).sort(compareHiscores)
        setHiscores(sortedHiscores)
      })
      .catch((error: string) => error)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return hiscores
}

export default useHiscores
