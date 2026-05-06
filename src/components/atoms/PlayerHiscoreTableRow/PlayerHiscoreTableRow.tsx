import { PlayerHiscoreTableRowProps } from './PlayerHiscoreTableRow.types'
import { HiscoreTableRow, PlayerHiscoreTableCell } from '@organisms/PlayerHiscoreTable/PlayerHiscoreTable.styled'
import { useRouter } from 'next/router'
import { HiscoreSkillEmoji } from '@atoms/HiscoreSkillEmoji'
import { PlayerHiscoresRank } from '@atoms/PlayerHiscoresRank'
import { formatExp } from '@utils/string/stringUtils'
import {
  ExperienceCell,
  HiscoreSkillTableCell,
  LevelProgressBar,
  LevelProgressBarFill,
  MobileExperienceCell,
} from './PlayerHiscoreTableRow.styled'
import { convertExp } from '@utils/hiscores/hiscoresUtils'

/** A component representing a single row in the player hiscore table. */
const PlayerHiscoreTableRow = (props: PlayerHiscoreTableRowProps) => {
  const { skill, rank, level, exp } = props
  const router = useRouter()
  const readableExp = convertExp(exp)

  const getLevelProgressPercentage = (level: number, isTotal: boolean) => (isTotal ? 1 : level === 1 ? 0 : level / 99)

  return (
    <HiscoreTableRow onClick={() => router.push(`/hiscores?skill=${skill}`)}>
      <HiscoreSkillTableCell sx={{ fontWeight: 500 }}>
        <HiscoreSkillEmoji skill={skill} />
        {skill}
      </HiscoreSkillTableCell>
      <PlayerHiscoreTableCell>
        <PlayerHiscoresRank rank={rank} />
      </PlayerHiscoreTableCell>
      <PlayerHiscoreTableCell sx={{ fontWeight: 500 }}>
        <span>{level}</span>
        <LevelProgressBar>
          <LevelProgressBarFill completed={getLevelProgressPercentage(level, skill === 'Overall')} />
        </LevelProgressBar>
      </PlayerHiscoreTableCell>
      <ExperienceCell>{readableExp}</ExperienceCell>
      <MobileExperienceCell>{formatExp(readableExp)}</MobileExperienceCell>
    </HiscoreTableRow>
  )
}

export default PlayerHiscoreTableRow
