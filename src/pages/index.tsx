import { OnlinePlayers } from '@organisms/OnlinePlayers'
import { NewsAndUpdates } from '@organisms/NewsAndUpdates'
import Link from 'next/link'
import DiscordLogo from 'public/img/discord-512.webp'
import { DiscordLink } from '@atoms/DiscordLink'
import { PageHeading } from '@atoms/PageHeading'
import { renderHead } from '@utils/renderUtils'
import { Button } from 'src/components/ui/button'

// TODO: Consider creating a StandardLink component for the common link state: underline, green, purple on hover.
const Homepage = () => (
  <div className='flex flex-col flex-wrap justify-center items-center gap-10 mb-5 mx-auto w-full md:w-300'>
    {renderHead('Home')}
    <OnlinePlayers />
    <PageHeading>Welcome back to 2003</PageHeading>
    <p className='text-center'>
      Neat F2P is a RuneScape Classic private server that aims to provide you with an RS1 F2P experience, featuring a
      F2P-only world and economy to explore and enjoy. For more information, check out the{' '}
      <Link href='/about' className='underline text-primary-main hover:text-secondary-main'>
        About page
      </Link>
      .
    </p>
    <Button size='lg' asChild className='font-bold'>
      <Link href='/how-to-play'>Play Now</Link>
    </Button>
    <img
      src='/img/banners/HomepageBanner.png'
      alt='Relive It All'
      className='hidden mx-auto md:block md:w-[90%] lg:w-300'
    />
    <NewsAndUpdates heading='Latest News & Updates' limit={3} showViewAllButton />
    <PageHeading>Join the Community</PageHeading>
    <p className='text-center'>Click the button below to join our Discord server.</p>
    <DiscordLink>
      <img src={DiscordLogo.src} alt='Join our Discord Server' className='w-37.5' />
    </DiscordLink>
  </div>
)

export default Homepage
