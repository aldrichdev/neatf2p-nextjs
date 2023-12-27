import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const AccountTableContainer = styled(TableContainer, {
  shouldForwardProp: prop => prop !== 'component',
})<{ component: any }>(
  ({ theme }) => css`
    margin-top: 40px;
    border-top: 2px solid black;
    border-bottom: 2px solid black;
    border-left: 1px solid black;
    border-right: 1px solid black;
  `,
)

export const AccountTable = styled(Table, {
  shouldForwardProp: prop => !['sx', 'aria-label'].includes(prop.toString()),
})(
  ({ theme }) => css`
    font-family: Saros;

    & .MuiTableRow-root:last-child td {
      border-left: 1px solid black;
      border-right: 1px solid black;
    }
  `,
)

export const AccountTableCell = styled(TableCell, {
  shouldForwardProp: prop => !['component', 'scope', 'align'].includes(prop.toString()),
})(
  ({ theme }) => css`
    text-align: center;
    border-left: 1px solid black;
    border-right: 1px solid black;
  `,
)
