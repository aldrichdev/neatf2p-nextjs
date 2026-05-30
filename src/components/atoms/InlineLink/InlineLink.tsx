import { styled } from '@mui/material/styles'
import Link from 'next/link'
import { css } from '@mui/system'

/** TODO: Deprecated, probably, in favor of `StandardLink`. */
export const InlineLink = styled(Link, {
  shouldForwardProp: prop => prop !== 'useHoverUnderline',
})<{ useHoverUnderline?: boolean }>(
  ({ useHoverUnderline }) => css`
    padding-left: 4px;
    ${useHoverUnderline &&
    `
      text-decoration: none;
      
      :hover {
        text-decoration: underline;
      }
    `}
  `,
)
