import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const TabsContainer = styled('div', {
  shouldForwardProp: prop => prop !== 'fullyRounded',
})<{ fullyRounded?: boolean }>(
  ({ fullyRounded }) => css`
    display: flex;
    width: 100%;
    flex-wrap: nowrap;
    height: 40px;
    box-sizing: border-box;
    border-radius: ${fullyRounded ? '8px' : '8px 8px 0 0'};
    overflow: hidden;

    button {
      box-sizing: content-box;
    }
  `,
)

export const PageTab = styled('button', {
  shouldForwardProp: prop =>
    ![
      'active',
      'defaultBgColor',
      'defaultTextColor',
      'activeBgColor',
      'activeTextColor',
      'hoverBgColor',
      'hoverTextColor',
      'fontSize',
    ].includes(prop.toString()),
})<{
  active?: boolean
  defaultBgColor?: string
  defaultTextColor?: string
  activeBgColor?: string
  activeTextColor?: string
  hoverBgColor?: string
  hoverTextColor?: string
  fontSize?: number
}>(
  ({
    theme,
    active,
    defaultBgColor,
    defaultTextColor,
    activeBgColor,
    activeTextColor,
    hoverBgColor,
    hoverTextColor,
    fontSize,
  }) => css`
    font-family: Inter, sans-serif;
    font-size: ${fontSize ? `${fontSize}px` : '18px'};
    font-weight: 500;
    flex-basis: 100%;
    padding: 8px;
    background-color: ${active
      ? activeBgColor || theme.palette.primary.main
      : defaultBgColor || theme.palette.primary.dark};
    cursor: pointer;
    color: ${active
      ? activeTextColor || theme.palette.custom.tableHeaderText
      : defaultTextColor || theme.palette.custom.tableHeaderText};

    &:only-child {
      cursor: auto;
    }

    ${!active &&
    `
      &:hover {
        color: ${hoverTextColor || theme.palette.custom.tableHeaderText};
        background-color: ${hoverBgColor || theme.palette.primary.main};
      }
    `}
  `,
)
