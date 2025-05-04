import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const TournamentBanner = styled('img', {
  shouldForwardProp: prop => !['topMargin'].includes(prop.toString()),
})<{ topMargin?: number }>(
  ({ theme, topMargin }) => css`
    display: none;
    margin-top: ${topMargin || 0}px;
    width: 100%;

    ${theme.breakpoints.up('tablet')} {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
  `,
)
