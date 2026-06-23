import { communityAchievements } from './CommunityAchievements.data'
import { cn } from '@utils/cn'
import { StandardLink } from '@atoms/StandardLink'
import clsx from 'clsx'

const CommunityAchievementsTable = () => {
  const rowClass = 'grid grid-cols-3 md:grid-cols-[45%_35%_20%] overflow-hidden'
  const cellClass = clsx(
    'text-left p-4 font-normal text-neutral-100 border-stone-950',
    'text-sm md:text-lg wrap-break-word min-w-0',
  )

  return (
    <table className='bg-dark-gray w-full overflow-hidden border-2 border-black'>
      <thead>
        <tr className={rowClass}>
          <th className={cn(cellClass, 'text-left font-bold')}>Achievement</th>
          <th className={cn(cellClass, 'text-left font-bold')}>Player Name</th>
          <th className={cn(cellClass, 'text-left font-bold')}>Date</th>
        </tr>
      </thead>
      <tbody>
        {communityAchievements.map(achievement => (
          <tr key={achievement.achievement} className={rowClass}>
            <td className={cellClass} scope='row'>
              {achievement.achievement}
            </td>
            <td className={cellClass}>
              {achievement.playerName !== 'TBD' ? (
                <StandardLink
                  href={`/hiscores/player/${achievement.playerName}`}
                  hoverUnderline
                  className='text-amber-400 hover:text-yellow-700'
                >
                  {achievement.playerName}
                </StandardLink>
              ) : (
                achievement.playerName
              )}
            </td>
            <td className={cellClass}>{achievement.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default CommunityAchievementsTable
