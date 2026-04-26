import { ExtendedTableContainerProps } from '@globalTypes/MUI/ExtendedTableContainerProps'
import { Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

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
    border-radius: 8px 8px 0 0;

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
  ({ theme }) => css`
    font-family: Inter, sans-serif;
    background-color: ${theme.palette.background.paper};
    border-radius: 8px;
  `,
)

export const HiscoresTableHead = styled(TableHead)(
  ({ theme }) => css`
    background-color: ${theme.palette.primary.main};
    color: ${theme.palette.custom.tableHeaderText};
    height: fit-content;

    tr {
      border-bottom: none;
    }
  `,
)

export const HiscoresTableRow = styled(TableRow)(
  ({ theme }) => css`
    border-bottom: 0.5px solid ${theme.palette.divider};
    font-size: 14px;

    ${theme.breakpoints.up('tablet')} {
      font-size: 16px;
    }
  `,
)

export const HiscoreTableValueCell = styled(TableCell)(
  ({ theme }) => css`
    font-weight: 400;
    font-size: 14px;
    padding: 9px 14px;
    border: 0;

    ${theme.breakpoints.up('tablet')} {
      font-size: 16px;
    }
  `,
)

export const HiscoreTableHeaderCell = styled(TableCell)(
  ({ theme }) => css`
    color: ${theme.palette.custom.tableHeaderText};
    font-weight: 700;
    font-size: 14px;
    padding: 9px 14px;
    border: 0;
    text-transform: uppercase;
  `,
)
