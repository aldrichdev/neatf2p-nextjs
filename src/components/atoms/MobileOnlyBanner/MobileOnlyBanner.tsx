import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const MobileOnlyBanner = styled('img')(
  ({ theme }) => css`
    display: block;
    margin: 0 auto;
    width: 100%;

    ${theme.breakpoints.up('tablet')} {
      display: none;
    }
  `,
)
