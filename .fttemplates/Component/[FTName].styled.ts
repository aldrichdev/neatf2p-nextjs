import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const StyledComponent = styled('div')(
  ({ theme }) => css`
    display: flex;
  `,
)
