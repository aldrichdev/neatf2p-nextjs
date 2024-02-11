import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const PlayersOnlineBox = styled('div')`
  display: flex;
  justify-content: center;
`

export const PlayersOnlineMessage = styled('p')(
  ({ theme }) => css`
    font-family: Verdana;
    font-size: 20px;
    text-align: center;
    margin: 20px 0;

    ${theme.breakpoints.up('tablet')} {
      margin: 0;
    }
  `,
)

export const OnlineCount = styled('span')`
  font-weight: 600;
  color: green;
`
