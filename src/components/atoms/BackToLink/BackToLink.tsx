import { styled } from '@mui/material/styles'
import { css } from '@mui/system'
import Link from 'next/link'

export const BackToLink = styled(Link)(
  () => css`
    font-family: Source Sans Pro;
    display: block;
    margin-top: 20px;
    font-size: 20px;
    color: purple;
    text-decoration: none;

    :hover {
      color: darkpurple;
      text-decoration: underline;
    }
  `,
)
