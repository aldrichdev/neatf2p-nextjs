import { FormGroup } from '@mui/material'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'
import { SubmitArea } from '@styledPages/Form.styled'

export const EventFormGroup = styled(FormGroup)(
  () => css`
    margin-top: 11px;
  `,
)

export const EventSubmitArea = styled(SubmitArea)(
  () => css`
    width: 100%;
  `,
)
