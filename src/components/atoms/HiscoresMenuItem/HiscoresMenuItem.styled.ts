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
  isNpcMenu => css`
    font-family: ${isNpcMenu ? 'Arial' : 'Verdana'};
    font-weight: ${isNpcMenu ? 600 : 500};
    font-size: 18px;
    line-height: 2;
    color: ${isNpcMenu ? 'var(--npc-hiscores-active-text-color)' : 'blue'};
  `,
)

export const MenuItemButton = styled(Button, {
  shouldForwardProp: prop => prop !== 'isNpcMenu',
})<{ isNpcMenu?: boolean }>(
  ({ theme, isNpcMenu }) => css`
    font-family: ${isNpcMenu ? 'Arial' : 'Verdana'};
    font-weight: ${isNpcMenu ? 600 : 500};
    color: ${isNpcMenu ? 'var(--npc-hiscores-text-color)' : 'black'};
    font-size: 18px;
    justify-content: flex-start;

    :hover {
      color: ${isNpcMenu ? 'var(--npc-hiscores-hover-text-color)' : 'var(--faded-blue-bg-color)'};
    }

    ${theme.breakpoints.up('mobile')} {
      justify-content: flex-start;
    }
  `,
)
