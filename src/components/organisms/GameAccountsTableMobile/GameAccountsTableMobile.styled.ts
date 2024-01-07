import { BodyText } from '@atoms/BodyText'
import { Table, TableContainer } from '@mui/material'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const AccountTableContainer = styled(TableContainer, {
  shouldForwardProp: prop => prop !== 'component',
})<{ component: any }>(
  ({ theme }) => css`
    margin-top: 40px;

    ${theme.breakpoints.up('tablet')} {
      display: none;
    }
  `,
)

export const AccountTable = styled(Table, {
  shouldForwardProp: prop => !['sx', 'aria-label'].includes(prop.toString()),
})(
  () => css`
    margin-top: 40px;
    font-family: Source Sans Pro;
    border: 1px solid black;
  `,
)

export const MobileBodyText = styled(BodyText)(
  ({ theme }) => css`
    ${theme.breakpoints.up('tablet')} {
      display: none;
    }
  `,
)
