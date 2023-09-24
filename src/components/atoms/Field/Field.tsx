import { TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const Field = styled(TextField)(
  () => css`
    flex-basis: 100%;
    margin-top: 20px;
  `
)
