import { styled } from '@mui/material/styles'
import { css } from '@mui/system'
import { getBaseNavItemStyles } from '@theme/globalStyles'
import Link from 'next/link'

export const NavContainer = styled('div')(
  () => css`
    display: flex;
    justify-content: center;
  `,
)

export const NavUnorderedList = styled('ul')(
  ({ theme }) => css`
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    font-family: Source Sans Pro;
    font-size: 20px;
    gap: 16px;
    background-color: var(--dark-gray);
    border: 0;
    padding: 12px 0;
    width: 100%;

    ${theme.breakpoints.up('tablet')} {
      border: 2px solid black;
      row-gap: 32px;
    }

    ${theme.breakpoints.up('desktop')} {
      flex-wrap: nowrap;
      gap: 32px;
    }
  `,
)

export const NavLink = styled(Link, {
  shouldForwardProp: prop => prop !== 'isActive',
})<{ isActive?: boolean }>(
  ({ isActive }) => css`
    ${getBaseNavItemStyles(isActive)}
    text-decoration: none;

    :hover {
      border-bottom: 2px solid green;
    }
  `,
)
