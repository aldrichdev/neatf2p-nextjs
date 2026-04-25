import { styled } from '@mui/material/styles'
import { css } from '@mui/system'
import Link from 'next/link'

export const BackToLink = styled(Link)(
  ({ theme }) => css`
    font-family: Source Sans Pro;
    display: block;
    margin-top: 16px;
    font-size: 14px;
    color: ${theme.palette.primary.main};
    text-decoration: none;

    :hover {
      color: ${theme.palette.secondary.main};
    }
  `,
)
