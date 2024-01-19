import { HiscoreDataRow } from '@globalTypes/Database/HiscoreDataRow'
import { HiscoreType } from '@globalTypes/Hiscores/HiscoreType'
import axios from 'axios'
import { useEffect, useState } from 'react'

const useHiscores = (hiscoreType: HiscoreType) => {
  const [hiscores, setHiscores] = useState<HiscoreDataRow[] | undefined>(undefined)

  function hasKey<O>(obj: O, key: PropertyKey): key is keyof O {
    return key in obj
  }

  const compareHiscores = (a: HiscoreDataRow, b: HiscoreDataRow) => {
    let fieldName = ''

    switch (hiscoreType) {
      case 'Overall':
        fieldName = 'skill_total'
        break
      default:
        fieldName = hiscoreType.toLowerCase()
        break
    }

    if (hasKey(a, fieldName) && hasKey(b, fieldName) && a[fieldName] > b[fieldName]) {
      return -1
    }

    if (hasKey(a, fieldName) && hasKey(b, fieldName) && a[fieldName] < b[fieldName]) {
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
  }, [])

  return hiscores
}

export default useHiscores
