import { Table, TableContainer } from '@mui/material'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const AccountTableContainer = styled(TableContainer, {
  shouldForwardProp: prop => prop !== 'component',
})<{ component: any }>(
  () => css`
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
  () => css`
    font-family: Source Sans Pro;

    & .MuiTableRow-root:last-child td {
      border-left: 1px solid black;
      border-right: 1px solid black;
    }
  `,
)
