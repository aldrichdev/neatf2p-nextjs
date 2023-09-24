import { styled } from '@mui/material/styles'


export const ContentBlock = styled('div', {
  shouldForwardProp: (prop) => prop !== 'isHomepage' && prop !== 'topMargin',
})<{ isHomepage?: boolean, topMargin?: number }>(
  ({ isHomepage, topMargin }) => `
    max-width: ${isHomepage ? '1200px' : '800px'};
    margin: ${typeof topMargin === 'number' ? topMargin : 40}px auto;
    text-align: center;
  `
)

