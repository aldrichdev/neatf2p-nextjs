import { TypographyProps } from '@mui/system'

/** This is needed if you ever style an MUI `Typography` using styled components and are passing the `component` prop to it. */
export type ExtendedTypographyProps = TypographyProps & {
  component: string
}
