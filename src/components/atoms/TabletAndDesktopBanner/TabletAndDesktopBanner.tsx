import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const TabletAndDesktopBanner = styled('img')(
  ({ theme }) => css`
    display: none;

    ${theme.breakpoints.up('tablet')} {
      display: block;
      margin: 0 auto;
      width: 90%;
    }

    ${theme.breakpoints.up('desktop')} {
      width: 1200px;
    }
  `,
)
