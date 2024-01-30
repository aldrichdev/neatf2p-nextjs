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

export const HiscoreSkill = styled('div')(
  () => css`
    display: flex;
    align-items: center;
  `,
)

export const HiscoreMenuSkillIcon = styled('img')(
  () => css`
    width: 16px;
    margin-right: 12px;
    background-color: transparent;
  `,
)
export const CurrentMenuItemLabel = styled('span')(
  () => css`
    font-family: Verdana;
    font-size: 18px;
    line-height: 2;
    color: blue;
  `,
)

export const MenuItemButton = styled(Button)(
  ({ theme }) => css`
    font-family: Verdana;
    color: black;
    font-size: 18px;
    justify-content: flex-start;

    :hover {
      color: #2055da;
    }

    ${theme.breakpoints.up('mobile')} {
      justify-content: flex-start;
    }
  `,
)
