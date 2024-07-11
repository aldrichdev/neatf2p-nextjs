import { ExtendedTableContainerProps } from '@globalTypes/MUI/ExtendedTableContainerProps'
import { Table, TableCell, TableContainer, TableRow } from '@mui/material'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'
import { HoverUnderlineLink } from '@atoms/HoverUnderlineLink'

export const RootContainer = styled('div')(
  () => css`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  `,
)

export const HiscoreTableContainer = styled(TableContainer)<ExtendedTableContainerProps>(
  ({ theme }) => css`
    box-shadow: none;

    ${theme.breakpoints.up('tablet')} {
      flex-basis: 100%;
    }

    ${theme.breakpoints.up('desktop')} {
      min-height: 1000px;
      width: 100%;
    }
  `,
)

export const HiscoreTable = styled(Table, {
  shouldForwardProp: prop => !['aria-label', 'isNpcHiscores'].includes(prop.toString()),
})<{ isNpcHiscores?: boolean }>(
  isNpcHiscores => css`
    font-family: ${isNpcHiscores ? 'Arial' : 'Verdana'};
    background-color: ${isNpcHiscores ? 'var(--npc-hiscores-bg-color)' : 'var(--gold-bg-color)'};
    border: 2px solid ${isNpcHiscores ? 'var(--npc-hiscores-border-color)' : 'var(--gold-border-color)'};
  `,
)

export const HiscoresTableRow = styled(TableRow, {
  shouldForwardProp: prop => prop !== 'isNpcHiscores',
})<{ isNpcHiscores?: boolean }>(
  ({ theme, isNpcHiscores }) => css`
    border-bottom: 1px solid ${isNpcHiscores ? 'var(--npc-hiscores-text-color)' : 'black'};
    font-size: 14px;

    ${theme.breakpoints.up('tablet')} {
      font-size: 16px;
    }
  `,
)

export const HiscoreTableCell = styled(TableCell, {
  shouldForwardProp: prop => prop !== 'isNpcHiscores',
})<{ isNpcHiscores?: boolean }>(
  ({ theme, isNpcHiscores }) => css`
    font-weight: 400;
    padding: 8px;
    border: 0;
    color: ${isNpcHiscores ? 'var(--npc-hiscores-text-color)' : 'black'};
    font-size: ${isNpcHiscores ? '18px' : '16px'};

    &:not(:last-child) {
      border-right: 1px solid ${isNpcHiscores ? 'var(--npc-hiscores-text-color)' : 'black'};
    }

    ${theme.breakpoints.up('tablet')} {
      padding: 16px;
    }
  `,
)

export const HiscoreUsername = styled(HoverUnderlineLink, {
  shouldForwardProp: prop => prop !== 'isNpcHiscores',
})<{ isNpcHiscores?: boolean }>(
  isNpcHiscores => css`
    color: ${isNpcHiscores ? 'var(--npc-hiscores-text-color)' : 'black'};
    font-size: ${isNpcHiscores ? '18px' : '16px'};
  `,
)
