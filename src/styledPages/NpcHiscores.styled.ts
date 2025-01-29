import { styled } from '@mui/material/styles'
import { css } from '@mui/system'
import { HiscoresPageContainer } from './hiscores.styled'

export const NpcHiscoresMenuItemList = styled('ul')(
  ({ theme }) => css`
    background-color: var(--gold-bg-color);
    border: 2px solid var(--gold-border-color);
    padding: 10px 16px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 750px;
    column-gap: 5px;
    margin: 0;
    box-sizing: border-box;

    ${theme.breakpoints.up('tablet')} {
      height: 650px;
    }

    ${theme.breakpoints.up('desktop')} {
      height: 400px;
    }
  `,
)

export const NpcHiscoresPageContainer = styled(HiscoresPageContainer)(
  ({ theme }) => css`
    ${theme.breakpoints.up('desktop')} {
      gap: 30px;
    }
  `,
)
