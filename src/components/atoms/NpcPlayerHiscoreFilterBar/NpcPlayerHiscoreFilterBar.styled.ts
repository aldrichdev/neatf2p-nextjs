import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const FilterBar = styled('div')(
  () => css`
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
  `,
)

export const InputWrapper = styled('div')(
  () => css`
    flex: 1;
    position: relative;
    min-width: 0;
  `,
)

export const SearchBox = styled('input')(
  ({ theme }) => css`
    width: 100%;
    box-sizing: border-box;
    padding: 6px 8px;
    border: 0.5px solid ${theme.palette.divider};
    border-radius: 6px;
    font-size: 16px;
    color: ${theme.palette.primary.dark};
    background-color: ${theme.palette.background.paper};
    outline: none;
    font-family: Inter, sans-serif;
    min-width: 0;

    ${theme.breakpoints.up('tablet')} {
      padding: 7px 10px;
    }
  `,
)

export const ClearSearchButton = styled('button')(
  ({ theme }) => css`
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: ${theme.palette.text.disabled};
    font-size: 16px;
    line-height: 1;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      color: ${theme.palette.primary.dark};
    }
  `,
)

export const FilterToggles = styled('div')(
  () => css`
    display: flex;
    gap: 3px;
  `,
)

export const FilterToggleButton = styled('button', {
  shouldForwardProp: prop => prop !== 'active',
})<{ active?: boolean }>(
  ({ theme, active }) => css`
    color: ${active ? theme.palette.custom.tableHeaderText : theme.palette.text.secondary};
    background-color: ${active ? theme.palette.primary.main : theme.palette.background.paper};
    border: 0.5px solid ${active ? theme.palette.primary.main : theme.palette.divider};
    border-radius: 6px;
    font-family: Inter, sans-serif;
    font-size: 14px;
    font-weight: 500;
    padding: 5px 8px;
    white-space: nowrap;
    cursor: pointer;

    ${theme.breakpoints.up('tablet')} {
      padding: 6px 10px;
    }
  `,
)
