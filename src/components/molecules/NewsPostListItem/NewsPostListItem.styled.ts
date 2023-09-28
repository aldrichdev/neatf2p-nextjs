import { styled } from '@mui/material/styles'
import { css } from '@mui/system'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import { Link, Typography } from '@mui/material'

export const NewsPostLi = styled(ListItem)(
  ({ theme }) => css`
    flex-wrap: wrap;
    padding: 0;
    margin: 10px 0 20px;

    ${theme.breakpoints.up('tablet')} {
      flex-wrap: nowrap;
    }
  `
)

export const NewsPostAvatar = styled(ListItemAvatar)(
  ({ theme }) => css`
    width: 100%;

    ${theme.breakpoints.up('tablet')} {
      width: auto;
      margin-right: 20px;
    }
  `
)

export const NewsPostTitleLink = styled(Link)`
    text-decoration: none;
    color: unset;
    display: block;
    width: fit-content;

    :hover {
      text-decoration: underline;
    }
`

export const NewsPostImage = styled('img')(
  ({ theme }) => css`
    width: 100%;

    ${theme.breakpoints.up('tablet')} {
      width: 85px;
    }
  `
)

export const NewsPostTitle = styled(Typography)`
  font-weight: 600;
`
