import { Typography } from '@mui/material'
import { Paragraph } from '@styledPages/About.styled'
import { ContentBlock } from '@atoms/ContentBlock'
import Link from 'next/link'

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
    <Paragraph variant='body'>
      So, <Link href='/how-to-play'>jump in today</Link> and experience what a F2P-only economy can be!
    </Paragraph>
  </ContentBlock>
)

export default About
