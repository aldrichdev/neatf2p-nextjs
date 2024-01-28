import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const MenuItem = styled('li')(
  ({ theme }) => css`
    list-style-type: none;
    text-align: center;

    ${theme.breakpoints.up('mobile')} {
      text-align: left;
    }
  `,
)

export const CurrentMenuItemLabel = styled('span')(
  // Should match `textPrimary` styles in theme.ts
  () => css`
    font-family: Verdana;
    font-size: 16px;
    line-height: 2;
    font-size: 18px;
    color: blue;
  `,
)

export const MenuItemButton = styled(Button)(
  ({ theme }) => css`
    font-family: Verdana;
    color: black;
    font-size: 18px;
    justify-content: center;

    :hover {
      color: #2055da;
    }

    ${theme.breakpoints.up('mobile')} {
      justify-content: flex-start;
    }
  `,
)
