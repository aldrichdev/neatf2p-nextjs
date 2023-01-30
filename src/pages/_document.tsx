import { Html, Head, Main, NextScript } from 'next/document'
import { ThemeProvider } from '@mui/material/styles'
import theme from '@theme/theme'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

const Body = styled('body')(
  ({ theme }) => css`
    background-color: green;
    background-image: url('/img/2H-Lineup.png');

    ${theme.breakpoints.up('tablet')} {
      background-image: url('/img/2H-Lineup-Lrg.png');
    }
  `
)

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <ThemeProvider theme={theme}>
        <Body>
          <Main />
          <NextScript />
        </Body>
      </ThemeProvider>
    </Html>
  )
}