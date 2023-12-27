import styled from '@emotion/styled'
import { Button } from '@mui/material'
import { css } from '@mui/system'

/** A button that is part of a form usually needs some space above it. */
export const FormButton = styled(Button)(
  ({}) => css`
    margin-top: 40px;
  `,
)
