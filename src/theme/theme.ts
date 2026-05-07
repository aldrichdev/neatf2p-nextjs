import { createTheme, PaletteOptions } from '@mui/material/styles'
import { CSSProperties } from 'react'

// ─── Color tokens ───────────────────────────────────────────────────────────
// Single source of truth. Reference these via theme.palette everywhere.
// When you add dark mode, you'll pass a different palette object to createTheme.

interface CustomPaletteTokens {
  sidebarBg: string
  tableHeaderText: string
  rankGold: { bg: string; text: string; altText: string }
  rankSilver: { bg: string; text: string }
  rankBronze: { bg: string; text: string }
  levelProgressBg: string
  skillItemHover: string
  tertiaryText: string
  calloutWarningBg: string
  calloutWarningBorder: string
  calloutWarningText: string
  calloutWarningLink: string
  navLinkHover: string
}

const palette: PaletteOptions = {
  primary: {
    main: '#2d5c2d', // forest green — buttons, links, active states
    dark: '#1a3a1a', // nav bg, hover states
    light: '#e0ede0', // sidebar active bg, subtle tints
  },
  secondary: {
    main: '#7c5cbf', // purple — rank badges, accents, hover on names
    light: '#f0ecfa', // purple pill bg
    dark: '#5c3d9a', // purple pill text
  },
  background: {
    default: '#f9faf9', // page bg
    paper: '#ffffff', // table/card surfaces
  },
  text: {
    primary: '#1a2e1a', // headings
    secondary: '#4a6a4a', // muted values, EXP column
    disabled: '#9e9e9e', // disabled input values, placeholders
  },
  divider: '#d0dcd0', // table row borders, panel borders
  // Custom tokens beyond MUI's built-in slots:
  custom: {
    sidebarBg: '#f4f6f4',
    tableHeaderText: '#d8edd8',
    rankGold: { bg: '#f5e6c0', text: '#8a6a10', altText: '#c49a00' },
    rankSilver: { bg: '#e8e8e8', text: '#5a5a6a' },
    rankBronze: { bg: '#f0e0d0', text: '#7a4a2a' },
    levelProgressBg: '#e8efe8',
    skillItemHover: '#eaf0ea', // Hover color of menu list items
    tertiaryText: '#7a9a7a', // hints, helper text
    calloutWarningBg: '#fef3e2',
    calloutWarningBorder: '#e6a817',
    calloutWarningText: '#7c3a00',
    calloutWarningLink: '#7c3a00',
    navLinkHover: '#a989d4',
  },
}

// ─── Theme ──────────────────────────────────────────────────────────────────

let theme = createTheme({
  palette,
  breakpoints: {
    values: {
      mobile: 600,
      tablet: 768,
      desktop: 1200,
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
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
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.disabled,
          '&.Mui-focused': {
            color: theme.palette.text.disabled,
          },
        }),
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.disabled,
        }),
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          '&:hover:not(.Mui-disabled)::before': {
            borderBottomColor: '#000000',
          },
          '&.Mui-focused::after': {
            borderBottomColor: '#000000',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.main,
          '&.Mui-checked': {
            color: theme.palette.primary.main,
          },
        }),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.divider,
            borderWidth: '1px',
            borderRadius: '0px',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.divider,
            borderWidth: '1px',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#000000',
            borderWidth: '1px',
          },
          '&.Mui-focused:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#000000',
            borderWidth: '1px',
          },
        }),
        input: ({ theme }) => ({
          outline: 'none',
          color: 'black',
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: ({ theme }) => ({
          backgroundColor: theme.palette.primary.main,
          fontFamily: 'Inter, sans-serif',
          textTransform: 'none',
          fontSize: '16px',
          padding: '10px 40px',

          '&:hover': {
            color: theme.palette.background.paper,
            backgroundColor: theme.palette.primary.dark,
          },
        }),
        outlinedPrimary: ({ theme }) => ({
          color: theme.palette.primary.main,
          backgroundColor: 'transparent',
          borderColor: theme.palette.primary.main,
          borderWidth: '2px',
          fontFamily: 'Inter, sans-serif',
          textTransform: 'none',
          fontSize: '16px',
          padding: '10px 40px',

          '&:hover': {
            color: theme.palette.primary.dark,
            borderColor: theme.palette.primary.dark,
            borderWidth: '2px',
          },
        }),
        textPrimary: ({ theme }) => ({
          color: theme.palette.primary.main,
          fontFamily: 'Inter, Cinzel, sans-serif',
          textTransform: 'none',
          textAlign: 'left',
          padding: 0,
          justifyContent: 'flex-start',
          fontSize: '16px',
          lineHeight: 2,

          '&:hover': {
            color: theme.palette.primary.dark,
            backgroundColor: 'transparent',
          },
        }),
      },
    },
  },
})

theme = createTheme(theme, {
  typography: {
    h1: {
      fontWeight: '600',
      fontSize: '36px',
      lineHeight: '36px',
      fontFamily: '"Cinzel", serif',

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
      fontSize: '36px',
      lineHeight: '36px',
      fontFamily: '"Cinzel", serif',

      [theme.breakpoints.up('desktop')]: {
        fontSize: '60px',
        lineHeight: '60px',
      },
    },
    body: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: '300',
      fontSize: '20px',
      lineHeight: '28px',
      color: 'black',
    },
  },
})

// ─── Type augmentation ───────────────────────────────────────────────────────

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false
    sm: false
    md: false
    lg: false
    xl: false
    mobile: true
    tablet: true
    desktop: true
  }

  interface TypographyVariants {
    body: CSSProperties
  }

  interface TypographyVariantsOptions {
    body?: CSSProperties
  }

  // Teach TypeScript about theme.palette.custom
  interface Palette {
    custom: CustomPaletteTokens
  }
  interface PaletteOptions {
    custom?: CustomPaletteTokens
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    body: true
  }
}

export default theme
