import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const Form = styled('form', {
  shouldForwardProp: prop => prop !== 'desktopWidth',
})<{ desktopWidth?: string }>(
  ({ theme, desktopWidth }) => css`
    margin-top: 20px;
    font-family: Source Sans Pro;
    display: flex;
    flex-wrap: wrap;
    width: 100%;

    ${theme.breakpoints.up('desktop')} {
      width: ${desktopWidth || '40%'};
    }
  `,
)
