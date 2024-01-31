import { ExtendedTypographyProps } from '@globalTypes/MUI/ExtendedTypographyProps'
import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const NewsPostDetailContainer = styled('div')(
  () => css`
    text-align: left;
  `,
)

export const NewsPostTitle = styled(Typography)(
  () => css`
    margin-top: 20px;
  `,
)

export const NewsPostDetailImage = styled('img')(
  ({ theme }) => css`
    margin-top: 20px;
    max-width: 100%;

    ${theme.breakpoints.up('tablet')} {
      max-width: 300px;
    }
  `,
)

export const NewsPostDetailDate = styled(Typography)(
  () => css`
    margin-top: 10px;
    font-size: 18px;
    color: gray;
  `,
)

export const NewsPostDetailAuthor = styled(Typography)(
  () => css`
    font-size: 18px;
    color: gray;
  `,
)

export const NewsPostDetailBody = styled(Typography)<ExtendedTypographyProps>(
  ({ theme }) => css`
    display: block;
    margin: 20px 0 0;

    ${theme.breakpoints.up('tablet')} {
      margin: 40px 0 0;
    }
  `,
)
