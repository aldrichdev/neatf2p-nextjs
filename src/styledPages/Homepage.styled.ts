import { css, styled } from '@mui/material/styles'

export const YouTubeVideo = styled('iframe')(
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

export const DiscordButtonContainer = styled('div')(
  () => css`
    margin-top: 40px;
  `,
)

export const DiscordIcon = styled('img')`
  width: 150px;
`
