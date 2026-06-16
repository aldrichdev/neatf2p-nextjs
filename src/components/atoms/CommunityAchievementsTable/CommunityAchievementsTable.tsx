import { communityAchievements } from './CommunityAchievements.data'
import Link from 'next/link'
import clsx from 'clsx'

const CommunityAchievementsTable = () => {
  const rowClass = 'grid grid-cols-[35%_35%_20%] md:grid-cols-[45%_35%_20%]'
  const cellClass = 'text-neutral-100 border-stone-950 md:text-[18px]'

  return (
    <table className='bg-dark-gray w-full border-2 border-black'>
      <thead>
        <tr className={rowClass}>
          <th className={clsx(cellClass, 'text-left font-bold')}>Achievement</th>
          <th className={clsx(cellClass, 'text-left font-bold')}>Player Name</th>
          <th className={clsx(cellClass, 'text-left font-bold')}>Date</th>
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
                <Link
                  href={`/hiscores/player/${achievement.playerName}`}
                  target='_blank'
                  className='text-[#eeb425] hover:text-[#a78123]'
                >
                  {achievement.playerName}
                </Link>
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
