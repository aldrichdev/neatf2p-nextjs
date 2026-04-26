import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const NpcHiscoresMenuItemList = styled('ul')(
  ({ theme }) => css`
    background-color: ${theme.palette.background.paper};
    border: 0.5px solid ${theme.palette.divider};
    border-radius: 8px;
    margin: 0 0 16px 0;
    padding: 0;
    display: grid;

    grid-template-columns: repeat(5, 1fr);
    box-sizing: border-box;
    overflow: hidden;

    ${theme.breakpoints.up('tablet')} {
      height: 650px;
    }

    ${theme.breakpoints.up('desktop')} {
      height: 400px;
    }
  `,
)

// TODO: Tear down
// export const NpcHiscoresPageContainer = styled('div')(() => css``)

// TODO: Tear down
export const NpcHiscoresLayout = styled('div')(
  ({ theme }) => css`
    display: grid;
    grid-template-rows: 1fr 1fr;
    gap: 16px;
    align-items: start;

    ${theme.breakpoints.up('tablet')} {
      grid-template-columns: 1fr 200px;
    }
  `,
)
