import { styled } from '@mui/material/styles'

export const ContentBlock = styled('div', {
  shouldForwardProp: prop => prop !== 'isWide' && prop !== 'topMargin' && prop !== 'textColor',
})<{ isWide?: boolean; topMargin?: number; textColor?: string }>(
  ({ isWide, topMargin, textColor }) => `
    max-width: ${isWide ? '1200px' : '800px'};
    margin: ${typeof topMargin === 'number' ? topMargin : 0}px auto;
    text-align: center;
    ${textColor && `color: ${textColor}`};
  `,
)
