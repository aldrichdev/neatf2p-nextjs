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
    font-family: Source Sans Pro;
    font-size: 16px;
    line-height: 2;
  `,
)

export const MenuItemButton = styled(Button)(
  ({ theme }) => css`
    justify-content: center;

    ${theme.breakpoints.up('mobile')} {
      justify-content: flex-start;
    }
  `,
)
