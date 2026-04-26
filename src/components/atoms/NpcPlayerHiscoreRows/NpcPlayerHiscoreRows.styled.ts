import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const StyledComponent = styled('div')(
  () => css`
    display: flex;
  `,
)
