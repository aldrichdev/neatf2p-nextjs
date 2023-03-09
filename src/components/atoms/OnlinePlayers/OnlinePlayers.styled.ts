import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const PlayersOnlineBox = styled('div')`
  display: flex;
  justify-content: center;
`

export const PlayersOnlineMessage = styled('p')(
  ({ theme }) => css`
    font-family: Helvetica;
    font-size: 14px;
    margin: 0;
      
    ${theme.breakpoints.up('tablet')} {
      font-size: 20px;
    }
  `
)

export const OnlineCount = styled('span')`
  font-weight: 600;
  color: green;
`