import { BodyText } from '@atoms/BodyText'
import {
  CloseBar,
  CloseButton,
  CloseIcon,
  ModalHeader,
  ModalOverlay,
  ModalRoot,
  ScrollableContainer,
  ScrollableBody,
} from './Modal.styled'
import { Form } from '@atoms/Form'
import { FormButton } from '@atoms/FormButton/FormButton'
import { FieldValidationMessage } from '@atoms/FieldValidationMessage'
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
    bodyScrollable,
  } = props

  if (!open) return null

  return (
    <ModalOverlay>
      <ModalRoot>
        <CloseBar>
          <CloseButton onClick={handleClose}>
            <CloseIcon src='/img/close-icon.webp' alt='' />
          </CloseButton>
        </CloseBar>
        <ModalHeader variant='h3'>{heading}</ModalHeader>
        {bodyScrollable ? (
          <ScrollableContainer>
            <ScrollableBody variant='body' component='span' bodyTextAlign='left'>
              {body}
            </ScrollableBody>
          </ScrollableContainer>
        ) : (
          <BodyText variant='body' component='span' bodyTextAlign='left'>
            {body}
          </BodyText>
        )}
        {hasForm && handleSubmit && renderFields && (
          <>
            <Form onSubmit={handleSubmit}>
              {renderFields()}
              <FieldValidationMessage>{formValidationError}</FieldValidationMessage>
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
              <BodyText variant='body' bodyTextAlign='left' color='green'>
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
