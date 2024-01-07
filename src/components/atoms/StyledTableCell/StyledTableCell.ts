import { TableCell } from '@mui/material'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const StyledTableCell = styled(TableCell, {
  shouldForwardProp: prop => !['component', 'scope', 'align', 'bold'].includes(prop.toString()),
})<{ bold?: boolean }>(
  ({ theme, bold }) => css`
    text-align: left;
    font-weight: ${bold ? 700 : 400};

    ${theme.breakpoints.up('tablet')} {
      text-align: center;
    }
  `,
)
