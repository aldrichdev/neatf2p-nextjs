import { PlayerHiscoreDataRow } from '@globalTypes/Database/PlayerHiscoreDataRow'
import { HiscoreType } from '@globalTypes/Hiscores/HiscoreType'
import { sendApiRequest } from '@helpers/api/apiUtils'
import { compareHiscores, isNotBaselineExp } from '@helpers/hiscores/hiscoresUtils'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

/** Manages and provides state of player hiscore data records and sets loading status. */
const useHiscores = (hiscoreType: HiscoreType, setIsLoading: Dispatch<SetStateAction<boolean>>) => {
  const [rawHiscores, setRawHiscores] = useState<PlayerHiscoreDataRow[] | undefined>(undefined)
  const [hiscores, setHiscores] = useState<PlayerHiscoreDataRow[] | undefined>(undefined)

  useEffect(() => {
    setIsLoading(true)

    // Query the data once
    sendApiRequest('GET', '/api/queryHiscores')
      .then(response => {
        setRawHiscores(response?.data as PlayerHiscoreDataRow[])
      })
      .catch((error: string) => console.log(`Error querying hiscores: ${error}`))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const propName = hiscoreType === 'Overall' ? 'skill_total' : `${hiscoreType.toLowerCase()}xp`
    const sortedHiscores = rawHiscores
      ?.filter(hiscoreRow => isNotBaselineExp(hiscoreRow, propName))
      .sort((hiscoreRow1, hiscoreRow2) => compareHiscores(hiscoreType, hiscoreRow1, hiscoreRow2))

    setHiscores(sortedHiscores)
    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hiscoreType, rawHiscores])

  return hiscores
}

export default useHiscores
