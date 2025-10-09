import { Heading } from '@atoms/PageHeading/PageHeading.styled'
import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'
import Link from 'next/link'

export const AccountNavigationContainer = styled('div')(
  ({ theme }) => css`
    margin: 20px 0;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;

    ${theme.breakpoints.up('tablet')} {
      flex-wrap: nowrap;
    }
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

    &:hover {
      background-color: var(--faded-green-bg-color);
    }
  `,
)

export const AdminToolsSection = styled('div')(
  () => css`
    margin-top: 20px;
  `,
)

export const AdminToolsHeading = styled(Heading)(
  () => css`
    margin-bottom: 20px;
  `,
)

export const AdminToolsButtonArea = styled('div')(
  () => css`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
  `,
)
