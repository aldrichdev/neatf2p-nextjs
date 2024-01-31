import { Typography } from '@mui/material'
import { Feature, FeatureList, Paragraph } from '@styledPages/About.styled'
import { ContentBlock } from '@atoms/ContentBlock'

const About = () => (
  <ContentBlock>
    <Typography variant='h2'>Our Spin on RSC</Typography>
    <Paragraph variant='body'>
      Neat F2P is an <strong>unreleased</strong> F2P-only, 1x EXP, mostly-authentic RuneScape Classic private server
      that runs on the Open RSC framework. This is F2P in RuneScape as it was in 2002-2003, just without members
      content. Of course, it is actually free to play - no credit card required.
    </Paragraph>
    <Paragraph variant='body'>
      We seek to provide the RSC F2P nostalgia, but with an added twist: <em>there are no members items or worlds.</em>{' '}
      You&apos;ll find that some items which are considered F2P, but were only accessible in members lands, will be
      unobtainable. In this way, Neat F2P provides a unique RSC experience that we have never seen!
    </Paragraph>
    <FeatureList>
      <Feature>Based on Open RSC&apos;s Core Framework with Few or No Added Changes</Feature>
      <Feature>Open Source (Game & Website) Forever</Feature>
      <Feature>F2P Mode Enabled (Forever) - Only F2P Areas, Features, Items, Quests, Spells, Prayers, Etc.</Feature>
      <Feature>1x EXP Rates</Feature>
      <Feature>1 Page Bank (Authentic F2P Behavior)</Feature>
      <Feature>Play with RSC+ Client and WinRune (Web Client In Discovery)</Feature>
      <Feature>Skip Tutorial Option Enabled</Feature>
      <Feature>Max 2 Characters Logged In At Once</Feature>
      <Feature>No QOL - Straight RSC</Feature>
      <Feature>No Global Chat or Kill Feed</Feature>
      <Feature>No Transfers From Other Servers</Feature>
      <Feature>No Cheating</Feature>
      <Feature>Aiming for a Spring 2024 Release</Feature>
    </FeatureList>
  </ContentBlock>
)

export default About
