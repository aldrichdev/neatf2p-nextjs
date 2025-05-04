import { ExtendedTypographyProps } from '@globalTypes/MUI/ExtendedTypographyProps'
import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

type TextAlign = 'left' | 'center' | 'right'

type BodyTextProps = ExtendedTypographyProps & {
  topMargin?: number
  /** Alignment of text on desktop and tablet.
   *
   * Note: Was not able to use `textAlign` or `textAlignment` as the name because it conflicted
   * with something on MUI's side.
   */
  bodyTextAlign?: TextAlign
  /** Alignment of text on mobile. */
  mobileTextAlign?: TextAlign
}

export const BodyText = styled(Typography, {
  shouldForwardProp: prop => !['topMargin', 'bodyTextAlign', 'mobileTextAlign'].includes(prop.toString()),
})<BodyTextProps>(
  ({ theme, topMargin, bodyTextAlign, mobileTextAlign }) => css`
    display: block;
    margin-top: ${topMargin === 0 ? 0 : topMargin || 20}px;
    text-align: ${mobileTextAlign || 'center'};

    ${theme.breakpoints.up('tablet')} {
      text-align: ${bodyTextAlign || 'left'};
    }
  `,
)
