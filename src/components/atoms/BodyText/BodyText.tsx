import { ExtendedTypographyProps } from '@globalTypes/MUI/ExtendedTypographyProps'
import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

type BodyTextProps = ExtendedTypographyProps & {
  topMargin?: number
  /** Alignment of text. Note: Was not able to use `textAlign` or `textAlignment` as the name because it conflicted
   * with something on MUI's side.
   */
  bodyTextAlign?: 'left' | 'center' | 'right'
}

export const BodyText = styled(Typography, {
  shouldForwardProp: prop => !['topMargin', 'bodyTextAlign'].includes(prop.toString()),
})<BodyTextProps>(
  ({ theme, topMargin, bodyTextAlign }) => css`
    margin-top: ${topMargin || 20}px;
    text-align: center;

    ${theme.breakpoints.up('tablet')} {
      text-align: ${bodyTextAlign || 'left'};
    }
  `,
)
