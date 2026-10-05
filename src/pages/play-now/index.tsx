import { sharedStyles } from '@consts/styles/shared'
import { BodyText } from '@atoms/BodyText'
import { PageHeading } from '@atoms/PageHeading'
import Link from 'next/link'
import { renderHead } from '@utils/renderUtils'
import clsx from 'clsx'
import { Button } from '@ui/button'
import { UserIsLoggedIn } from '@utils/users/users'
import { cn } from '@utils/cn'
import { User } from '@globalTypes/User'
import { GetServerSideProps } from 'next'
import { sessionOptions } from '@models/session'
import { getIronSession } from 'iron-session'
import { NullUser } from '@models/NullUser'

type PlayNowPageProps = {
  user: User
}

const PlayNowPage = ({ user }: PlayNowPageProps) => {
  const userIsLoggedIn = UserIsLoggedIn(user)

  const styles = {
    outerContainer: cn('flex flex-wrap gap-4', !userIsLoggedIn && 'md:flex-nowrap'),
    firstCard: cn(
      'bg-sidebar-bg border-divider flex flex-wrap gap-4 rounded-lg border-2 p-4 text-left',
      userIsLoggedIn ? 'border-secondary w-full flex-col justify-around border-2' : 'w-full md:w-[45%]',
    ),
    heading: 'basis-full text-2xl font-bold',
    description: 'text-text-base text-base',
    stepBadge: clsx(
      'bg-primary-light text-primary inline-flex h-fit items-center',
      'justify-center rounded-full px-2 py-1 text-sm font-semibold',
    ),
    stepTwoCard:
      'bg-sidebar-bg border-secondary flex w-full flex-wrap gap-4 rounded-lg border-2 p-4 text-left md:w-[55%]',
    otherClientsCard:
      'border-divider flex flex-wrap items-center justify-between gap-4 rounded-lg border-2 px-4 py-5 text-left',
  }

  return (
    <>
      {renderHead(
        'Play Now',
        'Play Neat F2P, a free RuneScape Classic private server. Create an account and start in your browser, ' +
          'or use RSC+, WinRune, or Android.',
      )}
      <div className={sharedStyles.defaultContainer}>
        <PageHeading>Play Now</PageHeading>
        {userIsLoggedIn ? (
          <BodyText bodyTextAlign='center'>
            Welcome back, <span className='text-primary-main font-medium'>{user.username}</span>. Pick a client and jump
            in.
          </BodyText>
        ) : (
          <BodyText bodyTextAlign='center'>
            Your RuneScape Classic F2P adventure awaits! Two steps and you are in.
          </BodyText>
        )}
        <div className={styles.outerContainer}>
          <div className={styles.firstCard}>
            {userIsLoggedIn ? (
              <>
                <div className='flex flex-wrap gap-4'>
                  <h3 className={styles.heading}>Launch the game</h3>
                  <p className={cn(styles.description, 'basis-full')}>
                    No download required. Works well on desktop and mobile, including iOS.
                  </p>
                </div>
                <Button asChild size='lg' variant='secondary'>
                  <Link href='/client/mudclient.html'>Play in Browser</Link>
                </Button>
              </>
            ) : (
              <>
                <span className={styles.stepBadge}>Step 1</span>
                <h3 className={styles.heading}>Create your account</h3>
                <p className={cn(styles.description, 'basis-full')}>
                  Accounts must be created on this website, not in the game client.
                </p>
                <Button asChild size='lg'>
                  <Link href='/account/create'>Register</Link>
                </Button>
              </>
            )}
          </div>
          {!userIsLoggedIn && (
            <div className={styles.stepTwoCard}>
              <span className={styles.stepBadge}>Step 2</span>
              <h3 className={styles.heading}>Launch the game</h3>
              <p className={cn(styles.description, 'basis-full')}>
                No download required. Works well on desktop and mobile, including iOS.
              </p>
              <Button asChild size='lg' variant='secondary' className='basis-full'>
                <Link href='/client/mudclient.html'>Play in Browser</Link>
              </Button>
            </div>
          )}
        </div>
        <div className={styles.otherClientsCard}>
          <p className={styles.description}>Want the full experience? Use a desktop or mobile client.</p>
          <div className='flex flex-wrap gap-2'>
            <Button asChild variant='outline'>
              <Link href='/play-now/rscplus'>RSC+</Link>
            </Button>
            <Button asChild variant='outline'>
              <Link href='/downloads/NeatF2P.exe'>WinRune</Link>
            </Button>
            <Button asChild variant='outline'>
              <Link href='/downloads/neatf2p.apk'>Android</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default PlayNowPage

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getIronSession(req, res, sessionOptions)
  const user: User = session?.user || NullUser

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  }
}
