import { FormEvent, useState, ChangeEvent } from 'react'
import { ContentBlock } from '@atoms/ContentBlock'
import { Form } from '@atoms/Form'
import { BodyText } from '@atoms/BodyText'
import { Field } from '@atoms/Field'
import { InlineLink } from '@atoms/InlineLink'
import useAuthentication from '@hooks/useAuthentication'
import { redirectTo } from '@helpers/window'
import { UserExists, UserIsLoggedIn } from '@helpers/users/users'
import { AlreadyLoggedIn } from '@molecules/AlreadyLoggedIn'
import emailjs from '@emailjs/browser'
import { FormButton } from '@atoms/FormButton/FormButton'
import { Spinner } from '@molecules/Spinner'
import { DiscordLink } from '@atoms/DiscordLink'
import { PageHeading } from '@atoms/PageHeading'
import { sendApiRequest } from '@helpers/api/apiUtils'

const ForgotPasswordPage = () => {
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const user = useAuthentication(setLoading)
  const userIsLoggedIn = UserIsLoggedIn(user)

  if (loading) {
    return <Spinner />
  }

  if (userIsLoggedIn) {
    return <AlreadyLoggedIn />
  }

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handleRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    sendApiRequest('GET', `/api/getUser?email=${email}`)
      .then(async response => {
        const result = response?.data
        const userExists = UserExists(result)

        if (userExists) {
          // Send an email with a reset link.
          await emailjs.send('service_6xpikef', 'template_t4tp3fq', {
            recipient: result?.emailAddress,
            websiteAccountId: result?.id,
          })
        }

        // Whether or not the user exists, redirect to success page.
        // We will not tell the user trying to reset whether the account exists.
        redirectTo('/account/login/forgot-password/success')
      })
      .catch((error: string) => error)
  }

  return (
    <ContentBlock>
      <PageHeading>Forgot Password</PageHeading>
      <BodyText variant='body' textAlign='left'>
        Forgotten your password? Enter your email below and we will send you a password reset link. If you have
        forgotten your username and email as well, please contact an administrator in{' '}
        <DiscordLink>Neat F2P&apos;s Discord server</DiscordLink>
        {''}.
      </BodyText>
      <Form onSubmit={handleRequest}>
        <Field required id='email' label='Email' variant='standard' onChange={handleEmailChange} />
        <FormButton variant='contained' type='submit'>
          Submit
        </FormButton>
      </Form>
      <BodyText variant='body' topMargin={40} textAlign='left'>
        <span>Or, if you remember it,</span>
        <InlineLink href='/account/login'>try logging in now.</InlineLink>
      </BodyText>
    </ContentBlock>
  )
}

export default ForgotPasswordPage
