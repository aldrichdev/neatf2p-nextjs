import { BodyText } from '@atoms/BodyText'
import { ContentBlock } from '@atoms/ContentBlock'
import { PageHeading } from '@atoms/PageHeading'
import { CommunityAchievementsTable } from '@molecules/CommunityAchievementsTable'
import { renderHead } from '@helpers/renderUtils'

const HallOfFamePage = () => (
  <>
    {renderHead('Hall of Fame')}
    <ContentBlock isWide>
      <PageHeading>Hall of Fame</PageHeading>
      <BodyText variant='body' fontFamily='Source Sans Pro' marginBottom='20px'>
        Below is a list of achievements the players in our community have unlocked. This page will continue to be
        updated as players unlock new ones. Note that banned players are removed from contention for all achievements.
      </BodyText>
      <CommunityAchievementsTable />
    </ContentBlock>
  </>
)

export default HallOfFamePage
