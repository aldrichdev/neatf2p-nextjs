import { NpcHiscoreDataRow } from '@globalTypes/Database/NpcHiscoreDataRow'
import { NpcHiscoreType } from '@globalTypes/Hiscores/HiscoreType'
import { sendApiRequest } from '@helpers/api/apiUtils'
import { groupByUsername } from '@helpers/hiscores/hiscoresUtils'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

/** Manages and provides state of NPC hiscore data records and sets loading status. */
const useNpcHiscores = (setIsLoading?: Dispatch<SetStateAction<boolean>>, npcHiscoreType?: NpcHiscoreType) => {
  const [rawHiscores, setRawHiscores] = useState<NpcHiscoreDataRow[] | undefined>(undefined)
  const [hiscores, setHiscores] = useState<NpcHiscoreDataRow[] | undefined>(undefined)

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
    if (npcHiscoreType) {
      // Filter, group and sort raw hiscores.
      if (Array.isArray(npcHiscoreType)) {
        const filteredHiscores = rawHiscores?.filter(row => npcHiscoreType.includes(row.npcID))
        const groupedCompositeHiscores = groupByUsername(filteredHiscores || []).sort(
          (a, b) => b.killCount - a.killCount,
        )
        setHiscores(groupedCompositeHiscores)
      } else {
        setHiscores(rawHiscores?.filter(hiscore => hiscore.npcID === npcHiscoreType))
      }
    }

    setIsLoading?.(false)
  }, [npcHiscoreType, rawHiscores, setIsLoading])

  if (!npcHiscoreType) return rawHiscores

  return hiscores
}

export default useNpcHiscores
