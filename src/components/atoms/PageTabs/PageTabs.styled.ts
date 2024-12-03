import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const TabsContainer = styled('div')(
  () => css`
    display: flex;
    width: 100%;
    flex-wrap: nowrap;
    border: 2px solid black;
    margin-bottom: 40px;
    height: 40px;
  `,
)

export const PageTab = styled('button', {
  shouldForwardProp: prop => prop !== 'active',
})<{ active?: boolean }>(
  ({ active }) => css`
    font-family: Saros;
    font-size: 18px;
    flex-basis: 50%;
    padding: 8px;
    background-color: ${active ? 'green' : 'darkgreen'};
    cursor: pointer;
    color: white;

    &:not(:last-child) {
      border-right: 1px solid black;
    }

    ${!active &&
    `
      &:hover {
        background-color: #228B22;
      }
    `}
  `,
)
