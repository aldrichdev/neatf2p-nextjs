import { styled } from '@mui/material/styles'
import { css } from '@mui/system'
import List from '@mui/material/List'
import { HoverUnderlineLink } from '@atoms/HoverUnderlineLink'

export const NewsPostList = styled(List)(
  () => css`
    margin-top: 20px;

    hr:last-child {
      display: none;
    }
  `,
)

export const ViewAllNewsLink = styled(HoverUnderlineLink)`
  color: unset;
  display: block;
  width: fit-content;
  margin: 0 auto;
`
