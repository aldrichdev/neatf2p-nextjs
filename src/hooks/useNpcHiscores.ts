import { NpcHiscoreDataRow } from '@globalTypes/Database/NpcHiscoreDataRow'
// import { PlayerHiscoreDataRow } from '@globalTypes/Database/PlayerHiscoreDataRow'
import { NpcHiscoreType } from '@globalTypes/Hiscores/HiscoreType'
import { sendApiRequest } from '@helpers/api/apiUtils'
// import { compareHiscores, compareNpcHiscores, isNotBaselineExp } from '@helpers/hiscores/hiscoresUtils'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

/** Manages and provides state of NPC hiscore data records and sets loading status. */
const useNpcHiscores = (npcHiscoreType: NpcHiscoreType, setIsLoading: Dispatch<SetStateAction<boolean>>) => {
  // const [rawHiscores, setRawHiscores] = useState<NpcHiscoreDataRow[] | undefined>(undefined)
  const [hiscores, setHiscores] = useState<NpcHiscoreDataRow[] | undefined>(undefined)

  useEffect(() => {
    setIsLoading(true)

    // Query the data once
    sendApiRequest('GET', '/api/queryNpcHiscores')
      .then(response => {
        const resp = response?.data as NpcHiscoreDataRow[]

        if (Array.isArray(npcHiscoreType)) {
          // Need to run several conditions in the filter using ||. Maximum of 3 possible array values.
          setHiscores(
            resp.filter(
              row =>
                row.npcID === npcHiscoreType?.[0] ||
                row.npcID === npcHiscoreType?.[1] ||
                row.npcID === npcHiscoreType?.[2],
            ),
          )
        } else {
          setHiscores(resp.filter(r => r.npcID === npcHiscoreType))
        }

        setIsLoading(false)
      })
      .catch((error: string) => console.log(`Error querying NPC hiscores: ${error}`))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Sorting NPC hiscores should not be necessary?
  // useEffect(() => {
  //   //const propName = npcHiscoreType === 'Overall' ? 'skill_total' : `${hiscoreType.toLowerCase()}xp`
  //   const sortedHiscores = rawHiscores?.sort((hiscoreRow1: NpcHiscoreDataRow, hiscoreRow2: NpcHiscoreDataRow) =>
  //     compareNpcHiscores(npcHiscoreType, hiscoreRow1, hiscoreRow2),
  //   )

  //   setHiscores(sortedHiscores)
  //   setIsLoading(false)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [hiscoreType, rawHiscores])

  return hiscores
}

export default useNpcHiscores
