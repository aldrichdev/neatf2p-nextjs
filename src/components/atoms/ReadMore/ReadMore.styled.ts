import { styled } from '@mui/material/styles'
import { css } from '@mui/system'
import Link from 'next/link'

export const Text = styled('span')(
  () => css`
    display: inline;
    width: 100%;
  `,
)

export const ReadMoreLink = styled(Link)(
  () => css`
    cursor: pointer;
    text-decoration: none;

    :hover {
      text-decoration: underline;
    }
  `,
)
