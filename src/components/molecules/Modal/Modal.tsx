import { BodyText } from '@atoms/BodyText'
import { CloseBar, CloseButton, CloseIcon, ModalHeader, ModalOverlay, ModalRoot } from './Modal.styled'
import { Form } from '@atoms/Form'
import { FormButton } from '@atoms/FormButton/FormButton'
import { FieldValidationError } from '@atoms/FieldValidationError'
import { FormButtonGroup } from '@atoms/FormButtonGroup/FormButtonGroup'
import { ModalProps } from './Modal.types'

const Modal = (props: ModalProps) => {
  const {
    open,
    handleClose,
    heading,
    body,
    hasForm,
    handleSubmit,
    renderFields,
    formValidationError,
    formSuccessMessage,
  } = props

  if (!open) return null

  return (
    <ModalOverlay>
      <ModalRoot open={open}>
        <CloseBar>
          <CloseButton onClick={handleClose}>
            <CloseIcon src='/img/close-icon.webp' alt='' />
          </CloseButton>
        </CloseBar>
        <ModalHeader variant='h3'>{heading}</ModalHeader>
        <BodyText variant='body' textAlign='left'>
          {body}
        </BodyText>
        {hasForm && handleSubmit && renderFields && (
          <>
            <Form onSubmit={handleSubmit}>
              {renderFields()}
              <FieldValidationError>{formValidationError}</FieldValidationError>
              <FormButtonGroup>
                <FormButton variant='contained' type='submit'>
                  Submit
                </FormButton>
                <FormButton variant='outlined' type='button' onClick={handleClose}>
                  Cancel
                </FormButton>
              </FormButtonGroup>
            </Form>
            {formSuccessMessage && (
              <BodyText variant='body' textAlign='left' color='green'>
                {formSuccessMessage}
              </BodyText>
            )}
          </>
        )}
      </ModalRoot>
    </ModalOverlay>
  )
}

export default Modal
