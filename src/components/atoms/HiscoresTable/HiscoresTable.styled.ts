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
  shouldForwardProp: prop => prop !== 'aria-label',
})(
  () => css`
    font-family: Verdana;
    background-color: var(--gold-bg-color);
    border: 2px solid var(--gold-border-color);
  `,
)

export const HiscoresTableRow = styled(TableRow)(
  ({ theme }) => css`
    border-bottom: 1px solid black;
    font-size: 14px;

    ${theme.breakpoints.up('tablet')} {
      font-size: 16px;
    }
  `,
)

export const HiscoreTableCell = styled(TableCell)(
  ({ theme }) => css`
    font-weight: 400;
    padding: 8px;
    border: 0;

    &:not(:last-child) {
      border-right: 1px solid black;
    }

    ${theme.breakpoints.up('tablet')} {
      padding: 16px;
    }
  `,
)

export const HiscoreTableHeaderCell = styled(HiscoreTableCell)(
  () => css`
    font-weight: 700;
  `,
)

export const HiscoreUsername = styled(HoverUnderlineLink)(
  () => css`
    color: black;
  `,
)
