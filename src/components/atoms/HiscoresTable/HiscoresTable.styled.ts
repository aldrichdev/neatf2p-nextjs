import { Table } from '@mui/material'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const StyledTable = styled(Table, {
  shouldForwardProp: prop => !['aria-label'].includes(prop.toString()),
})(
  () => css`
    font-family: Source Sans Pro;
  `,
)
