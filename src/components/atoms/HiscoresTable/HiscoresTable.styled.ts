import { Table, TableCell } from '@mui/material'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const StyledTable = styled(Table, {
  shouldForwardProp: prop => !['aria-label'].includes(prop.toString()),
})(
  () => css`
    font-family: Verdana;
    background-color: rgba(218, 165, 32, 0.8);
    border: 2px solid rgb(160, 82, 45);
  `,
)

export const StyledTableCell = styled(TableCell)(
  ({ theme }) => css`
    font-weight: 400;
    border: 1px solid black;
    padding: 8px;

    ${theme.breakpoints.up('tablet')} {
      padding: 16px;
    }
  `,
)
