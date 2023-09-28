import { createTheme } from '@mui/material/styles'
import { CSSProperties } from 'react'

let theme = createTheme({
  breakpoints: {
    values: {
      mobile: 600,
      tablet: 768,
      desktop: 1200
    },
  },
  typography: {
    fontFamily: 'Saros,Vinque',
    body1: undefined,
    body2: undefined,
    subtitle1: undefined,
    subtitle2: undefined,
    caption: undefined,
    overline: undefined,
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          body: 'p',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: 'green',
          fontFamily: 'Saros',
          textTransform: 'none',
          fontSize: '16px',
          padding: '10px 40px',
          marginTop: '40px',

          '&:hover': {
            backgroundColor: 'darkgreen',
          }
        }
      }
    }
  },
})

theme = createTheme(theme, {
  typography: {
    h1: {
      fontWeight: '600',
      fontSize: '36px',
      lineHeight: '36px',
      fontFamily: 'Arial',

      [theme.breakpoints.up('tablet')]: {
        fontSize: '46px',
        lineHeight: '46px',
      },

      [theme.breakpoints.up('desktop')]: {
        fontSize: '70px',
        lineHeight: '70px',
      },
    },
    h2: {
      fontWeight: '600',
      fontSize: '30px',
      lineHeight: '30px',
      fontFamily: 'Vinque',

      [theme.breakpoints.up('tablet')]: {
        fontSize: '36px',
        lineHeight: '36px',
      },

      [theme.breakpoints.up('desktop')]: {
        fontSize: '50px',
        lineHeight: '50px',
      },
    },
    body: {
      fontFamily: 'Saros',
      fontWeight: '300',
      fontSize: '20px',
      lineHeight: '28px',
    },
  },
})

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true;
    tablet: true;
    desktop: true;
  }

  interface TypographyVariants {
    body: CSSProperties;
  }

  interface TypographyVariantsOptions {
    body?: CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    body: true;
  }
}

export default theme