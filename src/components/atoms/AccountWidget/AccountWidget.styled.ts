import { InlineLink } from '@atoms/InlineLink'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'
import Link from 'next/link'

export const AccountArea = styled('div')(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: Saros;
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: white;
    border-radius: 10px;
    padding: 10px;

    ${theme.breakpoints.up('tablet')} {
      top: 20px;
      right: 20px;
    }

    ${theme.breakpoints.up('desktop')} {
      font-size: 20px;
    }
  `,
)

export const Username = styled(InlineLink)`
  font-weight: 600;
  color: green;
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`

export const AccountAreaLink = styled(Link)(
  () => css`
    text-decoration: none;
    color: unset;

    :hover {
      text-decoration: underline;
    }
  `,
)
