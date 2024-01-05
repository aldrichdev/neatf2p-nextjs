import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'
import Link from 'next/link'

export const AccountNavigationContainer = styled('div')(
  () => css`
    margin-top: 20px;
    display: flex;
    column-gap: 30px;
    justify-content: center;
  `,
)

export const AccountNavigationButton = styled(Button)(
  () => css`
    margin-top: 10px;
    font-family: Source Sans Pro;
    color: green;
    font-size: 20px;
    text-transform: none;
  `,
)
export const AccountNavigationItem = styled(Link)(
  () => css`
    display: block;
    font-family: Source Sans Pro;
    color: unset;
    padding: 16px;
    text-align: left;
    text-decoration: none;
  `,
)
