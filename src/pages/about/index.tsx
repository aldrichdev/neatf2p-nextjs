import { Feature, FeatureList } from '@styledPages/About.styled'
import { ContentBlock } from '@atoms/ContentBlock'
import { PageHeading } from '@atoms/PageHeading'
import { BodyText } from '@atoms/BodyText'
import Link from 'next/link'
import { renderHead } from '@helpers/renderUtils'

const About = () => (
  <>
    {renderHead('About')}
    <ContentBlock>
      <PageHeading>Our Spin on RSC</PageHeading>
      <BodyText variant='body' bodyTextAlign='center'>
        Neat F2P is an F2P-only, 1x EXP, mostly-authentic RuneScape Classic private server that runs on the Open RSC
        framework. This is F2P in RuneScape as it was in 2002-2003, just without members content. Of course, it is
        actually free to play - no credit card required.
      </BodyText>
      <BodyText variant='body' bodyTextAlign='center'>
        We seek to provide the RSC F2P nostalgia, but with an added twist:{' '}
        <em>there are no members items or worlds.</em> You&apos;ll find that some items which are considered F2P, but
        were only accessible in members lands, will be unobtainable. In this way, Neat F2P provides a unique RSC
        experience that we have never seen!
      </BodyText>
      <FeatureList>
        <Feature>Based on Open RSC&apos;s Core Framework with Few or No Added Changes</Feature>
        <Feature>Open Source (Game & Website) Forever</Feature>
        <Feature>F2P Mode Enabled (Forever) - Only F2P Areas, Features, Items, Quests, Spells, Prayers, Etc.</Feature>
        <Feature>1x EXP Rates</Feature>
        <Feature>1 Page Bank (Authentic F2P Behavior)</Feature>
        <Feature>Play with RSC+, WinRune and Web Client</Feature>
        <Feature>Skip Tutorial Option Enabled</Feature>
        <Feature>Max 2 Characters Logged In At Once</Feature>
        <Feature>No QOL - Straight RSC</Feature>
        <Feature>No Global Chat or Kill Feed</Feature>
        <Feature>No Transfers From Other Servers</Feature>
        <Feature>No Cheating</Feature>
      </FeatureList>
      <BodyText variant='body' bodyTextAlign='center'>
        So, <Link href='/how-to-play'>jump in today</Link> and experience what a F2P-only economy can be!
      </BodyText>
    </ContentBlock>
  </>
)

export default About
