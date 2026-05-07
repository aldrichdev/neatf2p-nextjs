import { BodyText } from '@atoms/BodyText'
import { PaperTypeMap, TableContainer } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const AccountTableContainer = styled(TableContainer, {
  shouldForwardProp: prop => prop !== 'component',
})<{ component: OverridableComponent<PaperTypeMap<Record<string, never>, 'div'>> }>(
  ({ theme }) => css`
    display: none;
    margin-top: 40px;

    ${theme.breakpoints.up('tablet')} {
      display: block;
    }
  `,
)

export const DesktopSpinner = styled('div')(
  ({ theme }) => css`
    display: none;

    ${theme.breakpoints.up('tablet')} {
      display: block;
      margin-top: 20px;
    }
  `,
)

export const TabletDesktopBodyText = styled(BodyText)(
  ({ theme }) => css`
    display: none;

    ${theme.breakpoints.up('tablet')} {
      display: block;
    }
  `,
)
