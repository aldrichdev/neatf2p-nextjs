import { useState } from 'react'
import { CharacterInfoModalProps } from './CharacterInfoModal.types'
import { Modal } from '@molecules/Modal'
import { sendApiRequest } from '@helpers/api/apiUtils'
import { KdrTooltip, KillsAndDeaths, LoadingText, ViewButton } from './CharacterInfoModal.styled'
import { convertNumberToTwoDecimalPoints, isNilString, pluralize } from '@helpers/string/stringUtils'
import { getPrettyDateStringFromMillis } from '@helpers/date/date'
import { isNilNumber } from '@helpers/numberUtils'

const CharacterInfoModal = (props: CharacterInfoModalProps) => {
  const { account, open, setOpen } = props
  const [kills, setKills] = useState<string>()
  const [deaths, setDeaths] = useState<string>()
  const [kdr, setKdr] = useState<number>()
  const [isLoading, setIsLoading] = useState<boolean>()
  const hoursPlayed = account.hours_played ? Math.round(account.hours_played * 100) / 100 : '--'

  if (open) {
    // Prevent scrolling
    document.body.style.overflow = 'hidden'
  }

  const handleClose = () => {
    setOpen(false)
    document.body.style.overflow = 'unset'
  }

  const loadKdrStatistics = () => {
    setIsLoading(true)
    sendApiRequest('GET', `/api/getKdrStatisticsForPlayer?playerId=${account.id}`)
      .then(response => {
        if (response?.data) {
          setKills(response.data.kills?.toString())
          setDeaths(response.data.deaths?.toString())
          setKdr(response.data.kdr)
        }

        setIsLoading(false)
      })
      .catch((error: string) => console.log(error))
  }

  const renderKdr = () => {
    if (isLoading) {
      return <LoadingText>Loading...</LoadingText>
    }

    if (isNilString(kills) || isNilString(deaths) || isNilNumber(kdr)) {
      return (
        <ViewButton variant='text' onClick={loadKdrStatistics}>
          View
        </ViewButton>
      )
    }

    return (
      <>
        <span>{convertNumberToTwoDecimalPoints(kdr)}</span>{' '}
        <KillsAndDeaths>
          ({kills} {pluralize(Number(kills), 'kill')}, {deaths} {pluralize(Number(deaths), 'death')})
        </KillsAndDeaths>
      </>
    )
  }

  if (!open) return null

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      heading={account.username}
      body={
        <div>
          <p>
            <strong>Date Created</strong>:{' '}
            {account.creation_date === 0 ? '-' : getPrettyDateStringFromMillis(account.creation_date)}
          </p>
          <p>
            <strong>Total Hours Played</strong>: {hoursPlayed}
          </p>
          <p>
            <KdrTooltip title={`Player Kill Death Ratio (doesn't count NPCs)`}>
              <strong>PKDR</strong>
            </KdrTooltip>
            : {renderKdr()}
          </p>
        </div>
      }
    />
  )
}

export default CharacterInfoModal
