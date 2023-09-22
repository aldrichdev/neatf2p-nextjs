import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const NewsPostDetailContainer = styled('div')(
  () => css`
    text-align: left;
  `
)

export const PageHeading = styled(Typography)(
  () => css`
    text-align: center;
  `
)


export const NewsPostTitle = styled(Typography)(
  () => css`
    margin-top: 20px;
  `
)

export const NewsPostDetailImage = styled('img')(
  () => css`
    margin-top: 20px;
  `
)

export const NewsPostDetailDate = styled(Typography)(
  () => css`
    margin-top: 10px;
    font-size: 18px;
    color: gray;
  `
)

export const NewsPostDetailAuthor = styled(Typography)(
  () => css`
    font-size: 18px;
    color: gray;
  `
)

export const NewsPostDetailBody = styled(Typography)(
  () => css`
    margin-top: 40px;
  `
)