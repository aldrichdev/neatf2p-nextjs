import { ListItemText } from "@mui/material";
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'

export const NewsPostList = styled(List)(
  ({ theme }) => css`
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
  `
)

export const NewsPostAvatar = styled(ListItemAvatar)(
  ({ theme }) => css`
    width: 100%;

    ${theme.breakpoints.up('tablet')} {
      width: auto;
    }
  `
)
export const NewsPostImage = styled('img')(
  ({ theme }) => css`
    width: 100%;

    ${theme.breakpoints.up('tablet')} {
      width: 150px;
    }
  `
)

export const NewsPostContent = styled(ListItemText)(
  ({ theme }) => css`
    ${theme.breakpoints.up('desktop')} {
      margin-left: 20px;
    }
    
  `
)