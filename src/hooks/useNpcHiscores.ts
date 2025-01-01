import { NpcHiscoreDataRow } from '@globalTypes/Database/NpcHiscoreDataRow'
import { NpcHiscoreType } from '@globalTypes/Hiscores/HiscoreType'
import { sendApiRequest } from '@helpers/api/apiUtils'
import { compareNpcHiscores, groupByUsername } from '@helpers/hiscores/hiscoresUtils'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

/** Manages and provides state of NPC hiscore data records and sets loading status. */
const useNpcHiscores = (setIsLoading?: Dispatch<SetStateAction<boolean>>, npcHiscoreType?: NpcHiscoreType) => {
  const [rawHiscores, setRawHiscores] = useState<NpcHiscoreDataRow[] | undefined>(undefined)
  const [hiscores, setHiscores] = useState<NpcHiscoreDataRow[] | undefined>(undefined)
  const npcHiscoreTypeHasValue = npcHiscoreType || npcHiscoreType === 0

  useEffect(() => {
    setIsLoading?.(true)

    // Query the data once
    sendApiRequest('GET', '/api/queryNpcHiscores')
      .then(response => {
        setRawHiscores(response?.data as NpcHiscoreDataRow[])
      })
      .catch((error: string) => console.log(`Error querying NPC hiscores: ${error}`))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (npcHiscoreTypeHasValue) {
      // Filter, group and sort raw hiscores.
      if (Array.isArray(npcHiscoreType)) {
        const filteredHiscores = rawHiscores?.filter(row => npcHiscoreType.includes(row.npcID))
        const groupedCompositeHiscores = groupByUsername(filteredHiscores || []).sort((obj1, obj2) =>
          compareNpcHiscores(obj1, obj2),
        )
        setHiscores(groupedCompositeHiscores)
      } else {
        setHiscores(rawHiscores?.filter(hiscore => hiscore.npcID === npcHiscoreType))
      }
    }

    setIsLoading?.(false)
  }, [npcHiscoreType, rawHiscores, setIsLoading])

  if (!npcHiscoreTypeHasValue) return rawHiscores

  return hiscores
}

export default useNpcHiscores
