import { FormEvent, useState, ChangeEvent } from 'react'
import { Button, Typography } from '@mui/material'
import { ContentBlock } from '@atoms/ContentBlock'
import { Form } from '@atoms/Form'
import { BodyText } from '@atoms/BodyText'
import { Field } from '@atoms/Field'
import { InlineLink } from '@atoms/InlineLink'
import axios from 'axios'
import useAuthentication from '@hooks/useAuthentication'
import { redirectTo } from '@helpers/window'
import Link from 'next/link'

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('')
  const user = useAuthentication()
  const userIsLoggedIn = user?.id > 0

  if (userIsLoggedIn) {
    return (
      <ContentBlock>
        <Typography variant='h2'>Login</Typography>
        <BodyText textAlign='center'>
          <Typography variant='body' component='span'>
            You are already logged in. You can visit your
            <InlineLink href='/account'>Account page</InlineLink>.
          </Typography>
        </BodyText>
      </ContentBlock>
    )
  }

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handleRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    axios
      .get(`/api/getUser?user=${email}`)
      .then(async response => {
        const result = response?.data
        const userExists = result?.id > 0

        if (!userExists) {
          // Redirect to a "success" page, but do nothing.
          redirectTo('/account/login/forget-password/success')
        } else {
          // Send an email with a reset link.
        }
      })
      .catch((error: string) => error)
  }

  return (
    <ContentBlock>
      <Typography variant='h2'>Forgot Password</Typography>
      <BodyText variant='body' textAlign='left'>
        Forgotten your password? Enter your email below and we will send you a password reset link. If you have
        forgotten your username and email as well, please contact an administrator in{' '}
        <Link href='https://discord.gg/wd67zUxPXn' target='_blank'>
          Neat F2P's Discord server
        </Link>
        {''}.
      </BodyText>
      <Form onSubmit={handleRequest}>
        <Field required id='email' label='Email' variant='standard' onChange={handleEmailChange} />
        <Button variant='contained' type='submit'>
          Submit
        </Button>
      </Form>
      <BodyText variant='body' topMargin={40} textAlign='left'>
        <span>Or, if you remember it,</span>
        <InlineLink href='/account/login'>try logging in now.</InlineLink>
      </BodyText>
    </ContentBlock>
  )
}

export default ForgotPasswordPage
