import { styled } from '@mui/material/styles'

export const ContentBlock = styled('div', {
  shouldForwardProp: prop => !['isWide', 'customWidth', 'topMargin', 'textColor'].includes(prop.toString()),
})<{ isWide?: boolean; topMargin?: number; textColor?: string; customWidth?: number }>(
  ({ isWide, topMargin, textColor, customWidth }) => `
    max-width: ${customWidth ? `${customWidth}px` : isWide ? '1200px' : '800px'};
    margin: ${typeof topMargin === 'number' ? topMargin : 0}px auto;
    text-align: center;
    ${textColor && `color: ${textColor}`};
  `,
)
