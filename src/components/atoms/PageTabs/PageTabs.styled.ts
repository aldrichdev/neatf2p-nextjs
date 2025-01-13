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
  shouldForwardProp: prop => !['active', 'defaultColor', 'activeColor', 'hoverColor'].includes(prop.toString()),
})<{ active?: boolean; defaultColor?: string; activeColor?: string; hoverColor?: string }>(
  ({ active, defaultColor, activeColor, hoverColor }) => css`
    font-family: Saros;
    font-size: 18px;
    flex-basis: 100%;
    padding: 8px;
    background-color: ${active ? activeColor || 'green' : defaultColor || 'darkgreen'};
    cursor: pointer;
    color: white;

    &:not(:last-child) {
      border-right: 1px solid black;
      box-sizing: content-box; // only when there are 4... hmm
    }

    &:only-child {
      background-color: black;
    }

    ${!active &&
    `
      &:hover {
        background-color: ${hoverColor || '#228B22'};
      }
    `}
  `,
)
