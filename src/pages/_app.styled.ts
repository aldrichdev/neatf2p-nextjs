import { styled } from '@mui/material/styles'
import { css } from '@mui/system'
import Link from 'next/link'

export const Container = styled('div')(
  ({ theme }) => css`
    margin: 10% 10% 0;
    background-color: white;
    border-radius: 0px;

    ${theme.breakpoints.up('desktop')} {
      margin-top: 40px;
      border-radius: 40px;
    }
  `,
)

export const HomepageLink = styled(Link)(
  ({ theme }) => css`
    margin: 0 auto;
    display: block;

    ${theme.breakpoints.up('desktop')} {
      padding-top: 40px;
      width: 800px;
    }
  `,
)

export const Logo = styled('img')(
  () => css`
    width: 100%;
  `,
)

export const PaddedContainer = styled('div')(
  () => css`
    padding: 20px;
  `,
)
