import { ContentBlock } from '@atoms/ContentBlock'
import { BodyText } from '@atoms/BodyText'
import { PageHeading } from '@atoms/PageHeading'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { useState } from 'react'
import {
  PlayButtonsContainer,
  RSCPlusButton,
  RSCPlusContainer,
  RSCPlusInfo,
  WinRuneButton,
} from '@styledPages/HowToPlay.styled'
import Link from 'next/link'
import { YouTubeVideo } from '@atoms/YouTubeVideo'
import useAuthentication from '@hooks/useAuthentication'
import { Spinner } from '@molecules/Spinner'
import { MustBeAdminBlock } from '@molecules/MustBeAdminBlock'

const HowToPlay = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [rscPlusButtonIsOpen, setRscPlusButtonIsOpen] = useState(false)
  const user = useAuthentication(setIsLoading)

  const handleRscPlusButtonClick = () => {
    setRscPlusButtonIsOpen(!rscPlusButtonIsOpen)
  }

  if (isLoading) {
    return <Spinner />
  }

  if (!user?.isAdmin) {
    return <MustBeAdminBlock />
  }

  return (
    <ContentBlock>
      <PageHeading>How To Play</PageHeading>
      <BodyText variant='body' textAlign='center'>
        To play Neat F2P, you can use WinRune or RSC+. <strong>You need Java!</strong> If you do not have Java installed
        or are not sure,{' '}
        <Link href='https://www.java.com/en/download/help/download_options.html' target='_blank'>
          install it
        </Link>{' '}
        before continuing. WinRune is a 2003-authentic Windows client for playing the game, and shows original adverts.
        RSC+ is a custom client that provides extra features on top of RSC. We are working on a web client - stay tuned.
      </BodyText>
      <ContentBlock topMargin={40}>
        <PlayButtonsContainer>
          <WinRuneButton variant='contained' href='/downloads/NeatF2P.exe'>
            Play with WinRune
          </WinRuneButton>
          <RSCPlusContainer>
            <RSCPlusButton
              variant='contained'
              endIcon={rscPlusButtonIsOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              onClick={handleRscPlusButtonClick}
            >
              Play with RSC+
            </RSCPlusButton>
            {rscPlusButtonIsOpen && (
              <RSCPlusInfo>
                <BodyText variant='body'>
                  To play with RSC+, first install it if you haven&apos;t yet:{' '}
                  <Link href='https://rsc.plus' target='_blank'>
                    https://rsc.plus
                  </Link>
                  . The following instructions will cover the Windows installation. To install RSC+, download it, then
                  unzip the download to your computer, and open <strong>rscplus_console.exe</strong>. This creates a{' '}
                  <strong>worlds</strong> folder in the root of the directory, which you will need for the next step.
                  Once RSC+ has fully launched, close it. Next, download the{' '}
                  <Link href='/downloads/05_Neat F2P.ini' target='_blank' download>
                    Neat F2P world file
                  </Link>
                  . Put this file in the <strong>worlds</strong> folder previously mentioned. Finally, launch RSC+ and
                  select the <strong>Neat F2P</strong> world.
                </BodyText>
                <BodyText variant='body'>
                  If you are having trouble with the above steps, take a look at this video provided by Logg, the
                  caretaker of RSC+.
                </BodyText>
                <ContentBlock topMargin={40}>
                  <YouTubeVideo embedUrl='https://www.youtube.com/embed/a4aD-PL6WK0?si=_sVgn5vyC16QXzSt' />
                </ContentBlock>
              </RSCPlusInfo>
            )}
          </RSCPlusContainer>
        </PlayButtonsContainer>
      </ContentBlock>
    </ContentBlock>
  )
}

export default HowToPlay
