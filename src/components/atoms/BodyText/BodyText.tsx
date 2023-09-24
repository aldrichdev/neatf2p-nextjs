import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const BodyText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'topMargin',
})<{ topMargin?: number }>(
  ({ topMargin }) => css`
    margin-top: ${topMargin || 20}px;
    text-align: left;
  `
)
