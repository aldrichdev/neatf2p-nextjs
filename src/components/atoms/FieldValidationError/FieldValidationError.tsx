import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

/** This component is intended to show a single error message. Usually it is placed just above a submit button. */
export const FieldValidationError = styled('span')(
  () => css`
    color: red;
    font-size: 14px;
    margin-top: 20px;
    flex-basis: 100%;
    text-align: left;
  `,
)
