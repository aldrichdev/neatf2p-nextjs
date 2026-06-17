import { BodyText } from '@atoms/BodyText'
import { YouTubeVideo } from '@atoms/YouTubeVideo'
import { PageHeading } from '@atoms/PageHeading'
import { renderHead } from '@utils/renderUtils'
import { BackToLink } from '@molecules/BackToLink'
import { sharedStyles } from '../../../consts/styles/shared'
import { StandardLink } from '@atoms/StandardLink'

const RscPlusInfoPage = () => {
  return (
    <>
      {renderHead(
        'How to Play with RSC+',
        'Read this if you wish to set up and use the RSC+ client for playing on our server.',
      )}
      <div className={sharedStyles.defaultContainer}>
        <PageHeading>How to Play with RSC+</PageHeading>
        <BodyText>
          To play using RSC+, first install it if you haven&apos;t yet:{' '}
          <StandardLink href='https://rsc.plus' target='_blank'>
            https://rsc.plus
          </StandardLink>
          . The following instructions will cover the Windows installation, but note that RSC+ can be installed on any
          operating system.
        </BodyText>
        <BodyText>
          To install RSC+, download it, then unzip the download to your computer, and open{' '}
          <strong>rscplus_console.exe</strong>. This creates a <strong>worlds</strong> folder in the root of the
          directory, which you will need for the next step. Once RSC+ has fully launched, close it. Next, download the{' '}
          <StandardLink href='/downloads/05_Neat F2P.ini' target='_blank' download>
            Neat F2P world file
          </StandardLink>
          . Put this file in the <strong>worlds</strong> folder previously mentioned. Finally, launch RSC+ and select
          the <strong>Neat F2P</strong> world.
        </BodyText>
        <BodyText>
          If you are having trouble with the above steps, take a look at this video tutorial provided by Logg, the
          caretaker of RSC+.
        </BodyText>
        <YouTubeVideo embedUrl='https://www.youtube.com/embed/a4aD-PL6WK0?si=_sVgn5vyC16QXzSt' />
        <BackToLink href='/how-to-play' className='mt-0'>
          ← Back to How to Play page
        </BackToLink>
      </div>
    </>
  )
}

export default RscPlusInfoPage
