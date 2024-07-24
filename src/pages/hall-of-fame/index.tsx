import { BodyText } from '@atoms/BodyText'
import { ContentBlock } from '@atoms/ContentBlock'
import { PageHeading } from '@atoms/PageHeading'
import Head from 'next/head'
import { CommunityAchievementsTable } from '@molecules/CommunityAchievementsTable'

const HallOfFamePage = () => {
  return (
    <>
      <Head>
        <title>Hall of Fame | Neat F2P :: Nostalgia Reborn | Runescape Classic F2P</title>
      </Head>
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
}

export default HallOfFamePage
