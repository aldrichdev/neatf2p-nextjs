import { styled } from '@mui/material/styles'
import { css } from '@mui/system'
import Link from 'next/link'

export const NavUnorderedList = styled('ul')(
  ({ theme }) => css`
    list-style-type: none;
    margin: 20px 0 10px;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    font-family: Saros;
    font-size: 20px;
    column-gap: 16px;
    row-gap: 32px;

    ${theme.breakpoints.up('desktop')} {
      flex-wrap: nowrap;
      gap: 32px;
    }
  `
)

export const NavLink = styled(Link)<{ isActive?: boolean }>(
  ({ isActive }) => css`
    color: white;
    text-decoration: none;
    border: 2px solid;
    border-color: ${isActive ? '#800080' : 'green'};
    background-color: ${isActive ? '#800080' : 'green'};
    border-radius: 20px;
    padding: 8px;

    :hover {
      background-color: ${isActive ? '#670067' : 'darkgreen'};
      border-color: ${isActive ? '#670067' : 'darkgreen'};
    }
  `
)
