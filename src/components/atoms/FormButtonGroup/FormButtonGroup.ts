import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const FormButtonGroup = styled('div')(
  ({ theme }) => css`
    display: flex;
    gap: 20px;
    justify-content: space-between;
    width: 100%;

    ${theme.breakpoints.up('tablet')} {
      justify-content: flex-start;
      width: auto;
    }
  `,
)
