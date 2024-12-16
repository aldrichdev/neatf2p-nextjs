import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const MobileOnly = styled('div')(
  ({ theme }) => css`
    ${theme.breakpoints.up('tablet')} {
      display: none;
    }
  `,
)
