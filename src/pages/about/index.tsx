import { PageHeading } from '@atoms/PageHeading'
import { BodyText } from '@atoms/BodyText'
import { renderHead } from '@utils/renderUtils'
import { StandardLink } from '@atoms/StandardLink'
import { sharedStyles } from '../../consts/styles/shared'
import clsx from 'clsx'

const About = () => {
  const featureLiClass = clsx(
    'text-primary-dark before:text-primary-main flex items-start gap-2.5 text-left',
    'before:mt-px before:shrink-0 before:font-bold before:content-["✓"]',
  )

  return (
    <>
      {renderHead(
        'About',
        'Neat F2P is an F2P-only, 1x EXP, authentic RuneScape Classic private server that runs on the Open RSC framework.',
      )}
      <div className={sharedStyles.defaultContainer}>
        <PageHeading>Our Spin on RSC</PageHeading>
        <BodyText bodyTextAlign='center'>
          Neat F2P is an F2P-only, 1x EXP, authentic RuneScape Classic private server that runs on the Open RSC
          framework. This is F2P in RuneScape as it was in 2002-2003, just without members content. Of course, it is
          actually free to play - no credit card required.
        </BodyText>
        <BodyText bodyTextAlign='center'>
          We are committed to making Neat F2P <em>as authentic as possible </em> - as close to Jagex&apos;s version of
          RSC F2P as it can be! This is why we will never have global chat, custom server commands, or extra NPC spawns.
          When you log into Neat, it should feel just like logging into a F2P world of RuneScape back in 2003 - of
          course, with less players.
        </BodyText>
        <ul
          className={clsx(
            'bg-sidebar-bg border-primary-main m-0 list-none text-lg font-normal',
            'rounded-r-lg border-l-4 px-5 py-4 leading-normal',
          )}
        >
          <li className={featureLiClass}>Based on Open RSC&apos;s Core Framework</li>
          <li className={featureLiClass}>Open Source Forever</li>
          <li className={featureLiClass}>F2P Mode Enabled — Only F2P Areas, Features, Items, Etc.</li>
          <li className={featureLiClass}>1x EXP Rates</li>
          <li className={featureLiClass}>No QOL — Straight RSC</li>
          <li className={featureLiClass}>No Global Chat or Kill Feed</li>
          <li className={featureLiClass}>No Transfers From Other Servers</li>
          <li className={featureLiClass}>Max 2 Characters Logged In At Once</li>
          <li className={featureLiClass}>Launched February 24th, 2024</li>
        </ul>
        <BodyText bodyTextAlign='center'>
          So, <StandardLink href='/how-to-play'>jump in today</StandardLink> and experience what a F2P-only economy can
          be!
        </BodyText>
        <BodyText bodyTextAlign='center'>
          Read our server rules <StandardLink href='/about/rules'>here</StandardLink>.
        </BodyText>
      </div>
    </>
  )
}

export default About
