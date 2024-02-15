import { styled } from '@mui/material/styles'
import { css } from '@mui/system'
import Link from 'next/link'

export const Container = styled('div', {
  shouldForwardProp: prop => prop !== 'isWebClient',
})<{ isWebClient?: boolean }>(
  ({ theme, isWebClient }) => css`
    background-color: ${isWebClient ? 'black' : 'white'};
    ${isWebClient && `width: 600px;`}
    position: relative;
    height: 100vh;

    ${theme.breakpoints.up('tablet')} {
      width: auto;
    }
  `,
)

export const HomepageLink = styled(Link)(
  () => css`
    margin: 0 auto;
    display: block;
    width: 100%;
  `,
)

export const Logo = styled('img')(
  () => css`
    width: 100%;
  `,
)

export const PaddedContainer = styled('div', {
  shouldForwardProp: prop => prop !== 'isWebClient',
})<{ isWebClient?: boolean }>(
  ({ isWebClient }) => css`
    padding: 40px 20px 60px;
    background-color: ${isWebClient ? 'black' : 'white'};
  `,
)
