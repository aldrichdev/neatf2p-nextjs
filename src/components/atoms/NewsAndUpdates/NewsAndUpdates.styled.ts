import { styled } from '@mui/material/styles'
import { css } from '@mui/system'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import { Typography } from '@mui/material'
import Link from 'next/link'

export const NewsPostList = styled(List)(
  () => css`
    margin-top: 20px;
    
    hr:last-child {
      display: none;
    }
  `
)

export const NewsPostListItem = styled(ListItem)(
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
    }

    ${theme.breakpoints.up('desktop')} {
      margin-right: 20px;
    }
  `
)
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

export const ReadMoreLink = styled(Link)`
  text-decoration: none;
  color: unset;
  display: block;
  width: fit-content;
  margin: 0 auto;

  :hover {
    text-decoration: underline;
  }
`