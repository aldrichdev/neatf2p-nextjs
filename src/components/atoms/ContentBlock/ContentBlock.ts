import { styled } from '@mui/material/styles'


export const ContentBlock = styled('div', {
  shouldForwardProp: (prop) => prop !== 'isWide' && prop !== 'topMargin',
})<{ isWide?: boolean, topMargin?: number }>(
  ({ isWide, topMargin }) => `
    max-width: ${isWide ? '1200px' : '800px'};
    margin: ${typeof topMargin === 'number' ? topMargin : 40}px auto;
    text-align: center;
  `
)

