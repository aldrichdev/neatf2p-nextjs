import { ChangeEvent, FormEvent, useState } from 'react'
import { BodyText } from '@atoms/BodyText'
import { PlayerDataRow } from '@globalTypes/Database/PlayerDataRow'
import { Typography } from '@mui/material'
import {
  CloseBar,
  CloseButton,
  CloseIcon,
  ModalOverlay,
  ModalRoot,
  RenameFormField,
} from '@molecules/RenameAccountModal/RenameAccountModal.styled'
import axios from 'axios'
import { Form } from '@atoms/Form'
import { FormButton } from '@atoms/FormButton/FormButton'
import { FieldValidationError } from '@atoms/FieldValidationError'
import bcrypt from 'bcryptjs'
import { Field } from '@atoms/Field'
import { FormButtonGroup } from '@atoms/FormButtonGroup/FormButtonGroup'

type PasswordModalProps = {
  account: PlayerDataRow
  open: boolean
  setOpen: (open: boolean) => void
}

// TODO: Reuse code between here and RenameAccountModal if possible.
const PasswordModal = (props: PasswordModalProps) => {
  const { account, open, setOpen } = props
  const [newPassword, setNewPassword] = useState<string>('')
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('')
  const [validationError, setValidationError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  if (open) {
    // Prevent scrolling
    document.body.style.overflow = 'hidden'
  }

  const handleNewPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value)
    setValidationError('')
  }

  const handleConfirmNewPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmNewPassword(event.target.value)
    setValidationError('')
  }

  const handleClose = () => {
    setOpen(false)
    document.body.style.overflow = 'unset'
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Make sure passwords match
    if (newPassword !== confirmNewPassword) {
      setValidationError('Passwords must match.')
      return
    }

    // Hash new password.
    // Note: Core Framework code requires hashed passwords to begin with `$2y` or it is not considered valid.
    const newPasswordSalt = bcrypt.genSaltSync()
    const hashedNewPassword = bcrypt.hashSync(newPassword, newPasswordSalt)
    const hashedNewPasswordFixedForCf = hashedNewPassword.replace('$2a', '$2y')

    axios
      .post('/api/updateGameAccountPassword', {
        accountId: account.id,
        newPassword: hashedNewPasswordFixedForCf,
      })
      .then(response => {
        if (typeof response?.data === 'number') {
          setSuccessMessage('Your password has been updated successfully! This window will now close...')
          setTimeout(() => {
            handleClose()
          }, 3000)
        } else {
          const errorMessage = `Non-number response type in PasswordModal: ${response?.data}`
          console.log(errorMessage)
        }
      })
  }

  if (!open) return null

  return (
    <ModalOverlay>
      <ModalRoot>
        <CloseBar>
          <CloseButton onClick={handleClose}>
            <CloseIcon src='/img/close-icon.webp' alt='' />
          </CloseButton>
        </CloseBar>
        <Typography variant='h3'>Update Password</Typography>
        <BodyText variant='body' textAlign='left'>
          Please log {account.username} out of the game before continuing.
        </BodyText>
        <Form onSubmit={handleSubmit}>
          <Field type='text' label='Account' value={account.username} disabled />
          <RenameFormField type='password' label='New Password' required onChange={handleNewPasswordChange} />
          <RenameFormField
            type='password'
            label='Confirm New Password'
            required
            onChange={handleConfirmNewPasswordChange}
          />
          <FieldValidationError>{validationError}</FieldValidationError>
          <FormButtonGroup>
            <FormButton variant='contained' type='submit'>
              Submit
            </FormButton>
            <FormButton variant='outlined' type='button' onClick={handleClose}>
              Cancel
            </FormButton>
          </FormButtonGroup>
        </Form>
        {successMessage && (
          <BodyText variant='body' textAlign='left' color='green'>
            {successMessage}
          </BodyText>
        )}
      </ModalRoot>
    </ModalOverlay>
  )
}

export default PasswordModal
