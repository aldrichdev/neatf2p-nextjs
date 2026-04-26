import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const HiscoresMenuItemList = styled('ul', {
  shouldForwardProp: prop => prop !== 'isNpcMenu',
})<{ isNpcMenu?: boolean }>(
  ({ theme, isNpcMenu }) => css`
    background-color: ${theme.palette.custom.sidebarBg};
    border: 0.5px solid ${theme.palette.divider};
    border-top: none;
    padding: 0;
    display: flex;
    column-gap: 6px;
    width: 100%;
    margin: 0;
    box-sizing: border-box;
    padding: 10px 12px;
    height: fit-content;
    overflow-x: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }

    ${theme.breakpoints.up('tablet')} {
      display: block;
      height: auto;
      border-radius: 8px;
      padding: 8px 0;
      border-top: 0.5px solid ${theme.palette.divider};
      column-gap: 0;
      flex-basis: calc(30% - 30px);

      ${isNpcMenu &&
      `
        height: 100%;
        overflow-y: auto;
        scrollbar-width:  thin;
        scrollbar-color: ${theme.palette.divider} transparent;
      `}
    }

    ${theme.breakpoints.up('desktop')} {
      flex-basis: auto;
    }
  `,
)
