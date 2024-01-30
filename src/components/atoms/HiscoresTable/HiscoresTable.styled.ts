import { ExtendedTableContainerProps } from '@globalTypes/MUI/ExtendedTableContainerProps'
import { Table, TableCell, TableContainer, TableRow } from '@mui/material'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const HiscoreTableContainer = styled(TableContainer)<ExtendedTableContainerProps>(
  ({ theme }) => css`
    box-shadow: none;

    ${theme.breakpoints.up('tablet')} {
      flex-basis: calc(70% - 36px);
    }

    ${theme.breakpoints.up('desktop')} {
      min-height: 1000px;
      width: 100%;
    }
  `,
)

export const HiscoreTable = styled(Table, {
  shouldForwardProp: prop => !['aria-label'].includes(prop.toString()),
})(
  () => css`
    font-family: Verdana;
    background-color: rgba(218, 165, 32, 0.8);
    border: 2px solid rgb(160, 82, 45);
  `,
)

export const HiscoresTableRow = styled(TableRow)(
  () => css`
    border: 1px solid black;
  `,
)

export const HiscoreTableCell = styled(TableCell)(
  ({ theme }) => css`
    font-weight: 400;
    padding: 8px;
    border: 0;
    border-right: 1px solid black;

    ${theme.breakpoints.up('tablet')} {
      padding: 16px;
    }
  `,
)

export const HiscoreUsername = styled('a')(
  () => css`
    color: black;
    text-decoration: none;

    :hover {
      text-decoration: underline;
      cursor: pointer;
    }
  `,
)
