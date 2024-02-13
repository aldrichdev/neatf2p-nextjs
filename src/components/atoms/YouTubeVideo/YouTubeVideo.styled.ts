import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const YouTubeVideoIframe = styled('iframe')(
  ({ theme }) => css`
    border: 0;
    width: 100%;
    height: 188px;

    ${theme.breakpoints.up('tablet')} {
      height: 429px;
    }

    ${theme.breakpoints.up('desktop')} {
      height: 600px;
    }
  `,
)
