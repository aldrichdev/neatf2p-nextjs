import { WebclientBanner } from '@atoms/WebclientBanner'
import { Webclient } from '@atoms/Webclient'
import Checkbox from '@mui/material/Checkbox'
import { Button, FormControlLabel } from '@mui/material'
import { ContentBlock } from '@atoms/ContentBlock'
import { HideAdsFormGroup } from '@styledPages/Webclient.styled'
import { useState } from 'react'
import { Modal } from '@molecules/Modal'
import Link from 'next/link'
import { renderHead } from '@helpers/renderUtils'

// TODO: This is a temporary page. Remove once webclient is fixed. [F2P-110]
const TestWebclientPage = () => {
  const [hideAds, setHideAds] = useState(false)
  const [hideRunescapeBanners, setHideRunescapeBanners] = useState(false)
  const [showHelpModal, setShowHelpModal] = useState(false)
  const gameServerHost = '71.205.248.145'
  const gameServerRsaPublicKey =
    '10434129247747875206749322994737259335353815224197943208197420577351164491111787501201706919192564129410096061100941383106949396063257493621975484273337067'
  const webclientUrl = `https://${gameServerHost}/index.html#free,${gameServerHost},43494,65537,${gameServerRsaPublicKey},true`

  const handleHideAdsCheck = () => {
    setHideAds(!hideAds)
  }

  const handleHideRunescapeBannersCheck = () => {
    setHideRunescapeBanners(!hideRunescapeBanners)
  }

  const handleWebclientNotWorkingButtonClick = () => {
    setShowHelpModal(true)
  }

  const handleHelpModalClose = () => {
    setShowHelpModal(false)
    document.body.style.overflow = 'unset'
  }

  if (showHelpModal) {
    // Prevent scrolling
    document.body.style.overflow = 'hidden'
  }

  return (
    <>
      {renderHead('Test Web Client')}
      <ContentBlock>
        {!hideAds && <WebclientBanner bannerType='Ad' bannerPlacement='top' />}
        <Webclient url={webclientUrl} />
        {!hideRunescapeBanners && <WebclientBanner bannerType='Runescape' bannerPlacement='bottom' />}
        <HideAdsFormGroup>
          <FormControlLabel control={<Checkbox color='success' onChange={handleHideAdsCheck} />} label='Hide Ads' />
          <FormControlLabel
            control={<Checkbox color='success' onChange={handleHideRunescapeBannersCheck} />}
            label='Hide Runescape Banners'
          />
          <FormControlLabel
            control={<Button variant='text' onClick={handleWebclientNotWorkingButtonClick} />}
            label='Test Webclient Not Working?'
          />
        </HideAdsFormGroup>
        <Modal
          open={showHelpModal}
          handleClose={handleHelpModalClose}
          heading='Test Webclient Not Loading?'
          body={
            <p>
              If the webclient is not loading, you need to accept a privacy warning first.{' '}
              <Link href={webclientUrl} target='_blank'>
                Click here
              </Link>{' '}
              and you will see a privacy warning. Click the <strong>Advanced</strong> button on the page and then click{' '}
              <strong>Proceed to...</strong> to accept the privacy issue. The game client should then load. Close the
              current tab and go back to the Neat webclient and refresh the page, and the client should load.
            </p>
          }
        />
      </ContentBlock>
    </>
  )
}

export default TestWebclientPage
