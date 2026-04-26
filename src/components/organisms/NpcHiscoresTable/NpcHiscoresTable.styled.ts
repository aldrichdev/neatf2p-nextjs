import { ExtendedTableContainerProps } from '@globalTypes/MUI/ExtendedTableContainerProps'
import { TableContainer } from '@mui/material'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const NpcHiscoreTableContainer = styled(TableContainer)<ExtendedTableContainerProps>(
  () => css`
    box-shadow: none;
    border-radius: 8px 8px 0 0;
  `,
)
