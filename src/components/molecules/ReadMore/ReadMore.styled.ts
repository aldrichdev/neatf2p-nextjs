import { HoverUnderlineLink } from '@atoms/HoverUnderlineLink'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const Text = styled('span')(
  () => css`
    display: inline;
    width: 100%;
  `,
)

export const ReadMoreLink = styled(HoverUnderlineLink)(
  () => css`
    cursor: pointer;
  `,
)
