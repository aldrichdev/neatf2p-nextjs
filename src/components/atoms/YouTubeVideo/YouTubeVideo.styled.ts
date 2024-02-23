import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const YouTubeVideoIframe = styled('iframe')<{ desktopWidth?: string; desktopHeight?: string }>(
  ({ theme, desktopWidth, desktopHeight }) => css`
    border: 0;
    width: 100%;
    height: 188px;

    ${theme.breakpoints.up('tablet')} {
      height: 429px;
    }

    ${theme.breakpoints.up('desktop')} {
      width: ${desktopWidth || '100%'};
      height: ${desktopHeight || '600px'};
    }
  `,
)
