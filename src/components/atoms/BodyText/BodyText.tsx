import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const BodyText = styled(Typography, {
  shouldForwardProp: prop => !['topMargin', 'textAlign'].includes(prop.toString()),
})<{ topMargin?: number; textAlign?: 'left' | 'center' | 'right' }>(
  ({ topMargin, textAlign }) => css`
    margin-top: ${topMargin || 20}px;
    text-align: ${textAlign || 'center'};
  `,
)
