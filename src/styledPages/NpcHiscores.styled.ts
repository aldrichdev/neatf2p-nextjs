import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const NpcHiscoresMenuItemList = styled('ul')(
  ({ theme }) => css`
    background-color: var(--gold-bg-color);
    border: 2px solid var(--gold-border-color);
    padding: 10px 16px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 5px;
    width: 100%;

    ${theme.breakpoints.up('tablet')} {
      grid-template-columns: unset;
      grid-template-rows: repeat(4, 1fr);
      margin: 0;
    }
  `,
)

export const MobileOnly = styled('div')(
  ({ theme }) => css`
    ${theme.breakpoints.up('tablet')} {
      display: none;
    }
  `,
)
