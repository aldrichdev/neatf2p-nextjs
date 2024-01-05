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
  Warning,
} from './RenameAccountModal.styled'
import axios from 'axios'
import { Form } from '@atoms/Form'
import { FormButton } from '@atoms/FormButton/FormButton'
import { FieldValidationError } from '@atoms/FieldValidationError'
import { FormButtonGroup } from '@atoms/FormButtonGroup/FormButtonGroup'

type RenameAccountModalProps = {
  account: PlayerDataRow
  open: boolean
  setOpen: (open: boolean) => void
}

const RenameAccountModal = (props: RenameAccountModalProps) => {
  const { account, open, setOpen } = props
  const [newName, setNewName] = useState<string>('')
  const [validationError, setValidationError] = useState('')
  const playerAlreadyRenamed = account.former_name?.length > 0

  if (open) {
    // Prevent scrolling
    document.body.style.overflow = 'hidden'
  }

  const handleNewNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value)
    setValidationError('')
  }

  const handleClose = () => {
    setOpen(false)
    document.body.style.overflow = 'unset'
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const newAccountName = newName.trim()

    // Check for names that are just spaces
    if (newAccountName === '') {
      setValidationError('You cannot have a username with only spaces.')
      return
    }

    // Check for the same name
    if (newAccountName === account.username) {
      setValidationError('The account name entered is the same as your current name.')
      return
    }

    axios
      .post('/api/updateGameAccountUsername', {
        accountId: account.id,
        currentName: account.username,
        newName: newAccountName,
      })
      .then(response => {
        if (typeof response?.data === 'number') {
          if (typeof window !== 'undefined') {
            location.reload()
          }
        } else {
          const errorMessage = `Non-number response type in RenameAccountModal: ${response?.data}`
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
        <Typography variant='h3'>Rename Account</Typography>
        {playerAlreadyRenamed ? (
          <BodyText variant='body' textAlign='left'>
            You have already renamed your character once, so you cannot rename again. If you think this is a mistake,
            please contact the admin directly over Discord private message.
          </BodyText>
        ) : (
          <>
            <BodyText variant='body' textAlign='left'>
              <strong>Please log {account.username} out of the game before continuing.</strong>{' '}
              <Warning>You can only rename an account once</Warning>, so please choose wisely when picking a new account
              name. Please note that any spaces at the beginning or end of your new name will not be counted as RSC+
              does not support those kinds of names.
            </BodyText>
            <Form onSubmit={handleSubmit}>
              <RenameFormField type='text' label='Current Name' disabled value={account.username} />
              <RenameFormField
                type='text'
                label='New Name'
                required
                onChange={handleNewNameChange}
                inputProps={{ maxLength: 12 }}
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
          </>
        )}
      </ModalRoot>
    </ModalOverlay>
  )
}

export default RenameAccountModal
