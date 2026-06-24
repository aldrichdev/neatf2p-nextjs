import { MustBeAdminBlock } from '@molecules/MustBeAdminBlock'
import { PageHeading } from '@atoms/PageHeading'
import { renderHead } from '@utils/renderUtils'
import { User } from '@globalTypes/User'
import { NullUser } from '@models/NullUser'
import { sessionOptions } from '@models/session'
import { getIronSession } from 'iron-session'
import { GetServerSideProps } from 'next'
import { handleForbiddenRedirect, sendApiRequest } from '@utils/api/apiUtils'
import { AxiosError } from 'axios'
import { EventSubmitProps } from '@molecules/EventForm/EventForm.types'
import { EventForm } from '@molecules/EventForm'
import { redirectTo } from '@utils/window'
import { sharedStyles } from '@consts/styles/shared'

type CreateEventPageProps = {
  user: User
}

const CreateEventPage = ({ user }: CreateEventPageProps) => {
  const handleCreateEvent = (props: EventSubmitProps) => {
    const { Id, Title, StartDate, EndDate, RelativeUrl, Location, EmojiName, Recurring, RecursEvery, setSubmitResult } =
      props

    sendApiRequest('POST', '/api/upsertEvent', {
      userId: user.id,
      id: Id,
      title: Title,
      startDate: StartDate,
      endDate: EndDate,
      relativeUrl: RelativeUrl,
      location: Location,
      emojiName: EmojiName === '' ? null : EmojiName,
      recurring: Recurring,
      recursEvery: RecursEvery === '' ? null : RecursEvery,
    })
      .then(response => {
        setSubmitResult({
          answer: response?.data,
          code: response?.data?.includes('Success') ? 'green' : 'red',
        })

        // If response was successful, redirect to /events page after a delay
        if (response?.data?.includes('Success')) {
          setTimeout(() => {
            redirectTo('/events')
          }, 5000)
        }
      })
      .catch((error: AxiosError<string>) => {
        setSubmitResult({
          answer: error?.response?.data || '',
          code: 'red',
        })

        handleForbiddenRedirect(error)
      })
  }

  return (
    <>
      {renderHead('Create Event')}
      {!user?.isAdmin ? (
        <MustBeAdminBlock />
      ) : (
        <div className={sharedStyles.defaultContainer}>
          <PageHeading>Create an Event</PageHeading>
          <EventForm onSubmitForm={handleCreateEvent} />
        </div>
      )}
    </>
  )
}

export default CreateEventPage

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getIronSession(req, res, sessionOptions)
  const user: User = session?.user || NullUser

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  }
}
