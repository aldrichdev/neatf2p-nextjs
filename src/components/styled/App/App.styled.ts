import { styled } from '@mui/material/styles'
import { css } from '@mui/system'
import Link from 'next/link'

export const Container = styled('div')(
  ({ theme }) => css`
    background-color: white;
    border-radius: 0px;
    position: relative;

    ${theme.breakpoints.up('desktop')} {
      border-radius: 40px;
    }
  `
)

export const HomepageLink = styled(Link)(
  () => css`
    margin: 0 auto;
    display: block;
    width: 100%;
  `
)

export const Logo = styled('img')(
  () =>  css`
    width: 100%;
  `
)

export const PaddedContainer = styled('div')(
  () => css`
    padding: 20px;
  `
)
