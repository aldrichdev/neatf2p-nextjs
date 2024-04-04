import { ContentBlock } from '@atoms/ContentBlock'
import { BodyText } from '@atoms/BodyText'
import Link from 'next/link'
import { YouTubeVideo } from '@atoms/YouTubeVideo'
import { PageHeading } from '@atoms/PageHeading'
import { BackToLink } from '@atoms/BackToLink/BackToLink'
import Head from 'next/head'

const RscPlusInfoPage = () => {
  return (
    <>
      <Head>
        <title>How to Play with RSC+ | Neat F2P :: Nostalgia Reborn</title>
      </Head>
      <ContentBlock>
        <PageHeading>How to Play with RSC+</PageHeading>
        <BodyText variant='body'>
          To play using RSC+, first install it if you haven&apos;t yet:{' '}
          <Link href='https://rsc.plus' target='_blank'>
            https://rsc.plus
          </Link>
          . The following instructions will cover the Windows installation, but note that RSC+ can be installed on any
          operating system.
        </BodyText>
        <BodyText variant='body'>
          To install RSC+, download it, then unzip the download to your computer, and open{' '}
          <strong>rscplus_console.exe</strong>. This creates a <strong>worlds</strong> folder in the root of the
          directory, which you will need for the next step. Once RSC+ has fully launched, close it. Next, download the{' '}
          <Link href='/downloads/05_Neat F2P.ini' target='_blank' download>
            Neat F2P world file
          </Link>
          . Put this file in the <strong>worlds</strong> folder previously mentioned. Finally, launch RSC+ and select
          the <strong>Neat F2P</strong> world.
        </BodyText>
        <BodyText variant='body'>
          If you are having trouble with the above steps, take a look at this video tutorial provided by Logg, the
          caretaker of RSC+.
        </BodyText>
        <ContentBlock topMargin={40}>
          <YouTubeVideo embedUrl='https://www.youtube.com/embed/a4aD-PL6WK0?si=_sVgn5vyC16QXzSt' />
          <BackToLink href='/how-to-play'>{'<'} Back to How to Play page</BackToLink>
        </ContentBlock>
      </ContentBlock>
    </>
  )
}

export default RscPlusInfoPage
