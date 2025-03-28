import { css, styled } from '@mui/material/styles'

export const HomepageBanner = styled('img')(
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

export const DiscordIcon = styled('img')`
  width: 150px;
`
