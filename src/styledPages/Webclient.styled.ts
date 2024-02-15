import { FormGroup } from '@mui/material'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const HideAdsFormGroup = styled(FormGroup)(
  ({ theme }) => css`
    display: none;

    ${theme.breakpoints.up('tablet')} {
      display: block;
      font-family: Saros;
      margin-top: 40px;
      align-items: center;
      color: white;
    }
  `,
)
