import { Feature, FeatureList } from '@styledPages/About.styled'
import { ContentBlock } from '@atoms/ContentBlock'
import { PageHeading } from '@atoms/PageHeading'
import { BodyText } from '@atoms/BodyText'
import Link from 'next/link'
import { renderHead } from '@helpers/renderUtils'

const About = () => (
  <>
    {renderHead(
      'About',
      'Neat F2P is an F2P-only, 1x EXP, authentic RuneScape Classic private server that runs on the Open RSC framework.',
    )}
    <ContentBlock>
      <PageHeading>Our Spin on RSC</PageHeading>
      <BodyText variant='body' bodyTextAlign='center'>
        Neat F2P is an F2P-only, 1x EXP, authentic RuneScape Classic private server that runs on the Open RSC framework.
        This is F2P in RuneScape as it was in 2002-2003, just without members content. Of course, it is actually free to
        play - no credit card required.
      </BodyText>
      <BodyText variant='body' bodyTextAlign='center'>
        We are committed to making Neat F2P <em>as authentic as possible</em> - as close to Jagex&apos;s version of RSC
        F2P as it can be! This is why we will never have global chat, custom server commands, or extra NPC spawns. When
        you log into Neat, it should feel just like logging into a F2P world of RuneScape back in 2003 - of course, with
        less players.
      </BodyText>
      <FeatureList>
        <Feature>Based on Open RSC&apos;s Core Framework with Few Added Changes</Feature>
        <Feature>Open Source (Game & Website) Forever</Feature>
        <Feature>F2P Mode Enabled (Forever) - Only F2P Areas, Features, Items, Quests, Spells, Prayers, Etc.</Feature>
        <Feature>1 Page Bank (Authentic F2P Behavior)</Feature>
        <Feature>1x EXP Rates</Feature>
        <Feature>Play with RSC+, WinRune, or Web Client</Feature>
        <Feature>Skip Tutorial Option Enabled (RSC+ Only)</Feature>
        <Feature>Max 2 Characters Logged In At Once</Feature>
        <Feature>No QOL - Straight RSC</Feature>
        <Feature>No Global Chat or Kill Feed</Feature>
        <Feature>No Transfers From Other Servers</Feature>
        <Feature>No Cheating</Feature>
        <Feature>Launched Saturday, February 24th, 2024</Feature>
      </FeatureList>
      <BodyText variant='body' bodyTextAlign='center'>
        So, <Link href='/how-to-play'>jump in today</Link> and experience what a F2P-only economy can be!
      </BodyText>
      <BodyText variant='body' bodyTextAlign='center'>
        You can read our server rules <Link href='/about/rules'>here</Link>.
      </BodyText>
    </ContentBlock>
  </>
)

export default About
