import { Button, Link } from '@mui/material'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'
import { getBaseNavItemStyles } from '@theme/globalStyles'

export const NavItem = styled('div')(
  () => css`
    position: relative;
  `,
)

export const NavButton = styled(Button, {
  shouldForwardProp: prop => prop !== 'isActive',
})<{ isActive?: boolean }>(
  ({ theme, isActive }) => css`
    ${getBaseNavItemStyles(isActive)}
    border-radius: 0;
    height: 43px;
    font-weight: 400;

    :hover {
      color: white;
    }

    ${theme.breakpoints.up('tablet')} {
      height: auto;
    }
  `,
)

export const NavDropdownMenu = styled('div')(
  () => css`
    position: absolute;
    width: 100%;
  `,
)

export const NavDropdownMenuSubItemList = styled('ul')(
  () => css`
    list-style-type: none;
    padding: 0;
    margin: 0;
  `,
)

export const NavSubItem = styled('li')(
  () => css`
    list-style-type: none;
    background-color: #100c08;
  `,
)

export const NavSubLink = styled(Link)(
  ({ theme }) => css`
    color: white;
    text-decoration: none;
    padding: 8px;
    display: block;
    font-size: 16px;

    &:hover {
      color: ${theme.palette.custom.navLinkHover};
    }
  `,
)
