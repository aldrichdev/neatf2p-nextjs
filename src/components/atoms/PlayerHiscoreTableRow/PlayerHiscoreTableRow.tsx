import { PlayerHiscoreTableRowProps } from './PlayerHiscoreTableRow.types'
import { useRouter } from 'next/router'
import { HiscoreSkillEmoji } from '@atoms/HiscoreSkillEmoji'
import { PlayerHiscoresRank } from '@atoms/PlayerHiscoresRank'
import { formatExp } from '@utils/string/stringUtils'
import { convertExp } from '@utils/hiscores/hiscoresUtils'
import clsx from 'clsx'
import { hiscoresStyles } from '../../../consts/styles/hiscores'

/** A component representing a single row in the player hiscore table. */
const PlayerHiscoreTableRow = (props: PlayerHiscoreTableRowProps) => {
  const { skill, rank, level, exp } = props
  const router = useRouter()
  const readableExp = convertExp(exp)

  const getLevelProgressPercentage = (level: number, isTotal: boolean) => (isTotal ? 1 : level === 1 ? 0 : level / 99)

  return (
    <tr
      onClick={() => router.push(`/hiscores?skill=${skill}`)}
      className={clsx(
        'grid grid-cols-[30%_20%_20%_30%] text-sm md:text-base',
        'border-divider h-fit items-center border-b-[0.5px]',
        'hover:bg-divider cursor-pointer last:border-b-0',
      )}
    >
      <td className='flex items-center gap-2 border-0 p-2 font-medium md:p-4'>
        <HiscoreSkillEmoji skill={skill} />
        {skill}
      </td>
      <td className={clsx(hiscoresStyles.hiscoresValueCellClass, 'flex items-center gap-2.5')}>
        <PlayerHiscoresRank rank={rank} />
      </td>
      <td className={clsx(hiscoresStyles.hiscoresValueCellClass, 'flex items-center gap-2.5 font-medium')}>
        <span>{level}</span>
        <div
          className={clsx(
            'hidden',
            'md:bg-level-progress-bg md:block md:h-1 md:max-w-20 md:flex-1 md:overflow-hidden md:rounded-sm',
          )}
        >
          <div
            className='bg-primary-main h-full rounded-sm'
            style={{ width: `${getLevelProgressPercentage(level, skill === 'Overall') * 100}%` }}
          />
        </div>
      </td>
      <td className={clsx(hiscoresStyles.hiscoresValueCellClass, 'hidden md:table-cell md:min-w-25')}>{readableExp}</td>
      <td className={clsx(hiscoresStyles.hiscoresValueCellClass, 'md:hidden')}>{formatExp(readableExp)}</td>
    </tr>
  )
}

export default PlayerHiscoreTableRow
