import { styled } from '@mui/material/styles'
import { css } from '@mui/system'
import Link from 'next/link'

export const NavUnorderedList = styled('ul')(
  () => css`
    list-style-type: none;
    margin: 0;
    padding: 0;
    margin: 20px 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 32px;
    font-family: Saros;
    font-size: 20px;
  `,
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
  `,
)
