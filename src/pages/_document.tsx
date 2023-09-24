import { Html, Head, Main, NextScript } from 'next/document'
import { ThemeProvider } from '@mui/material/styles'
import theme from '@theme/theme'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <ThemeProvider theme={theme}>
        <body>
          <Main />
          <NextScript />
        </body>
      </ThemeProvider>
    </Html>
  )
}