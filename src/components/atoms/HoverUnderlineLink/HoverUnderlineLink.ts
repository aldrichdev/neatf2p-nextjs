import { styled } from '@mui/material/styles'
import Link from 'next/link'

export const HoverUnderlineLink = styled(Link)`
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`
