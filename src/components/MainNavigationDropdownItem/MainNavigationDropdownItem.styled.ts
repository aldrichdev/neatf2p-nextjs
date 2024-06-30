import { Button, Link } from '@mui/material'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const NavItem = styled('div')(
  () => css`
    position: relative;
  `,
)

/** TODO: Reuse styles between here and NavLink if possible. */
export const NavButton = styled(Button, {
  shouldForwardProp: prop => prop !== 'isActive',
})<{ isActive?: boolean }>(
  ({ isActive }) => css`
    color: white;
    font-family: Saros;
    font-size: 20px;
    height: 44px;
    border-radius: 0;
    border: 2px solid;
    border-color: ${isActive ? 'purple' : 'green'};
    background-color: ${isActive ? 'purple' : 'green'};
    padding: 8px;

    :hover {
      color: white;
      background-color: ${isActive ? '#670067' : 'darkgreen'};
      border-color: ${isActive ? '#670067' : 'darkgreen'};
    }
  `,
)

export const NavDropdownMenu = styled('div')(
  () => css`
    position: absolute;
    width: 100%;
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
  `,
)
