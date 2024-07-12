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
export const CurrentMenuItemLabel = styled('span', {
  shouldForwardProp: prop => prop !== 'isNpcMenu',
})<{ isNpcMenu?: boolean }>(
  ({ theme, isNpcMenu }) => css`
    font-family: Verdana;
    font-weight: 500;
    font-size: ${isNpcMenu ? '14px' : '18px'};
    line-height: 2;
    color: blue;

    ${theme.breakpoints.up('tablet')} {
      font-size: 18px;
    }
  `,
)

export const MenuItemButton = styled(Button, {
  shouldForwardProp: prop => prop !== 'isNpcMenu',
})<{ isNpcMenu?: boolean }>(
  ({ theme, isNpcMenu }) => css`
    font-family: Verdana;
    font-weight: 500;
    color: black;
    font-size: ${isNpcMenu ? '14px' : '18px'};
    justify-content: flex-start;

    :hover {
      color: var(--faded-blue-bg-color);
    }

    ${theme.breakpoints.up('mobile')} {
      font-size: 18px;
      justify-content: flex-start;
    }
  `,
)
