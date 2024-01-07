import { BodyText } from '@atoms/BodyText'
import { Table, TableContainer, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const MobileHelpText = styled(Typography)(
  ({ theme }) => css`
    ${theme.breakpoints.up('tablet')} {
      display: none;
    }
  `,
)

export const AccountTableContainer = styled(TableContainer, {
  shouldForwardProp: prop => prop !== 'component',
})<{ component: any }>(
  ({ theme }) => css`
    display: none;
    margin-top: 40px;

    ${theme.breakpoints.up('tablet')} {
      display: block;
    }
  `,
)

export const AccountTable = styled(Table, {
  shouldForwardProp: prop => !['sx', 'aria-label'].includes(prop.toString()),
})(
  () => css`
    font-family: Source Sans Pro;
  `,
)

export const TabletDestkopBodyText = styled(BodyText)(
  ({ theme }) => css`
    display: none;

    ${theme.breakpoints.up('tablet')} {
      display: block;
    }
  `,
)
