import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const HiscoresPageContainer = styled('div')(
  ({ theme }) => css`
    margin-top: 20px;
    display: flex;
    gap: 30px;
    flex-wrap: wrap;
    justify-content: center;

    ${theme.breakpoints.up('tablet')} {
      margin-top: 40px;
    }

    ${theme.breakpoints.up('desktop')} {
      gap: 60px;
      flex-wrap: nowrap;
    }
  `,
)

export const PlayerHiscoreTableContainer = styled('div')(
  ({ theme }) => css`
    margin-top: 20px;

    ${theme.breakpoints.up('mobile')} {
      margin-top: 40px;
    }
  `,
)

export const HiscoresMenuItemList = styled('ul', {
  shouldForwardProp: prop => prop !== 'isNpcMenu',
})<{ isNpcMenu?: boolean }>(
  ({ theme, isNpcMenu }) => css`
    background-color: var(--gold-bg-color);
    border: 2px solid var(--gold-border-color);
    padding: 10px 16px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 5px;
    ${isNpcMenu && 'width: 100%'};

    ${theme.breakpoints.up('tablet')} {
      display: block;
      grid-template-columns: unset;
      margin: 0;
      column-gap: 0;
      width: auto;
      flex-basis: calc(30% - 30px);
    }

    ${theme.breakpoints.up('desktop')} {
      box-sizing: border-box;
      ${isNpcMenu && 'min-width: 220px'};
      flex-basis: auto;
    }
  `,
)
