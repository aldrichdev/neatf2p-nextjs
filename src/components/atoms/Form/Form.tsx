import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const Form = styled('form')(
  ({ theme }) => css`
    margin-top: 20px;
    font-family: Helvetica;
    display: flex;
    flex-wrap: wrap;
    width: 100%;

    ${theme.breakpoints.up('desktop')} {
      width: 40%;
    }
  `,
)
