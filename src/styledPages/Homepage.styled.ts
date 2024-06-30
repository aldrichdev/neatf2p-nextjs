import { css, styled } from '@mui/material/styles'

export const HomepageBanner = styled('img')(
  ({ theme }) => css`
    display: none;

    ${theme.breakpoints.up('tablet')} {
      display: block;
      margin: 0 auto;
      width: 600px;
    }

    ${theme.breakpoints.up('desktop')} {
      width: 1200px;
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
