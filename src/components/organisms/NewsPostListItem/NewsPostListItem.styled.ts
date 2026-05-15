import { styled } from '@mui/material/styles'
import { css } from '@mui/system'
import ListItem from '@mui/material/ListItem'
import { ListItemAvatar, Typography } from '@mui/material'
import { HoverUnderlineLink } from '@atoms/HoverUnderlineLink'
import Link from 'next/link'
import { ExtendedTypographyProps } from '@globalTypes/MUI/ExtendedTypographyProps'

export const NewsPostLi = styled(ListItem)(
  ({ theme }) => css`
    flex-wrap: wrap;
    padding: 0;
    margin: 10px 0 20px;

    ${theme.breakpoints.up('tablet')} {
      flex-wrap: nowrap;
    }
  `,
)

export const NewsPostAvatarLink = styled(Link)(
  ({ theme }) => css`
    width: 100%;

    ${theme.breakpoints.up('tablet')} {
      width: auto;
      margin-right: 20px;
    }
  `,
)

export const NewsPostTitleLink = styled(HoverUnderlineLink)`
  color: unset;
  display: block;
  width: fit-content;

  &:hover {
    color: black;
  }
`

export const NewsPostTitle = styled(Typography)`
  font-weight: 600;
`

export const NewsPostBody = styled(Typography)<ExtendedTypographyProps>(
  () => css`
    p:first-of-type {
      margin-top: 0;
    }

    p:last-of-type {
      margin-bottom: 0;
    }
  `,
)
