import { useContext, FormEvent, useState, ChangeEvent } from "react"
import { UserContext } from "@contexts/UserContext"
import { Button, Typography } from "@mui/material"
import { ContentBlock } from "@atoms/ContentBlock"
import { Form } from '@atoms/Form'
import { BodyText } from '@atoms/BodyText'
import { Field } from '@atoms/Field'
import { InlineLink } from '@atoms/InlineLink'
import { FieldValidationError } from "@atoms/FieldValidationError"
import axios from "axios"
import bcrypt from 'bcryptjs'
import { User } from "@contexts/UserContext/UserContext.types"
import { useRouter } from 'next/router'

const AccountLoginPage = () => {
  const { push } = useRouter()
  const [usernameOrEmail, setUsernameOrEmail] = useState('')
  const [password, setPassword] = useState('')
  const [validationError, setValidationError] = useState('')
  const { user, setUser} = useContext(UserContext)

  console.log('user', user)

  const userIsLoggedIn = user?.id > 0

  if (userIsLoggedIn) {
    return (
      <ContentBlock>
        <Typography variant="h2">Login</Typography>
        <BodyText>
          You are already logged in. You can visit your
          <InlineLink href='/account'>Account page</InlineLink>.
        </BodyText>
      </ContentBlock>
    )
  }

  const handleUsernameOrEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsernameOrEmail(event.target.value)
  }

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    axios.get(`/api/getUser?user=${usernameOrEmail}`)
      .then((response) => {
        const result = response?.data
        console.log('result', result)

        // First thing would be to confirm the user exists.
        const userExists = result?.id > 0
        if (!userExists) {
          setValidationError('Username or email does not exist.')
          return
        }

        // Next would be to make sure the password is right
        const hashedPassword = result?.password
        const passwordSalt = result?.passwordSalt
        const currentPasswordHashed = bcrypt.hashSync(password, passwordSalt)
        console.log('hashedPassword', hashedPassword, 'password', password, 'currentPasswordHashed', currentPasswordHashed, 'salt', passwordSalt)

        if (hashedPassword !== currentPasswordHashed) {
          setValidationError('Password is incorrect.')
          return
        }

        // If we get this far, it's a match. Log them in and redirect to homepage
        const user: User = { ...result }
        setUser(user)
        push('/')
      })
      .catch((error : string) => error)
  }

  return (
    <ContentBlock>
      <Typography variant="h2">Login</Typography>
      <BodyText variant="body">Log in to your website account below.</BodyText>
      <Form onSubmit={handleLogin}>
        <Field required id="usernameOrEmail" label="Username or Email" variant="standard" onChange={handleUsernameOrEmailChange} />
        <Field required id="password" label="Password" type="password" variant="standard" onChange={handlePasswordChange} />
        <FieldValidationError>{validationError}</FieldValidationError>
        <Button variant='contained' type="submit">Log In</Button>
      </Form>
      <BodyText variant="body" topMargin={40}>
        <span>New around here?</span>
        <InlineLink href="/account/create">Create a site account.</InlineLink>
      </BodyText>
    </ContentBlock>
  )
}

export default AccountLoginPage
