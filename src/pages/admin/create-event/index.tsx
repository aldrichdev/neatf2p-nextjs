import { MustBeAdminBlock } from '@molecules/MustBeAdminBlock'
import { PageHeading } from '@atoms/PageHeading'
import { ContentBlock } from '@atoms/ContentBlock'
import { renderHead } from '@helpers/renderUtils'
import { User } from '@globalTypes/User'
import { NullUser } from '@models/NullUser'
import { sessionOptions } from '@models/session'
import { getIronSession } from 'iron-session'
import { GetServerSideProps } from 'next'
import { handleForbiddenRedirect, sendApiRequest } from '@helpers/api/apiUtils'
import { AxiosError } from 'axios'
import { EventSubmitProps } from '@molecules/EventForm/EventForm.types'
import { EventForm } from '@molecules/EventForm'
import { redirectTo } from '@helpers/window'

type CreateEventPageProps = {
  user: User
}

const CreateEventPage = ({ user }: CreateEventPageProps) => {
  const handleCreateEvent = (props: EventSubmitProps) => {
    console.log('handleCreateEvent called')
    const { id, title, startDate, endDate, relativeUrl, location, emojiName, recurring, recursEvery, setSubmitResult } =
      props

    sendApiRequest('POST', '/api/upsertEvent', {
      userId: user.id,
      id,
      title,
      startDate,
      endDate,
      relativeUrl,
      location,
      emojiName: emojiName === '' ? null : emojiName,
      recurring,
      recursEvery: recursEvery === '' ? null : recursEvery,
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
        <ContentBlock>
          <PageHeading>Create an Event</PageHeading>
          <EventForm onSubmitForm={handleCreateEvent} />
        </ContentBlock>
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
