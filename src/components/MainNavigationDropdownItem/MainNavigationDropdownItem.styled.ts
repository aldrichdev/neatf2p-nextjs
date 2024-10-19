import { Button, Link } from '@mui/material'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'
import { getBaseNavItemStyles } from '@theme/globalStyles'

// Nav buttons (which have a sub menu and are transformed into links) strangely appear
// 1px higher up than the nav links, so we need to translate the Y axis down by 1 pixel.
export const NavItem = styled('div')(
  () => css`
    position: relative;
    transform: translateY(1px);
  `,
)

export const NavButton = styled(Button, {
  shouldForwardProp: prop => prop !== 'isActive',
})<{ isActive?: boolean }>(
  ({ isActive }) => css`
    ${getBaseNavItemStyles(isActive)}
    font-family: Source Sans Pro;
    font-size: 20px;
    border-radius: 0;
    height: 43px;

    :hover {
      color: white;
      border-bottom: 2px solid green;
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

    :hover {
      background-color: #36454f;
    }
  `,
)

export const NavSubLink = styled(Link)(
  () => css`
    color: white;
    text-decoration: none;
    padding: 8px;
    display: block;
    font-size: 18px;
  `,
)
