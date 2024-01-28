import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const HiscoresPageContainer = styled('div')(
  ({ theme }) => css`
    margin-top: 20px;
    display: flex;
    gap: 30px;
    flex-wrap: wrap;

    ${theme.breakpoints.up('mobile')} {
      margin-top: 40px;
      gap: 60px;
      flex-wrap: nowrap;
    }
  `,
)

export const HiscoresMenuItemList = styled('ul')(
  ({ theme }) => css`
    background-color: rgba(218, 165, 32, 0.8);
    border: 2px solid rgb(160, 82, 45);
    padding: 10px 16px;
    margin: 0;
    width: 100%;

    ${theme.breakpoints.up('mobile')} {
      width: auto;
    }
  `,
)
