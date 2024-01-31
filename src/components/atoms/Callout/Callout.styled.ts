import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const Box = styled('div')(
  () => css`
    font-family: Source Sans Pro;
    background-color: rgba(32, 85, 218, 1);
    border: 2px solid darkblue;
    color: white;
    text-align: center;
    padding: 16px;
  `,
)
