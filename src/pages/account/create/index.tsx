import { useContext, FormEvent, ChangeEvent, useState, useEffect } from "react"
import { Button, Typography } from '@mui/material'
import { UserContext } from "@contexts/UserContext"
import { ContentBlock } from "@atoms/ContentBlock"
import { Form } from '@atoms/Form'
import { BodyText } from '@atoms/BodyText'
import { InlineLink } from "@atoms/InlineLink"
import { Field } from '@atoms/Field'
import { FieldValidationError } from '@atoms/FieldValidationError'
import bcrypt from 'bcryptjs'
import axios from "axios"
import { User } from "@contexts/UserContext/UserContext.types"
import { useRouter } from 'next/router'
import { UserIdentityInfo } from 'src/pages/api/getExistingUserInfo/index'

// The existing user check works, but current problem is someone can change a character and click Submit button super fast..
// ok so Using 50 in the timer is way better and basically foolproof, but i'm concerned with that many database calls...
//  maybe debounce the db calls? if that's a thing.
const CreateAccountPage = () => {
  const { push } = useRouter()
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [validationError, setValidationError] = useState('')
  const [existingUserValidationError, setExistingUserValidationError] = useState('')
  const [userAlreadyExists, setUserAlreadyExists] = useState(false)
  const [existingUsernames, setExistingUsernames] = useState<string[]>([])
  const [existingEmailAddresses, setExistingEmailAddresses] = useState<string[]>([])
  const { setUser } = useContext(UserContext)

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)

    // console.log('existingUsernames.includes(username)', existingUsernames.includes(username), 'username', username)
    // if (existingEmailAddresses.includes(event.target.value) || existingUsernames.includes(username)) {
    //   setValidationError('Email or username already exists.')
    //   return
    // }
    
    setValidationError('')
  }

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)

    // if (existingEmailAddresses.includes(email) || existingUsernames.includes(event.target.value)) {
    //   setValidationError('Email or username already exists.')
    //   return
    // }

    setValidationError('')
  }

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)

    // if (existingEmailAddresses.includes(email) || existingUsernames.includes(event.target.value)) {
    //   setValidationError('Email or username already exists.')
    //   return
    // }

    setValidationError('')
  }

  const handleConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValidationError('')
    setConfirmPassword(event.target.value)
  }

  // const checkForExistingUsers = (emailAddress: string, username: string) => {
  //   axios.get(`/api/getMatchingUsers?email=${emailAddress}&username=${username}`)
  //     .then((response) => {
  //       console.log('hasMatchingUsers -> response.data:', response.data)
  //       if (typeof response.data === 'number' && response.data > 0) {
  //         console.log('setting user already exists to true')
  //         setUserAlreadyExists(true)
  //       } else {
  //         setUserAlreadyExists(false)
  //       }
  //     })
  //     .catch((error : string) => error)
  // }

  const handleAccountCreation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    // Confirm passwords match
    if (password != confirmPassword) {
      setValidationError('Passwords do not match.')
      return
    }

    // Check if username or email exists
    if (existingEmailAddresses.includes(email) || existingUsernames.includes(username)) {
      setValidationError('Email or username already exists.')
      return
    }

    // Hash password
    const passwordSalt = bcrypt.genSaltSync()
    const hashedPassword = bcrypt.hashSync(password, passwordSalt)

    const now = new Date()

    // Create account
    axios.post('/api/createUserAccount', {
      email,
      username,
      password: hashedPassword,
      passwordSalt,
      currentDate: now,
      datePosted: now,
    })
    .then((response) => {
      if (typeof response?.data === 'number') {
        const user: User = {
          id: response?.data,
          emailAddress: email,
          username,
          isAdmin: false,
          lastLogin: now,
        }
        setUser(user)

        // Need to inform user it was successful, or redirect them to a page that shows they are logged in.
        push('/account/create/success')
      }
    })
    .catch((error: { response: { data: string; } }) => {
      setValidationError(error.response.data)
    })
  }

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     // Keep checking for existing users.
  //     checkForExistingUsers(email, username)
  //   }, 50)

  //   return () => {
  //     clearTimeout(timer)
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [email, username])

  // useEffect(() => {
  //   if (userAlreadyExists) {
  //     setExistingUserValidationError('Email or username already exists.')
  //   } else {
  //     setExistingUserValidationError('')
  //   }
  // }, [userAlreadyExists])

  const fetchExistingUserInfo = () => {
    axios.get(`/api/getExistingUserInfo`)
    .then((response) => {
      const allEmailAddresses = response?.data?.map((info: UserIdentityInfo) => info.emailAddress)
      setExistingEmailAddresses(allEmailAddresses)

      const allUsernames = response?.data?.map((info: UserIdentityInfo) => info.username)
      setExistingUsernames(allUsernames)
    })
    .catch((error : string) => error)
  }

  if (existingEmailAddresses?.length < 1 || existingUsernames?.length < 1) {
    fetchExistingUserInfo()
  }

  console.log('existingUsernames', existingUsernames)

  return (
    <div>
      <ContentBlock>
        <Typography variant="h2">Create Account</Typography>
        <BodyText variant="body">
          By creating a website account, you can add or rename game accounts, update passwords, and some other nifty things.
        </BodyText>
        <Form onSubmit={handleAccountCreation}>
          <Field
            required
            id="email"
            label="Email"
            type="email"
            variant="standard"
            onChange={handleEmailChange}
            inputProps={{ maxLength: 100 }}
          />
          <Field
            required
            id="username"
            label="Username"
            variant="standard"
            onChange={handleUsernameChange}
            inputProps={{ maxLength: 100 }}
          />
          <Field required id="password" label="Password" type="password" variant="standard" onChange={handlePasswordChange} />
          <Field required id="confirmPassword" label="Confirm Password" type="password" variant="standard" onChange={handleConfirmPasswordChange} />
          <FieldValidationError>{validationError}</FieldValidationError>
          <FieldValidationError>{existingUserValidationError}</FieldValidationError>
          <Button variant='contained' type="submit" disabled={!!validationError || !!existingUserValidationError}>Submit</Button>
        </Form>
        <BodyText variant="body" topMargin={40}>
          <span>Already have an account?</span>
          <InlineLink href="/account">Log in.</InlineLink>
        </BodyText>
      </ContentBlock>

    </div>
  )
}

export default CreateAccountPage
