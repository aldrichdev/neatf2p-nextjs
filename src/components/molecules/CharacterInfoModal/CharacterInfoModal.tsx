import { useState } from 'react'
import { CharacterInfoModalProps } from './CharacterInfoModal.types'
import { Modal } from '@molecules/Modal'
import { sendApiRequest } from '@helpers/api/apiUtils'
import { KdrTooltip, KillsAndDeaths, LoadingText, ViewButton } from './CharacterInfoModal.styled'
import { convertNumberToOneDecimalPoint, pluralize } from '@helpers/string/stringUtils'
import { getPrettyDateStringFromMillis } from '@helpers/date/date'

const CharacterInfoModal = (props: CharacterInfoModalProps) => {
  const { account, open, setOpen } = props
  const [kills, setKills] = useState<string>()
  const [deaths, setDeaths] = useState<string>()
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

  const loadKillsAndDeaths = () => {
    setIsLoading(true)
    sendApiRequest('GET', `/api/getKillsAndDeathsForPlayer?playerId=${account.id}`)
      .then(response => {
        if (response?.data) {
          setKills(response.data.kills?.toString())
          setDeaths(response.data.deaths?.toString())
        }

        setIsLoading(false)
      })
      .catch((error: string) => console.log(error))
  }

  const calculateKdr = (kills: string, deaths: string) => {
    const numKills = Number(kills)
    const numDeaths = Number(deaths)

    if (numKills === 0 && numDeaths === 0) return '0.0'
    if (numDeaths === 0) return convertNumberToOneDecimalPoint(numKills)

    const rawKdr = numKills / numDeaths
    return convertNumberToOneDecimalPoint(rawKdr)
  }

  const renderKdr = () => {
    if (isLoading) {
      return <LoadingText>Loading...</LoadingText>
    }

    if (!kills || !deaths) {
      return (
        <ViewButton variant='text' onClick={loadKillsAndDeaths}>
          View
        </ViewButton>
      )
    }

    return (
      <>
        <span>{calculateKdr(kills, deaths)}</span>{' '}
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
