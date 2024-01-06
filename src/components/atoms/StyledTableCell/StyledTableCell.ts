import { TableCell } from '@mui/material'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const StyledTableCell = styled(TableCell, {
  shouldForwardProp: prop => !['component', 'scope', 'align'].includes(prop.toString()),
})<{ bold?: boolean }>(
  ({ bold }) => css`
    text-align: center;
    border-left: 1px solid black;
    border-right: 1px solid black;
    font-weight: ${bold ? 700 : 400};
  `,
)
