import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const HiscoresPageContainer = styled('div')(
  () => css`
    margin-top: 40px;
    display: flex;
    gap: 60px;
  `,
)

export const HiscoresMenuItemList = styled('ul')(
  () => css`
    padding: 0;
    margin: 0;
  `,
)

export const HiscoresMenuItem = styled('li')(
  () => css`
    list-style-type: none;
    text-align: left;
  `,
)
