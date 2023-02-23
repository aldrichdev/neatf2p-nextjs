import { ListItemText, Typography } from "@mui/material";
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const NewsPostImage = styled('img')(
  ({ theme }) => `
    width: 150px;
  `
)

export const NewsPostContent = styled(ListItemText)(
  ({ theme }) => css`
    margin-left: 20px;
  `
)