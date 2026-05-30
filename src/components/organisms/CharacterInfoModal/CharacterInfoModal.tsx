import { useState } from 'react'
import { CharacterInfoModalProps } from './CharacterInfoModal.types'
import { Modal } from '@molecules/Modal'
import { sendApiRequest } from '@utils/api/apiUtils'
import { convertNumberToTwoDecimalPoints, isNilString, pluralize } from '@utils/string/stringUtils'
import { getPrettyDateStringFromMillis } from '@utils/date/date'
import { isNilNumber } from '@utils/numberUtils'
import { Tooltip, TooltipContent, TooltipTrigger } from '@ui/tooltip'
import clsx from 'clsx'

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
      .catch((error: string) => console.error(error))
  }

  const renderKdr = () => {
    if (isLoading) {
      return <em className='text-gray-500'>Loading...</em>
    }

    if (isNilString(kills) || isNilString(deaths) || isNilNumber(kdr)) {
      return (
        <button
          onClick={loadKdrStatistics}
          className={clsx('h-6 pb-1.5 text-black underline', 'hover:text-red-500 hover:underline')}
        >
          View
        </button>
      )
    }

    return (
      <>
        <span>{convertNumberToTwoDecimalPoints(kdr)}</span>{' '}
        <span className='text-gray-500'>
          ({kills} {pluralize(Number(kills), 'kill')}, {deaths} {pluralize(Number(deaths), 'death')})
        </span>
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
        <div className='text-base'>
          <p>
            <strong>Date Created</strong>:{' '}
            {account.creation_date === 0 ? '-' : getPrettyDateStringFromMillis(account.creation_date)}
          </p>
          <p>
            <strong>Total Hours Played</strong>: {hoursPlayed}
          </p>
          <p>
            <Tooltip>
              <TooltipTrigger asChild>
                <strong className='cursor-pointer'>PKDR</strong>
              </TooltipTrigger>
              <TooltipContent className='bg-black text-[14px] text-white shadow-md'>
                {`Player Kill Death Ratio (doesn't count NPCs)`}
              </TooltipContent>
            </Tooltip>
            : {renderKdr()}
          </p>
        </div>
      }
    />
  )
}

export default CharacterInfoModal
