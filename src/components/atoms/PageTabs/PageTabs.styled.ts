import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const TabsContainer = styled('div')(
  () => css`
    display: flex;
    width: 100%;
    flex-wrap: nowrap;
    height: 40px;
    box-sizing: border-box;
    border-radius: 8px 8px 0 0;
    overflow: hidden;

    button {
      box-sizing: content-box;
    }
  `,
)

export const PageTab = styled('button', {
  shouldForwardProp: prop => !['active', 'defaultColor', 'activeColor', 'hoverColor'].includes(prop.toString()),
})<{ active?: boolean; defaultColor?: string; activeColor?: string; hoverColor?: string }>(
  ({ theme, active, defaultColor, activeColor, hoverColor }) => css`
    font-family: Inter, sans-serif;
    font-size: 18px;
    flex-basis: 100%;
    padding: 8px;
    background-color: ${active
      ? activeColor || theme.palette.primary.main
      : defaultColor || theme.palette.primary.dark};
    cursor: pointer;
    color: ${theme.palette.custom.tableHeaderText};

    &:only-child {
      cursor: auto;
    }

    ${!active &&
    `
      &:hover {
        background-color: ${hoverColor || theme.palette.primary.main};
      }
    `}
  `,
)
