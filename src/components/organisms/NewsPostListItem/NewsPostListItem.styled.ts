import { styled } from '@mui/material/styles'
import { css } from '@mui/system'
import { Typography } from '@mui/material'
import { ExtendedTypographyProps } from '@globalTypes/MUI/ExtendedTypographyProps'

/** TODO: Deprecated, check references and remove later */
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
